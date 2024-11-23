<script setup lang="ts">
import { ref, onMounted } from "vue";

const crossposts = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const formatTweetText = (text: string) => {
  return text.replaceAll("\n", "<br>");
};

const fetchCrossposts = async () => {
  try {
    const response = await fetch("/api/echo/crossposts");
    const data = await response.json();
    crossposts.value = data.tweets;
  } catch (e) {
    error.value = "Failed to load crossposts";
  } finally {
    loading.value = false;
  }
};

const crosspostTweet = async (tweetId: string) => {
  try {
    console.log("CROSSPOSTING", tweetId);
    const response = await fetch("/api/echo/crosspost", {
      method: "post",
      body: JSON.stringify({ tweetId }),
    });
    const data = await response.json();
    console.log("DATA", data);
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  fetchCrossposts();
});
</script>

<template>
  <div class="dashboard">
    <h1>Crosspost Dashboard</h1>

    <div v-if="loading" class="loading">Loading crossposts...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div class="posts-grid">
      <div v-for="post in crossposts" :key="post.tweet_id" class="post-entry">
        <span v-html="formatTweetText(post.tweet_text)"></span>
        <img
          v-for="media in post.tweet_media"
          :key="media.media_key"
          class="post-media"
          :src="media.url"
        />
        <button @click="crosspostTweet(post.tweet_id)">Crosspost</button>
      </div>
    </div>
  </div>
</template>

<style>
html {
  background-color: black;
}

.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #dc3545;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.post-entry {
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
  color: white;
  border-radius: 6px;
  padding: 24px;
  border: 1px solid rgb(228, 228, 231);
}

.post-media {
  max-width: 100%;
  border-radius: 6px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  color: #666;
}

.platforms {
  display: flex;
  gap: 8px;
}

.platform {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.bluesky {
  background: #e8f0fe;
  color: #1a73e8;
}

.mastodon {
  background: #e9ecef;
  color: #563acc;
}

.threads {
  background: #f8f9fa;
  color: #212529;
}
</style>
