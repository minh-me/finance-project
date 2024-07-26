<script setup lang="ts">
import { useForm } from "vee-validate";
import { otpApi } from "~/apis/pre-built/10-otp.api";
import { AccountTypeEnum, OtpTypeEnum, SendOtpToEnum } from "~/utils/enums";
import {
  calculatePasswordStrength,
  verifyAuthKey,
} from "~/utils/helpers/auth.helper";
import { handleError } from "~/utils/helpers/handle-error.helper";
import { RegisterSchema } from "~/validations/auth.validation";

definePageMeta({ layout: "auth", middleware: "only-visitor" });

const query = useRoute().query;
const authStore = useAuthStore();
const { goToQueryFrom, goToSignIn } = useGoTo();
const { loading, authUser } = storeToRefs(authStore);

const { handleSubmit, values, errors } = useForm({
  validationSchema: RegisterSchema,
});

const otpCodeExpiredCountDown = ref(0);
const startCountDown = (seconds: number = 60) => {
  otpCodeExpiredCountDown.value = seconds;

  const interval = setInterval(() => {
    if (otpCodeExpiredCountDown.value > 0) {
      otpCodeExpiredCountDown.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const getOtpItemToSend = (authKey: string) => {
  const { email, phone } = verifyAuthKey(authKey);
  return {
    otpType: OtpTypeEnum.Register,
    sendOtpTo: phone ? SendOtpToEnum.Phone : SendOtpToEnum.Email,
    email,
    phone,
  };
};

const isOTPSent = ref(false);
const isOtpSubmitting = ref(false);
const onSubmitOTP = async (authKey: string) => {
  isOtpSubmitting.value = true;

  try {
    await otpApi.sendOtp(getOtpItemToSend(authKey));
    startCountDown();
  } catch (error) {
    handleError(error);
  }

  isOtpSubmitting.value = false;
  isOTPSent.value = true;
};

const onSubmit = handleSubmit(async formValues => {
  const { authKey, acceptTerms, ...item } = formValues;
  await authStore.register({
    ...getOtpItemToSend(authKey),
    ...item,
    ...verifyAuthKey(authKey),
    accountType: AccountTypeEnum.Local,
  });

  if (authUser.value) goToQueryFrom(query?.from as string);
});

const progress = ref(0);
watch(
  () => values.password,
  passwordInput => {
    if (passwordInput)
      progress.value = calculatePasswordStrength(passwordInput);
    else progress.value = 0;
  },
);
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Heading -->
    <AuthHeading
      title="Sign Up"
      description="Your Social Campaigns"
      class="text-center"
    />

    <!-- Login with Social -->
    <AuthSocialLogin />

    <!-- Separator -->
    <div class="py-2">
      <Separator label="Or" />
    </div>

    <!-- Form -->
    <form class="space-y-4 md:space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="fullName">
        <FormItem>
          <FormControl>
            <Input
              class="py-5 text-[13px] opacity-90 md:text-sm"
              type="text"
              placeholder="Full name *"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="text-[13px] opacity-85" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="authKey">
        <FormItem>
          <FormControl>
            <Input
              class="py-5 text-[13px] opacity-90 md:text-sm"
              type="text"
              placeholder="Email or Phone *"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="text-[13px] opacity-85" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormControl>
            <Input
              class="py-5 text-[13px] opacity-90 md:text-sm"
              type="password"
              placeholder="Password *"
              v-bind="componentField"
            />
          </FormControl>

          <!-- Password requirements -->
          <div class="space-y-2 py-1">
            <div class="flex items-center space-x-2">
              <Progress
                class="h-1 rounded-full bg-secondary"
                :model-value="progress >= 25 ? 100 : 0"
              />

              <Progress
                class="h-1 rounded-full bg-secondary"
                :model-value="progress >= 50 ? 100 : 0"
              />

              <Progress
                class="h-1 rounded-full bg-secondary"
                :model-value="progress >= 75 ? 100 : 0"
              />

              <Progress
                class="h-1 rounded-full bg-secondary"
                :model-value="progress >= 100 ? 100 : 0"
              />
            </div>

            <p
              class="text-xs"
              :class="[
                errors['password']
                  ? 'text-red-500 opacity-90'
                  : 'text-gray-400 opacity-90',
              ]"
            >
              Use 6 or more characters with a mix of letters, numbers & symbols.
            </p>
          </div>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="otpCode">
        <FormItem>
          <FormControl>
            <div class="relative h-full w-full items-center">
              <Input
                class="z-10 rounded-e-full py-5 text-[13px] opacity-90 md:text-sm"
                type="text"
                placeholder="OTP Code *"
                v-bind="componentField"
                :disabled="!isOTPSent || isOtpSubmitting"
              />

              <Button
                class="absolute inset-y-0 end-0 z-20 h-full rounded-full bg-green-500 text-xs opacity-100 transition-opacity duration-300 hover:bg-green-500 hover:opacity-90"
                :disabled="
                  errors.authKey ||
                  !values.authKey ||
                  otpCodeExpiredCountDown ||
                  isOtpSubmitting
                "
                @click="onSubmitOTP(values.authKey!)"
              >
                <Icon
                  v-if="isOtpSubmitting"
                  name="lucide:loader"
                  class="mr-2 h-4 w-4 animate-spin"
                />

                {{
                  otpCodeExpiredCountDown
                    ? `Resend in ${otpCodeExpiredCountDown}`
                    : "Send OTP"
                }}
              </Button>
            </div>
          </FormControl>

          <FormMessage class="text-[13px] opacity-85" />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value, handleChange }"
        type="checkbox"
        name="acceptTerms"
      >
        <FormItem>
          <div class="flex items-center gap-x-2 space-y-0">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>

            <FormLabel
              class="user-select-none text-xs leading-none text-gray-700 md:text-[13px]"
            >
              I Accept the
              <NuxtLink
                to="/"
                target="_blank"
                class="text-xs text-primary transition-all hover:underline hover:opacity-90 md:text-sm"
                >Terms</NuxtLink
              >
            </FormLabel>
          </div>

          <FormMessage class="text-[13px] opacity-85" />
        </FormItem>
      </FormField>

      <div class="flex w-full flex-row items-center py-2">
        <Button
          type="submit"
          class="user-select-none w-full py-5"
          :disabled="
            errors.otpCode || !values.otpCode || isOtpSubmitting || loading
          "
        >
          <Icon
            v-if="loading"
            name="lucide:loader"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Sign Up
        </Button>
      </div>
    </form>

    <!-- Sign up navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 text-[13px] font-medium md:text-sm"
    >
      <span class="text-gray-400">Already have an Account? </span>
      <Button
        type="button"
        variant="link"
        class="px-0 text-primary transition hover:underline hover:opacity-90"
        @click="goToSignIn(query)"
      >
        Sign In
      </Button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
