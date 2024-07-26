<script setup lang="ts">
import { useForm } from "vee-validate";
import { otpApi } from "~/apis/pre-built/10-otp.api";
import type { VerifyOtp } from "~/types/pre-built/10-otp";
import { OtpTypeEnum, SendOtpToEnum } from "~/utils/enums";
import { verifyAuthKey } from "~/utils/helpers/auth.helper";
import { handleError } from "~/utils/helpers/handle-error.helper";
import { ForgotSchema } from "~/validations/auth.validation";
interface Props {
  initialValues?: VerifyOtp;
}
interface Emits {
  (e: "onSubmitted", values: VerifyOtp): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const loading = ref(false);
const otpCodeExpiredCountDown = ref(0);

const { handleSubmit, values, errors, setFieldError } = useForm({
  validationSchema: ForgotSchema,
  initialValues: {
    otpCode: "",
    authKey: props.initialValues?.email || props.initialValues?.phone,
  },
});

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
    otpType: OtpTypeEnum.ResetPassword,
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

const onSubmit = handleSubmit(async values => {
  loading.value = true;

  try {
    const verifyItem: VerifyOtp = {
      ...getOtpItemToSend(values.authKey),
      otpCode: values.otpCode!,
    };

    await otpApi.checkOtpValid(verifyItem);

    clearInterval(otpCodeExpiredCountDown.value);
    emits("onSubmitted", verifyItem);
  } catch (error) {
    setFieldError("otpCode", "Invalid OTP Code!");
    handleError(error);
  }

  loading.value = false;
});
</script>

<template>
  <form class="space-y-4 md:space-y-6" @submit="onSubmit">
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
        Continue
      </Button>
    </div>
  </form>
</template>
