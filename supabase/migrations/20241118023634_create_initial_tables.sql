-- Create initial tables for tweet cross-posting

-- Create enum for supported services
create type public.social_service as enum ('bluesky', 'mastodon', 'threads');

-- Create enum for crosspost status
create type public.crosspost_status as enum ('pending', 'completed', 'failed');

-- Users table to store Twitter user data
create table if not exists public.users (
    twitter_id text primary key,
    name text not null,
    username text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- For tracking the last synced tweet
create table if not exists public.sync_state (
    id bigint generated always as identity primary key,
    last_tweet_id text not null,
    last_sync_at timestamptz default now()
);

-- Media table to store tweet media
create table if not exists public.tweet_media (
    media_key text primary key,
    type text not null,
    url text,
    preview_image_url text,
    duration_ms int,
    created_at timestamptz default now()
);

-- Main tweets table
create table if not exists public.tweet_crosspost (
    tweet_id text primary key,
    twitter_user_id text references public.users(twitter_id),
    tweet_text text not null,
    tweet_created_at timestamptz not null,
    attachments jsonb,
    created_at timestamptz default now()
);

-- Cross-posting status per service
create table if not exists public.crosspost_service_status (
    tweet_id text references public.tweet_crosspost(tweet_id),
    service public.social_service not null,
    status public.crosspost_status not null default 'pending',
    external_id text,
    external_url text,
    attempt_count int default 0,
    last_attempt_at timestamptz,
    error_message text,
    completed_at timestamptz,
    created_at timestamptz default now(),
    primary key (tweet_id, service)
);

-- Indexes
create index idx_tweet_crosspost_created_at 
    on public.tweet_crosspost(created_at desc);

create index idx_tweet_crosspost_user 
    on public.tweet_crosspost(twitter_user_id);

create index idx_tweet_media_type 
    on public.tweet_media(type);

create index idx_crosspost_service_status_lookup 
    on public.crosspost_service_status(service, status);