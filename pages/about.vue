<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div>
    About Page
    <Button @click="navigateTo('/auth/sign-in')">Login</Button>
    <Button variant="ghost" @click="authStore.logout">Logout</Button>
  </div>
</template>

<style lang="scss" scoped></style>
