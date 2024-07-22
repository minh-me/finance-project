<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import type { AuthUser } from "~/types/pre-built/1-auth";

definePageMeta({ layout: "auth" });

const isPasswordVisible = ref(false);

const forgotValues = ref<{ authKey: string; otpCode: string }>();
const onForgotSubmitted = (values: { authKey: string; otpCode: string }) => {
  forgotValues.value = values;
  isPasswordVisible.value = true;
};

const onResetPasswordSubmitted = (values: AuthUser) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
    ),
  });
};
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Heading -->
    <AuthHeading
      v-if="!isPasswordVisible"
      title="Forgot Password"
      description="Enter your email or phone to receive OTP code."
      class="text-center"
    />

    <AuthHeading
      v-else
      title="Reset Password"
      description="Enter your password to reset."
      class="text-center"
    />

    <!-- Forgot Password -->
    <AuthForgotPassword
      v-if="!isPasswordVisible"
      :initial-values="forgotValues"
      @on-submitted="onForgotSubmitted"
    />

    <!-- Reset Password -->
    <AuthResetPassword
      v-if="isPasswordVisible"
      :initial-values="forgotValues"
      @on-submitted="onResetPasswordSubmitted"
    />

    <!-- Navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 text-[13px] font-medium md:text-sm"
    >
      <template v-if="!isPasswordVisible">
        <span class="text-gray-400">Already have an Account? </span>
        <NuxtLink
          to="/auth/sign-in"
          class="text-primary transition hover:underline hover:opacity-90"
        >
          Sign in
        </NuxtLink>
      </template>

      <template v-else>
        <span class="text-gray-400">Want to return? </span>
        <div
          class="flex flex-row items-center text-[13px] font-medium text-primary transition hover:underline hover:opacity-90"
        >
          <Icon name="carbon:chevron-left" />
          <span
            class="cursor-pointer transition hover:opacity-90"
            @click="
              () => {
                isPasswordVisible = false;
              }
            "
          >
            Go back
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
