<script setup lang="ts">
import type { Locale } from "~/components/shared/LocaleSelect.vue";

const languages: Locale[] = [
  { label: "English", value: "en", flag: "/flags/united-states.svg" },
  { label: "French", value: "fr", flag: "/flags/france.svg" },
  { label: "German", value: "de", flag: "/flags/germany.svg" },
  { label: "Spanish", value: "es", flag: "/flags/spain.svg" },
  { label: "Japanese", value: "ja", flag: "/flags/japan.svg" },
];

const localeSelected = ref(languages[0]);

const onLocaleSelect = (language: Locale) => {
  localeSelected.value = language;
};
</script>

<template>
  <div
    class="h-screen w-screen overflow-y-auto bg-[url('/auth-bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat dark:bg-[url('/auth-bg-dark.jpg')]"
  >
    <div
      class="flex flex-col justify-center gap-8 px-8 py-10 md:h-full md:w-full md:items-center lg:flex-row lg:justify-evenly lg:px-14 lg:py-16"
    >
      <div
        class="flex flex-col items-center justify-center gap-4 lg:items-start"
      >
        <!-- Logo -->
        <NuxtLink to="/">
          <img
            src="https://preview.keenthemes.com/metronic8/demo1/assets/media/logos/custom-3.svg"
            alt="Logo"
          />
        </NuxtLink>

        <!-- Heading -->
        <h2 class="md:text-md text-sm text-white lg:text-xl">
          Branding tools designed for your business
        </h2>
      </div>

      <!-- Form -->
      <div
        class="flex flex-col justify-center space-y-12 rounded-xl bg-white px-8 py-16 dark:bg-[#15171C] sm:px-14 md:h-full md:w-[600px] md:flex-1 md:px-20 lg:flex-initial lg:px-20 lg:py-12"
      >
        <div class="md:flex-1 md:content-center">
          <slot />
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <!-- language -->
          <LocaleSelect
            :locales="languages"
            :locale-selected="localeSelected"
            @on-select="onLocaleSelect"
          />

          <!-- items -->
          <div class="flex items-center justify-end gap-x-3 md:gap-x-6">
            <NuxtLink
              to="/"
              target="_blank"
              class="text-xs text-primary transition-all hover:underline hover:opacity-90 md:text-sm"
            >
              Terms
            </NuxtLink>
            <NuxtLink
              to="/"
              target="_blank"
              class="text-xs text-primary transition-all hover:underline hover:opacity-90 md:text-sm"
            >
              Plans
            </NuxtLink>
            <NuxtLink
              to="/"
              target="_blank"
              class="text-xs text-primary transition-all hover:underline hover:opacity-90 md:text-sm"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
