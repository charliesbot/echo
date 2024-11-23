import { Agent, BlobRef, BskyAgent } from "@atproto/api";
import type { Main as Response } from "@atproto/api/dist/client/types/com/atproto/repo/strongRef";

export type PostArgs = {
  text: string;
  langs?: string[];
  reply?: {
    root: Response;
    parent: Response;
  };
  media?: string[];
};

type AgentPostArgs = Agent["post"]["arguments"];

export class BlueSkyClient {
  private static instance: BlueSkyClient | null = null;
  private isLoggedIn: boolean = false;
  private agent: BskyAgent | null = null;

  constructor() {
    if (BlueSkyClient.instance) {
      return BlueSkyClient.instance;
    }

    this.agent = new BskyAgent({
      service: "https://bsky.social",
    });

    BlueSkyClient.instance = this;
  }

  private async uploadImage(imageUrl: string): Promise<BlobRef> {
    if (!this.agent) throw new Error("Agent not initialized");

    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    const contentType = response.headers.get("content-type") || "image/jpeg";

    const { data } = await this.agent.uploadBlob(uint8Array, {
      encoding: contentType,
    });

    return data.blob;
  }

  private async prepareMediaEmbed(imageUrls: string[]) {
    if (imageUrls.length === 0) return undefined;
    if (imageUrls.length > 4) {
      throw new Error("Maximum of 4 images allowed per post");
    }

    const uploadedImages = await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const blob = await this.uploadImage(imageUrl);
        return {
          alt: "",
          image: blob,
        };
      })
    );

    return {
      $type: "app.bsky.embed.images",
      images: uploadedImages,
    };
  }

  async login() {
    return this.agent
      ?.login({
        identifier: process.env.BLUESKY_USERNAME as string,
        password: process.env.BLUESKY_PASSWORD as string,
      })
      .then(() => (this.isLoggedIn = true));
  }

  async post(args: PostArgs) {
    const { text, langs, reply: maybeReply, media } = args;

    let data: AgentPostArgs = {
      text,
      langs: langs ?? ["es", "es-ES"],
      createdAt: new Date().toISOString(),
    };

    if (maybeReply) {
      data.reply = maybeReply;
    }

    if (media && media.length > 0) {
      data.embed = await this.prepareMediaEmbed(media);
    }

    return await this.agent?.post(data);
  }
}
