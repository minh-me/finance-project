<script setup lang="ts">
import { useForm } from "vee-validate";
import { toast } from "~/components/ui/toast";
import { ForgotSchema } from "~/validations/auth.validation";
interface Props {
  initialValues?: { authKey?: string; otpCode?: string };
}
interface Emits {
  (e: "onSubmit", values: { authKey: string; otpCode: string }): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const loading = ref(false);
const otpCodeExpiredCountDown = ref(0);

const { handleSubmit, values, errors } = useForm({
  validationSchema: ForgotSchema,
  initialValues: props.initialValues,
});

const startCountDown = (seconds: number) => {
  otpCodeExpiredCountDown.value = seconds;
  const interval = setInterval(() => {
    if (otpCodeExpiredCountDown.value > 0) {
      otpCodeExpiredCountDown.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const isOTPSent = ref(false);
const onSubmitOTP = (values: { authKey?: string }) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
    ),
  });

  startCountDown(60);

  isOTPSent.value = true;
};

const onSubmit = handleSubmit(() => {
  clearInterval(otpCodeExpiredCountDown.value);
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
    ),
  });

  emits("onSubmit", {
    authKey: values.authKey!,
    otpCode: values.otpCode!,
  });
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
              :disabled="!isOTPSent"
            />

            <Button
              class="absolute inset-y-0 end-0 z-20 h-full rounded-full bg-green-500 text-xs opacity-100 transition-opacity duration-300 hover:bg-green-500 hover:opacity-90"
              :disabled="
                errors.authKey || !values.authKey || otpCodeExpiredCountDown
              "
              @click="onSubmitOTP({ authKey: values.authKey })"
            >
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
        :disabled="errors.otpCode || !values.otpCode"
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
