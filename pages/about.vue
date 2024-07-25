<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <div>
    <h1>About Page</h1>
    <Button variant="ghost" @click="authStore.logout">Logout</Button>
  </div>
</template>

<style lang="scss" scoped></style>
