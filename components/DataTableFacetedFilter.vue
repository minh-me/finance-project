<script setup lang="ts">
import type { Option } from "~/tasks/data/schema";

interface Props {
  title?: string;
  options: Option[];
  optionsSelected?: Option[];
}

interface Emits {
  (e: "onOptionsSelected", option?: Option[]): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const selectedValues = computed(
  () => new Set(props.optionsSelected?.map(option => option.value)),
);

const handleSearchOptions = (options: Option[], term: string) => {
  return options.filter(option =>
    option.label.toLowerCase()?.includes(term.toLowerCase()),
  );
};

const onSelectOption = (e: CustomEvent) => {
  const option: Option = e.detail.value;

  const isSelected = selectedValues.value.has(option.value);

  if (isSelected) selectedValues.value.delete(option.value);
  else selectedValues.value.add(option.value);

  const optionsSelected = props.options.filter(option =>
    selectedValues.value.has(option.value),
  );

  emits("onOptionsSelected", optionsSelected);
};

const onClear = () => {
  selectedValues.value.clear();
  emits("onOptionsSelected", undefined);
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <Icon name="radix-icons:plus-circled" class="mr-2 h-4 w-4" />
        {{ title }}

        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />

          <!-- Show on mobile -->
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>

          <!-- Show on desktop -->
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter(option =>
                  selectedValues.has(option.value),
                )"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[200px] p-0" align="start">
      <!-- @vue-ignore -->
      <Command :filter-function="handleSearchOptions">
        <CommandInput :placeholder="title" />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="onSelectOption"
            >
              <div
                class="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary"
                :class="{
                  'bg-primary text-primary-foreground': selectedValues.has(
                    option.value,
                  ),
                  'opacity-50 [&_svg]:invisible': !selectedValues.has(
                    option.value,
                  ),
                }"
              >
                <Icon name="material-symbols:check" class="h-4 w-4" />
              </div>

              <Icon
                v-if="option.icon"
                :name="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              />

              <span>{{ option.label }}</span>

              <span
                v-if="option.amount"
                class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
              >
                {{ option.amount }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="onClear"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
