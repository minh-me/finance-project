<script setup lang="ts">
const newAccount = reactive({
  onOpen: () => {},
});
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
    <Card class="border-none drop-shadow-none">
      <CardHeader
        class="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between"
      >
        <CardTitle class="line-clamp-1 text-xl">Card Title</CardTitle>

        <Button @click="newAccount.onOpen" size="sm">
          <Icon name="carbon:add" class="mr-2 size-4" />
          Add mew
        </Button>
      </CardHeader>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>
