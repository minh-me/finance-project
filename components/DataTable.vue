<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { ref } from "vue";
import { valueUpdater } from "@/lib/utils";
import type { Priority, Status, Task } from "~/tasks/data/schema";
import { priorities, statuses } from "~/tasks/data/data";
import {
  getSortQuery,
  updateSortQuery,
  verifyQuery,
} from "~/utils/helpers/format-sorts";

interface DataTableProps {
  columns: ColumnDef<Task, any>[];
  data: Task[];
}
const props = defineProps<DataTableProps>();
const route = useRoute();

const sorting = ref<SortingState>(getSortQuery(route.query._sort?.toString()));
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

watch(
  () => route.query,
  () => {
    console.log({
      filterWatch: route.query,
      verifyQuery: verifyQuery(route.query as Record<string, any>),
    });
  },
);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  enableRowSelection: true,
  onSortingChange: updaterOrValue => {
    valueUpdater(updaterOrValue, sorting);

    updateSortQuery(sorting.value);
  },
  onColumnFiltersChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue =>
    valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  // manualFiltering: true,
  getPaginationRowModel: getPaginationRowModel(),
  // getSortedRowModel: getSortedRowModel(),
  manualSorting: true,
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
});

const onFilter = (filter: {
  keyword?: string;
  statuses?: Status[];
  priorities?: Priority[];
}) => {
  table.getColumn("title")?.setFilterValue(filter.keyword);
  table
    .getColumn("status")
    ?.setFilterValue(filter.statuses?.map(status => status.value));
  table
    .getColumn("priority")
    ?.setFilterValue(filter.priorities?.map(priority => priority.value));

  console.log({
    keyword: filter.keyword,
    statuses: filter.statuses,
    priorities: filter.priorities,
  });
};
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar
      :table="table"
      :statuses="statuses"
      :priorities="priorities"
      @on-filter="onFilter"
    />

    {{ sorting }}
    <Button @click="table.resetSorting()">Reset Sorting</Button>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>
