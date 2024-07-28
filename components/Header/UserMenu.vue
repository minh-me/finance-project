<script setup lang="ts">
const authStore = useAuthStore();
const { authUser, loading } = storeToRefs(authStore);

const onLogout = async () => {
  authStore.logout();
};
</script>

<template>
  <div class="relative">
    <Button
      v-if="!authUser"
      variant="secondary"
      class="flex cursor-pointer items-center justify-center gap-x-1 border-none bg-white/10 font-light text-white outline-none transition hover:bg-white/20 focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
      @click="useGoTo().goToSignIn()"
    >
      <span>Sign In</span>
      <span>
        <Icon name="iconoir:user" class="size-5" />
      </span>
    </Button>

    <DropdownMenu v-else>
      <DropdownMenuTrigger as-child>
        <Icon
          v-if="loading"
          name="lucide:loader-circle"
          class="size-7 animate-spin text-white"
          color="white"
        />

        <Button
          v-else
          variant="secondary"
          class="flex size-8 cursor-pointer items-center justify-center rounded-full"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/radix-vue.png"
              alt="@radix-vue"
            />

            <AvatarFallback class="font-medium">M</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56" align="end">
        <template v-if="authUser">
          <DropdownMenuItem @click="navigateTo('/trips')">
            My trips
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/reservations')">
            Reservations
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/favorites')">
            My Favorites
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/properties')">
            My Properties
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem @click="onLogout">
            <Icon name="lucide:log-out" class="mr-2" size="16" />
            Logout
          </DropdownMenuItem>
        </template>

        <template v-else>
          <DropdownMenuItem @click="navigateTo('/auth/sign-up')">
            Register
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo('/auth/sign-in')">
            Login
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
