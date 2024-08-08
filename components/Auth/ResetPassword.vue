<script setup lang="ts">
import { useForm } from "vee-validate";
import type { AuthUser } from "~/types/pre-built/1-auth";
import type { VerifyOtp } from "~/types/pre-built/10-otp";
import {
  ResetPasswordSchema,
  calculatePasswordStrength,
} from "~/validations/auth.validation";

interface Props {
  initialValues: VerifyOtp;
}
interface Emits {
  (e: "onSubmitted", values: AuthUser): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const authStore = useAuthStore();
const { loading, authUser } = storeToRefs(authStore);

const { handleSubmit, values, errors } = useForm({
  validationSchema: ResetPasswordSchema,
});

const onSubmit = handleSubmit(async ({ password, isLogoutOthers }) => {
  await authStore.resetPasswordWithOtp({
    ...props.initialValues,
    password,
    isLogoutOthers,
  });

  if (authUser.value) {
    emits("onSubmitted", authUser.value);
  }
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
  <!-- Form -->
  <form class="space-y-4 md:space-y-6" @submit="onSubmit">
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

    <FormField v-slot="{ componentField }" name="passwordConfirm">
      <FormItem>
        <FormControl>
          <Input
            class="py-5 text-[13px] opacity-90 md:text-sm"
            type="password"
            placeholder="Repeat Password *"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage class="text-[13px] opacity-85" />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="isLogoutOthers"
    >
      <FormItem>
        <div class="flex items-center gap-x-2 space-y-0">
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>

          <FormLabel
            class="user-select-none text-xs leading-none text-gray-700 md:text-[13px]"
          >
            Log out of other devices
          </FormLabel>
        </div>

        <FormMessage class="text-[13px] opacity-85" />
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
        Reset Password
      </Button>
    </div>
  </form>
</template>
