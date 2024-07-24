<script setup lang="ts">
import type { VerifyOtp } from "~/types/pre-built/10-otp";

definePageMeta({ layout: "auth", middleware: "only-visitor" });

const isPasswordVisible = ref(false);
const forgotValues = ref<VerifyOtp>();

const { goToQueryFrom, goToSignIn } = useGoTo();

const goBack = () => {
  isPasswordVisible.value = false;
};

const onForgotSubmitted = (values: VerifyOtp) => {
  forgotValues.value = values;
  isPasswordVisible.value = true;
};

const onResetPasswordSubmitted = () => {
  goToQueryFrom();
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
      v-if="isPasswordVisible && forgotValues?.otpCode"
      :initial-values="forgotValues"
      @on-submitted="onResetPasswordSubmitted"
    />

    <!-- Navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 text-[13px] font-medium md:text-sm"
    >
      <template v-if="!isPasswordVisible">
        <span class="text-gray-400">Already have an Account? </span>
        <Button
          type="button"
          variant="link"
          class="px-0 text-primary transition hover:underline hover:opacity-90"
          @click="goToSignIn"
        >
          Sign In
        </Button>
      </template>

      <template v-else>
        <span class="text-gray-400">Want to return? </span>
        <div
          class="flex flex-row items-center text-[13px] font-medium text-primary transition hover:underline hover:opacity-90"
        >
          <Icon name="carbon:chevron-left" />
          <span
            class="cursor-pointer transition hover:opacity-90"
            @click="goBack"
          >
            Go back
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
