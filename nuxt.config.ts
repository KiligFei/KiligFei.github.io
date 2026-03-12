// nuxt.config.ts
export default defineNuxtConfig({
  // 必须设置为 static 兼容 GitHub Pages
  ssr: true, // 或者 false，取决于你是否需要预渲染
  nitro: {
    static: true,
  },
  sourcemap: {
    server: false,
    client: false,
  },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
  ],
  content: {
    documentDriven: true,
  },
})
