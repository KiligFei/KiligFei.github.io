// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    ['unplugin-icons/nuxt', { /* options */ }],
  ],
  app: {
    head: {
      title: 'Kilig Fei',
    },
  },
})
