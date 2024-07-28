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
const isOpen = ref(false);

const onClick = (href: string) => {
  router.push(href);
  isOpen.value = false;
};
</script>

<template>
  <div class="lg:hidden">
    <Sheet :open="isOpen">
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
          @click="isOpen = !isOpen"
        >
          <Icon name="lucide:menu" class="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" class="px-2">
        <nav class="flex flex-col gap-y-2 pt-6">
          <Button
            v-for="menu in menus"
            :key="menu.href"
            :variant="menu.href === route.path ? 'secondary' : 'ghost'"
            class="w-full justify-start"
            @click="onClick(menu.href)"
          >
            {{ menu.label }}
          </Button>
        </nav>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit"> Save changes </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
