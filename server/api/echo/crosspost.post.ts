import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";
import { BlueSkyClient, PostArgs } from "~/services/bluesky";

type Body = {
  tweetId: string;
};

// Mostly for debugging.
// This endpoint crosspost a single tweet.
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const response = JSON.parse(body) as Body;
    const tweetId = response.tweetId;

    if (!tweetId) {
      throw new Error("Tweet ID is required");
    }

    const client = await serverSupabaseClient<Database>(event);
    const { data: tweet, error: tweetError } = await client
      .from("tweets")
      .select(
        `
    *,
    media:tweet_media(*)
  `
      )
      .eq("tweet_id", tweetId)
      .single();

    if (tweetError) {
      throw tweetError;
    }

    const blueSkyClient = new BlueSkyClient();
    await blueSkyClient.login();

    const postData: PostArgs = {
      text: tweet.tweet_text,
    };

    if (tweet.media.length > 0) {
      postData.media = tweet.media.map((media) => media.url!);
    }

    // Post the tweet on Bluesky
    const post = await blueSkyClient.post(postData);

    const { error: updateError } = await client
      .from("crosspost")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        crosspost_id: post?.cid,
        uri: post?.uri,
      })
      .eq("tweet_id", tweetId)
      .eq("service", "bluesky");

    if (updateError) {
      throw updateError;
    }

    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
