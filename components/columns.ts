import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import DataTableColumnHeader from "./DataTableColumnHeader.vue";
import DataTableRowActions from "./DataTableRowActions.vue";
import type { Task } from "~/tasks/data/schema";
import { labels, priorities, statuses } from "~/tasks/data/data";
import Checkbox from "./ui/checkbox/Checkbox.vue";
import Badge from "./ui/badge/Badge.vue";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),

        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),

        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),

    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),

        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),

        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Task" }),
    cell: ({ row }) => h("div", { class: "w-20" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Title" }),

    cell: ({ row }) => {
      const label = labels.find(label => label.value === row.original.label);

      return h("div", { class: "flex space-x-2" }, [
        label ? h(Badge, { variant: "outline" }, () => label.label) : null,
        h(
          "span",
          { class: "max-w-[500px] truncate font-medium" },
          row.getValue("title"),
        ),
      ]);
    },
    enableMultiSort: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Status" }),

    cell: ({ row }) => {
      const status = statuses.find(
        status => status.value === row.getValue("status"),
      );

      if (!status) return null;

      return h("div", { class: "flex w-[100px] items-center" }, [
        status.icon &&
          h("Icon", {
            class: "mr-2 h-4 w-4 text-muted-foreground",
            name: status.icon,
          }),
        h("span", status.label),
      ]);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },

    enableMultiSort: true,
  },
  {
    accessorKey: "priority",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Priority" }),
    cell: ({ row }) => {
      const priority = priorities.find(
        priority => priority.value === row.getValue("priority"),
      );

      if (!priority) return null;

      return h("div", { class: "flex items-center" }, [
        priority.icon &&
          h("Icon", {
            class: "mr-2 h-4 w-4 text-muted-foreground",
            name: priority.icon,
          }),
        h("span", {}, priority.label),
      ]);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
