<template>
  <div>
    <h1>Success!</h1>
    <p>You've successfully logged in to Twitter.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

function logout() {
  // Here you could add actual logout logic later
  router.push("/login");
}
</script>
