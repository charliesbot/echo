## Twitter API

### Get your username ID

curl "https://api.twitter.com/2/users/by/username/{your_username}" -H "Authorization: Bearer {your_token}"

### Fetch latest tweets and save them in a mock to prevent rate limiting

curl "https://api.twitter.com/2/users/{your_user_id}/tweets?max_results=30&exclude=replies,retweets&expansions=referenced_tweets.id,attachments.media_keys&media.fields=type,url,preview_image_url,alt_text,duration_ms&tweet.fields=created_at,text,attachments,note_tweet" -H "Authorization: Bearer {your_token}"

## Supabase Config

- npx supabase login
- npx supabase init

## Local Development

- npx supabase start
- npx nuxi dev --dotenv .env.local

### Fetch latest tweets

- http://localhost:3000/api/twitter/tweets

### Get pending crossposts

- http://localhost:3000/api/echo/crossposts

### Create env file

SUPABASE_KEY=your_supabase_key
SUPABASE_URL=your_supabase_url
TWITTER_BEARER_TOKEN=your_token
BLUESKY_USERNAME=your_username@bsky.social
BLUESKY_PASSWORD=your_password
