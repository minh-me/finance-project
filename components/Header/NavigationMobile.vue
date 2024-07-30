<script setup lang="ts">
const menus = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/accounts", label: "Account" },
  { href: "/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];

const router = useRouter();
const route = useRoute();

const íOpen = ref(false);

const onClick = (href: string) => {
  router.push(href);
  íOpen.value = false;
};

const handleUpdateOpen = (value: any) => {
  íOpen.value = value;
};
</script>

<template>
  <div class="lg:hidden">
    <Sheet :open="íOpen" @update:open="handleUpdateOpen">
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
        >
          <Icon name="lucide:menu" class="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" class="px-2">
        <SheetHeader>
          <SheetTitle>
            <NuxtLink to="/">
              <div class="flex items-center gap-2 px-3">
                <img src="/logo-dark.svg" alt="logo" height="28" width="28" />
                <p class="text-2xl font-semibold text-blue-600">Finance</p>
              </div>
            </NuxtLink></SheetTitle
          >
          <SheetDescription />
        </SheetHeader>

        <nav class="flex flex-col gap-y-2 pt-6">
          <Button
            v-for="menu in menus"
            :key="menu.href"
            :variant="menu.href === route.path ? 'secondary' : 'ghost'"
            class="w-full justify-start"
            :class="{ 'text-primary': menu.href === route.path }"
            @click="onClick(menu.href)"
          >
            {{ menu.label }}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  </div>
</template>
