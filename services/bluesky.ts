import { Agent, BskyAgent } from "@atproto/api";
import type { Main as Response } from "@atproto/api/dist/client/types/com/atproto/repo/strongRef";

type PostArgs = {
  text: string;
  langs?: string[];
  reply?: {
    root: Response;
    parent: Response;
  };
};

type AgentPostArgs = Agent["post"]["arguments"];

class BlueSkyClient {
  private static instance: BlueSkyClient | null = null;
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

  async login() {
    await this.agent?.login({
      identifier: process.env.BLUESKY_USERNAME as string,
      password: process.env.BLUESKY_PASSWORD as string,
    });
  }

  async post(args: PostArgs) {
    const { text, langs, reply: maybeReply } = args;
    // TODO: Add media
    // https://docs.bsky.app/docs/tutorials/creating-a-post#images-embeds

    let data: AgentPostArgs = {
      text,
      langs: langs ?? ["es", "es-ES"],
      createdAt: new Date().toISOString(),
    };

    if (maybeReply) {
      data.reply = maybeReply;
    }

    return await this.agent?.post(data);
  }
}
