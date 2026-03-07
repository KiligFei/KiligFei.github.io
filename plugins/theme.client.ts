import { useThemePreferences } from '~/composables/useThemePreferences'

export default defineNuxtPlugin(() => {
  const { initializeTheme } = useThemePreferences()

  initializeTheme()
})
