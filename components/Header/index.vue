<template>
  <header
    class="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14"
  >
    <div class="mx-auto max-w-screen-2xl">
      <div class="mb-14 flex w-full items-center justify-between">
        <!-- Header Navigation  -->
        <div class="flex items-center lg:gap-x-16">
          <HeaderLogo />

          <HeaderNavigation />
          <HeaderNavigationMobile />
        </div>

        <!-- Header User Menu -->
        <HeaderUserMenu />
      </div>

      <!-- Header Hero -->
      <HeaderHero />
    </div>
  </header>
</template>
