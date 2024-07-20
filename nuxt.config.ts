export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxt/icon",
  ],
  runtimeConfig: {
    app: {},
    openaiKey: "",
    replicateKey: "",
    appUrl: "",
    public: {
      apiBase: "http://localhost:8888/api",
      firebaseConfig: "",
    },
  },

  components: [
    {
      path: "~/components/shared",
      extensions: [".vue"],
      prefix: "",
    },
    {
      path: "~/components",
      extensions: [".vue"],
      prefix: "",
    },
  ],
});
