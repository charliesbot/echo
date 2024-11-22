<script setup lang="ts">
import { ref, onMounted } from "vue";

const crossposts = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchCrossposts = async () => {
  try {
    const response = await fetch("/api/echo/crossposts");
    const data = await response.json();
    crossposts.value = data.tweets;
    console.log("Crossposts", data);
  } catch (e) {
    error.value = "Failed to load crossposts";
  } finally {
    loading.value = false;
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
    <div v-for="post in crossposts" :key="post.tweet_id" class="posts-grid">
      <div class="post-column">
        {{ post.tweet_text }}
      </div>
    </div>
  </div>
</template>

<style>
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
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: white;
}

.post-column {
}

.post-content {
  margin-bottom: 12px;
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
