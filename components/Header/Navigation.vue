<script setup lang="ts">
const menus = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/accounts", label: "Account" },
  { href: "/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];
</script>

<template>
  <nav class="hidden items-center gap-x-2 overflow-x-auto lg:flex">
    <HeaderNavButton
      v-for="menu in menus"
      :key="menu.href"
      :href="menu.href"
      :label="menu.label"
    />
  </nav>
</template>
