export type TweetResponse = {
  data: Tweet[];
  includes: {
    tweets: Tweet[];
    media: Media[];
  };
  meta: Meta;
};

export type Tweet = {
  id: string;
  text: string;
  created_at: string;
  edit_history_tweet_ids?: string[];
  attachments?: {
    media_keys: string[];
  };
  referenced_tweets?: {
    type: "replied_to" | "quoted";
    id: string;
  }[];
};

export type Media = {
  type: "photo" | "video";
  url?: string;
  preview_image_url?: string;
  media_key: string;
  duration_ms?: number;
};

type Meta = {
  result_count: number;
  next_token?: string;
  newest_id: string;
  oldest_id: string;
};
