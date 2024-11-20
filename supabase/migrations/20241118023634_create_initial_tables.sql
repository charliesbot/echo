-- Create enum for supported services
create type public.social_service as enum ('bluesky', 'mastodon', 'threads');
create type public.crosspost_status as enum ('pending', 'completed', 'failed');
create type public.tweet_type as enum ('tweet', 'replied_to', 'quoted', 'retweeted');

-- 1. User table 
create table if not exists public.users (
    id text primary key,
    service public.social_service not null,
    name text not null,
    username text not null,
    access_jwt TEXT NOT NULL,
    refresh_jwt TEXT,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. Main tweets table
create table if not exists public.tweets (
    tweet_id text primary key,
    tweet_text text not null,
    tweet_created_at timestamptz not null,
    referenced_tweet_id text,    -- Can be null or reference another tweet
    tweet_type public.tweet_type default 'tweet',
    created_at timestamptz default now()
);

-- 3. Media table (related to tweets)
create table if not exists public.tweet_media (
    id bigint generated always as identity primary key,
    tweet_id text references public.tweets(tweet_id) ON DELETE CASCADE,
    media_key text not null unique,
    type text not null,
    url text,
    preview_image_url text,
    duration_ms int,
    created_at timestamptz default now()
);

-- 4. Cross-posting status and history
create table if not exists public.crosspost (
    id text primary key, -- CID in Bluesky
    tweet_id text references public.tweets(tweet_id) ON DELETE CASCADE,
    service public.social_service not null,
    status public.crosspost_status not null default 'pending',
    uri text,         -- Platform-specific URI (e.g., at:// for Bluesky, status URL for Mastodon)
    parent_cid text,  -- CID of the parent post in Bluesky, used for threads
    root_cid text,    -- CID of the root post in Bluesky, used for threads  
    attempt_count int default 0,
    last_attempt_at timestamptz,
    error_message text,
    completed_at timestamptz,
    created_at timestamptz default now(),
    unique(tweet_id, service)
);

-- 5. Sync history table
create table if not exists public.sync_state (
    id bigint generated always as identity primary key,
    last_tweet_id text not null,
    tweets_synced int default 0,
    tweets_crossposted int default 0,
    error_message text,
    started_at timestamptz default now(),
    completed_at timestamptz,
    created_at timestamptz default now()
);

create index if not exists idx_tweets_referenced on public.tweets(referenced_tweet_id) where referenced_tweet_id is not null;
create index if not exists idx_tweets_created on public.tweets(tweet_created_at);
create index if not exists idx_crosspost_status on public.crosspost(status) where status = 'pending';