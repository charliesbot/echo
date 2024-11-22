// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  runtimeConfig: {
    twitterBearerToken: process.env.TWITTER_BEARER_TOKEN,
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: ["@nuxtjs/supabase"],
  supabase: {
    // This will disable the default redirect
    redirect: false,
  },
});
