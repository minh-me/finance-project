<script setup lang="ts">
import type { Column } from "@tanstack/vue-table";
import { cn } from "@/lib/utils";
import type { Task } from "~/tasks/data/schema";

interface Props {
  column: Column<Task, any>;
  title: string;
}

defineProps<Props>();
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div
    v-if="column.getCanSort()"
    :class="cn('flex items-center space-x-2', $attrs.class ?? '')"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ title }}</span>

          <Icon
            v-if="column.getIsSorted() === 'desc'"
            name="formkit:arrowdown"
            class="ml-2 h-4 w-4"
          />

          <Icon
            v-else-if="column.getIsSorted() === 'asc'"
            name="formkit:arrowup"
            class="ml-2 h-4 w-4"
          />

          <Icon v-else class="ml-2 h-4 w-4" name="radix-icons:caret-sort" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false, true)">
          <Icon
            name="formkit:arrowup"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Asc
        </DropdownMenuItem>

        <DropdownMenuItem @click="column.toggleSorting(true, true)">
          <Icon
            name="formkit:arrowdown"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Desc
        </DropdownMenuItem>

        <DropdownMenuItem
          v-if="column.getIsSorted()"
          @click="column.clearSorting()"
        >
          <Icon
            name="radix-icons:caret-sort"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Clear
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          @click="
            () => {
              column.clearSorting();
              column.toggleVisibility(false);
            }
          "
        >
          <Icon
            name="radix-icons:eye-none"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>
