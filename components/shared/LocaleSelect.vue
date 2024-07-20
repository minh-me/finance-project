<script setup lang="ts">
export interface Locale {
  label: string;
  value: string;
  flag: string;
}
interface Props {
  locales: Locale[];
  localeSelected: Locale;
}
interface Emits {
  (e: "onSelect", locale: Locale): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();
const isShowDropdown = ref(false);

const onSelect = (locale: Locale) => {
  emits("onSelect", locale);
};
const onOpenDropdown = () => {
  isShowDropdown.value = !isShowDropdown.value;
};
</script>

<template>
  <!-- Language -->
  <DropdownMenu @update:open="onOpenDropdown">
    <DropdownMenuTrigger as-child>
      <div>
        <div class="flex cursor-pointer flex-row items-center space-x-2">
          <p class="flex items-center justify-start space-x-2">
            <img
              :src="localeSelected.flag"
              width="16"
              height="16"
              class="rounded"
            />

            <span class="text-xs font-medium text-gray-800 md:text-sm">
              {{ localeSelected.label }}
            </span>
          </p>

          <Icon
            :name="isShowDropdown ? `ion:chevron-up` : `ion:chevron-down`"
            size="16"
            class="font-semibold text-gray-800"
          />
        </div>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="ml-[80px] p-3">
      <DropdownMenuItem
        v-for="locale in locales"
        :key="locale.value"
        class="flex w-[200px] cursor-pointer items-center space-x-3 p-3"
        @click="onSelect(locale)"
      >
        <img :src="locale.flag" width="20" height="20" class="rounded" />

        <span class="text-[11px] text-gray-800">
          {{ locale.label }}
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
