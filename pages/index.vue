<script setup lang="ts"></script>

<template>
  <div>
    Home Page
    <Button variant="link" @click="navigateTo('/about')">About</Button>
    <Button @click="navigateTo('/auth/sign-in')">Login</Button>
  </div>
</template>

<style lang="scss" scoped></style>
