<script setup lang="ts">
interface Props {
  href: string;
  label: string;
}

const props = defineProps<Props>();
const isActive = computed(() => props.href === useRoute().path);
</script>

<template>
  <Button
    variant="outline"
    class="w-full justify-between border-none font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto"
    :class="{
      'bg-white/10 text-white': isActive,
      'bg-transparent': !isActive,
    }"
    as-child
  >
    <NuxtLink :to="props.href">{{ props.label }}</NuxtLink>
  </Button>
</template>
