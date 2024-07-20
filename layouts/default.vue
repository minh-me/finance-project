<script setup lang="ts">
const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style>
/* @import 'vue-select/dist/vue-select.css';

:root {
  --vs-dropdown-option--active-bg: #ffe4e6;
  --vs-dropdown-option--active-color: #000;
} */
/* .vs__selected {
	@apply text-lg;
} */

/* .vs__dropdown-menu {
  overflow-x: hidden;
} */
</style>
