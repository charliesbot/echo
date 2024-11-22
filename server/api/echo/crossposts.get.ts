import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  try {
    const { data: tweetsToProcess, error } = await client
      .from("tweets")
      .select(
        `
      tweet_id,
      tweet_text,
      tweet_created_at,
      tweet_type,
      referenced_tweet_id,
      tweet_media (*),
      crosspost!inner ( 
        status,
        attempt_count,
        error_message
      )`
      )
      .eq("crosspost.service", "bluesky")
      .eq("crosspost.status", "pending")
      .order("tweet_created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return {
      tweets: tweetsToProcess,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});
