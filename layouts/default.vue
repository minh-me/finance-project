<script setup lang="ts"></script>

<template>
  <div>
    <Header />

    <main class="px-3 lg:px-14">
      <slot />
    </main>
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
