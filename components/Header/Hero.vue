<script setup lang="ts">
const authStore = useAuthStore();
const { authUser, loading } = storeToRefs(authStore);
</script>
<template>
  <div class="mb-4 space-y-2">
    <h2 class="text-2xl font-medium text-white lg:text-4xl">
      Welcome Back{{
        authUser?.user || !loading ? `, ${authUser?.user.fullName}` : " "
      }}👋🏻
    </h2>

    <p class="text-sm text-[#89B6FD] lg:text-base">
      This is your Financial Overview Report
    </p>
  </div>
</template>
