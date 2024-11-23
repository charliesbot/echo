import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database";
import { MockData } from "~/mockData";

function cleanupTweetsUrl(tweet: string) {
  return tweet.replace(/https:\/\/t\.co\/\w+/g, "");
}

export default defineEventHandler(async (event) => {
  const response = MockData;
  const client = await serverSupabaseClient<Database>(event);

  const tweets: Database["public"]["Tables"]["tweets"]["Insert"][] = [];
  const mediaMap: Record<
    string,
    Database["public"]["Tables"]["tweet_media"]["Insert"]
  > = {};

  const { data: lastSync, error: syncError } = await client
    .from("sync_state")
    .select("last_tweet_id")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (lastSync?.last_tweet_id === MockData.meta.newest_id) {
    return await $fetch("/api/echo/crossposts");
  }

  for (const media of response.includes.media) {
    // Bluesky does not support videos (yet)
    if (media.type == "video") {
      continue;
    }
    mediaMap[media.media_key] = {
      media_key: media.media_key,
      url: media.url,
      type: media.type,
      preview_image_url: media.preview_image_url,
      duration_ms: media.duration_ms,
    };
  }

  for (const tweet of response.data) {
    // Skip retweets and quotes
    if (tweet.referenced_tweets?.[0]?.type == "quoted") {
      continue;
    }

    const maybeMedia = tweet.attachments?.media_keys?.[0];

    // Skip if the tweet has media that we don't have in the media map.
    // This means the tweet contains media that we don't support yet.
    if (maybeMedia && !mediaMap[maybeMedia]) {
      continue;
    }

    if (maybeMedia && mediaMap[maybeMedia]) {
      mediaMap[maybeMedia].tweet_id = tweet.id;
    }

    tweets.push({
      tweet_id: tweet.id,
      tweet_text: cleanupTweetsUrl(tweet?.note_tweet?.text ?? tweet.text),
      tweet_created_at: tweet.created_at,
      referenced_tweet_id: tweet.referenced_tweets?.[0]?.id,
      tweet_type: tweet.referenced_tweets?.[0]
        ?.type as Database["public"]["Enums"]["tweet_type"],
    });
  }

  // In the future, we could have a map that will create an entry per service.
  // Eg: "bluesky", "mastodon", "threads"
  const initialCrossposts: Database["public"]["Tables"]["crosspost"]["Insert"][] =
    tweets.map((tweet) => ({
      tweet_id: tweet.tweet_id,
      service: "bluesky",
      status: "pending",
      attempt_count: 0,
    }));

  await client.from("tweets").upsert(tweets, {
    onConflict: "tweet_id",
    ignoreDuplicates: true,
  });

  await client.from("tweet_media").upsert(Object.values(mediaMap), {
    onConflict: "id",
    ignoreDuplicates: true,
  });

  await client.from("crosspost").upsert(initialCrossposts, {
    onConflict: "id",
    ignoreDuplicates: true,
  });

  await client.from("sync_state").insert({
    last_tweet_id: response.meta.newest_id,
    tweets_synced: tweets.length,
  });

  return await $fetch("/api/echo/crossposts");
});
