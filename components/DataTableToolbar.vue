<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { useDebounceFn } from "@vueuse/core";
import { computed } from "vue";
import type { Task, Option, Status, Priority } from "~/tasks/data/schema";

const hasData = (obj: { [key: string]: any }) => {
  return Object.values(obj).some(
    value => value !== undefined && value !== null && value !== "",
  );
};

interface Props {
  table: Table<Task>;
  priorities: Priority[];
  statuses: Status[];
}
interface Emits {
  (
    e: "onFilter",
    filter: {
      keyword?: string;
      statuses?: Status[];
      priorities?: Priority[];
    },
  ): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const router = useRouter();
const route = useRoute();

const filter = reactive<{
  keyword?: string;
  statuses?: Status[];
  priorities?: Priority[];
}>({
  keyword: route.query?.keyword ? route.query.keyword.toString() : undefined,
  statuses: route.query?.statuses
    ? props.statuses.filter(status =>
        route.query.statuses?.toString()?.split(",")?.includes(status.value),
      )
    : undefined,
  priorities: route.query?.priorities
    ? props.priorities.filter(priority =>
        route.query.priorities
          ?.toString()
          ?.split(",")
          ?.includes(priority.value),
      )
    : undefined,
});

const isFiltered = computed(() => hasData(filter));
const emitQuery = () => {
  const statusesFilter = filter.statuses?.map(status => status.value);
  const prioritiesFilter = filter.priorities?.map(priority => priority.value);

  router.push({
    query: {
      ...route.query,
      statuses: statusesFilter?.length ? statusesFilter.join(",") : undefined,
      priorities: prioritiesFilter?.length
        ? prioritiesFilter.join(",")
        : undefined,
      keyword: filter.keyword,
    },
  });

  emits("onFilter", filter);
};

const onSearchChange = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement;

  filter.keyword = target.value || undefined;
  emitQuery();
}, 1000);

const onSelectStatuses = (optionsSelected?: Option[]) => {
  const statuses = props.statuses.filter(option => {
    const isSelected = optionsSelected?.some(
      selectedValue => selectedValue.value === option.value,
    );

    return isSelected;
  });

  filter.statuses = statuses?.length ? statuses : undefined;
  emitQuery();
};

const onSelectPriorities = (optionsSelected?: Option[]) => {
  const priorities = props.priorities.filter(option => {
    const isSelected = optionsSelected?.some(
      selectedValue => selectedValue.value === option.value,
    );

    return isSelected;
  });

  filter.priorities = priorities?.length ? priorities : undefined;

  emitQuery();
};

const onResetFilters = () => {
  Object.keys(filter).forEach(key => {
    // @ts-ignore
    filter[key] = undefined;
  });

  router.push({
    query: {
      statuses: filter.statuses?.map(status => status.value).join(","),
      priorities: filter.priorities?.map(priority => priority.value).join(","),
      keyword: filter.keyword,
    },
  });

  emits("onFilter", filter);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        class="h-8 w-[150px] lg:w-[250px]"
        @input="onSearchChange"
      />

      <!-- :column="table.getColumn('status')" -->
      <DataTableFacetedFilter
        v-if="statuses.length"
        title="Status"
        :options="statuses"
        :options-selected="filter.statuses"
        @on-options-selected="onSelectStatuses"
      />

      <!-- :column="table.getColumn('priority')" -->
      <DataTableFacetedFilter
        v-if="priorities.length"
        title="Priority"
        :options="priorities"
        :options-selected="filter.priorities"
        @on-options-selected="onSelectPriorities"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="onResetFilters"
      >
        Reset
        <Icon name="radix-icons:cross-2" class="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div class="hidden lg:block">
      <DataTableViewOptions :table="table" />
    </div>
  </div>
</template>
