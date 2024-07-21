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
const navigateToSignUp = () => {
  const query = useRoute().query;

  return useRouter().push({
    path: "/auth/sign-up",
    query: query,
  });
};

const navigateToForgotPassword = () => {
  const query = useRoute().query;

  return useRouter().push({
    path: "/auth/reset-password",
    query: query,
  });
};
</script>

<template>
  <div class="w-full space-y-8">
    <!-- Heading -->
    <AuthHeading
      title="Sign In"
      description="Your Social Campaigns"
      class="text-center"
    />

    <!-- Login with Social -->
    <AuthSocialLogin />

    <!-- Separator -->
    <Separator label="Or" />

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

          <div class="text-end">
            <Button
              type="button"
              variant="link"
              class="text-[13px] font-normal text-primary md:text-sm"
              @click="navigateToForgotPassword"
            >
              Forgot Password ?
            </Button>
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
      <Button
        type="button"
        variant="link"
        class="px-0 text-primary transition hover:underline hover:opacity-90"
        @click="navigateToSignUp"
      >
        Sign up
      </Button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
