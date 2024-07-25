<script setup lang="ts">
const authStore = useAuthStore();
authStore.refreshAuthFromSession();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <Toaster />
  </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

html {
  font-family: "Inter", sans-serif;
}
</style>
