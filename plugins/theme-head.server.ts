import { defaultPalette, defaultThemeMode, getThemeBootstrapScript } from '~/utils/theme'

export default defineNuxtPlugin(() => {
  useHead({
    htmlAttrs: {
      'data-mode': defaultThemeMode,
      'data-theme': defaultPalette,
    },
    script: [
      {
        id: 'kilig-theme-init',
        children: getThemeBootstrapScript(),
      },
    ],
  })
})
