<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="props.class">
    <h2 class="text-lg font-semibold md:text-xl lg:text-2xl">{{ title }}</h2>
    <p
      v-if="description"
      class="mt-2 text-[13px] font-medium text-gray-400 md:text-sm"
    >
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
