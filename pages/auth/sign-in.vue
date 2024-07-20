<script setup lang="ts">
import { useForm } from "vee-validate";
import { toast } from "~/components/ui/toast";
import { LoginSchema } from "~/validations/auth.validation";

definePageMeta({ layout: "auth" });

const loading = ref(false);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: LoginSchema,
});

const onSubmit = handleSubmit(values => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
    ),
  });
});
</script>

<template>
  <div class="w-full space-y-8">
    <!-- Heading -->
    <div class="text-center md:pt-6">
      <h2 class="text-lg font-semibold md:text-xl lg:text-2xl">Sign In</h2>
      <p class="mt-2 text-[13px] font-medium text-gray-400 md:text-sm">
        Your Social Campaigns
      </p>
    </div>

    <!-- Login with Social -->
    <div class="flex flex-col gap-x-3 gap-y-3 md:flex-row">
      <Button
        variant="outline"
        class="w-full py-5 text-center text-[13px] text-gray-600 md:text-sm"
      >
        <Icon
          name="flat-color-icons:google"
          color="black"
          size="15"
          class="mr-2"
        />
        Sign in with Google
      </Button>

      <Button
        variant="outline"
        class="w-full py-5 text-center text-[13px] text-gray-600 md:text-sm"
      >
        <Icon name="logos:apple" color="black" size="15" class="mr-2" />

        Sign in with Apple
      </Button>
    </div>

    <!-- Separator -->
    <div class="flex w-full items-center gap-2">
      <div class="h-[1px] w-full bg-gray-200" />
      <p class="text-center text-xs text-gray-400">Or</p>
      <div class="h-[1px] w-full bg-gray-200" />
    </div>

    <!-- Form -->
    <form class="space-y-4 md:space-y-6" @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="authKey"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              class="py-5 text-[13px] opacity-90 md:py-6 md:text-sm"
              type="text"
              placeholder="Email or Phone"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="text-[13px] opacity-85" />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="password"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              class="py-5 text-[13px] opacity-90 md:py-6 md:text-sm"
              type="password"
              placeholder="Password"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="text-[13px] opacity-85" />

          <div class="py-1 text-end">
            <span
              class="cursor-pointer py-1 text-[13px] text-primary transition hover:underline hover:opacity-90 md:text-sm"
            >
              Forgot Password ?
            </span>
          </div>
        </FormItem>
      </FormField>

      <div class="flex w-full flex-row items-center py-2">
        <Button
          type="submit"
          class="user-select-none w-full py-5"
          :disabled="loading"
        >
          <Icon
            v-if="loading"
            name="lucide:loader"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Sign In
        </Button>
      </div>
    </form>

    <!-- Sign up navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 text-[13px] font-medium md:text-sm"
    >
      <span class="text-gray-400">Not a Member yet? </span>
      <NuxtLink
        to="/auth/sign-up"
        class="text-primary transition hover:underline hover:opacity-90"
        >Sign up</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="css" scoped></style>
