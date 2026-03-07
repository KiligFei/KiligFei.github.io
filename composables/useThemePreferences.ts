import { computed } from 'vue'
import {
  applyThemeToRoot,
  defaultPalette,
  defaultThemeMode,
  isThemeMode,
  isThemePalette,
  modeStorageKey,
  paletteStorageKey,
} from '~/utils/theme'
import type { ThemeMode, ThemePalette } from '~/utils/theme'

function getPreferredMode(): ThemeMode {
  if (!process.client)
    return defaultThemeMode

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredMode(): ThemeMode | null {
  if (!process.client)
    return null

  const value = window.localStorage.getItem(modeStorageKey)
  return isThemeMode(value) ? value : null
}

function getStoredPalette(): ThemePalette | null {
  if (!process.client)
    return null

  const value = window.localStorage.getItem(paletteStorageKey)
  return isThemePalette(value) ? value : null
}

function getModeFromDom(): ThemeMode | null {
  if (!process.client)
    return null

  const value = document.documentElement.dataset.mode || null
  return isThemeMode(value) ? value : null
}

function getPaletteFromDom(): ThemePalette | null {
  if (!process.client)
    return null

  const value = document.documentElement.dataset.theme || null
  return isThemePalette(value) ? value : null
}

function persistTheme(mode: ThemeMode, palette: ThemePalette) {
  if (!process.client)
    return

  window.localStorage.setItem(modeStorageKey, mode)
  window.localStorage.setItem(paletteStorageKey, palette)
}

function resolveTheme() {
  return {
    mode: getModeFromDom() || getStoredMode() || getPreferredMode(),
    palette: getPaletteFromDom() || getStoredPalette() || defaultPalette,
  }
}

export function applyTheme(mode: ThemeMode, palette: ThemePalette) {
  if (!process.client)
    return

  applyThemeToRoot(document.documentElement, mode, palette)
  persistTheme(mode, palette)
}

export function useThemePreferences() {
  const mode = useState<ThemeMode>('theme-mode', () => defaultThemeMode)
  const palette = useState<ThemePalette>('theme-palette', () => defaultPalette)
  const ready = useState<boolean>('theme-ready', () => false)

  function syncTheme(nextMode: ThemeMode, nextPalette: ThemePalette) {
    mode.value = nextMode
    palette.value = nextPalette
    applyTheme(nextMode, nextPalette)
  }

  function initializeTheme() {
    if (!process.client)
      return

    const resolvedTheme = resolveTheme()
    syncTheme(resolvedTheme.mode, resolvedTheme.palette)
    ready.value = true
  }

  function setMode(value: ThemeMode) {
    if (!isThemeMode(value))
      return

    syncTheme(value, palette.value)
  }

  function setPalette(value: ThemePalette) {
    if (!isThemePalette(value))
      return

    syncTheme(mode.value, value)
  }

  function toggleDark() {
    setMode(mode.value === 'dark' ? 'light' : 'dark')
  }

  return {
    mode,
    palette,
    ready,
    isDark: computed(() => mode.value === 'dark'),
    initializeTheme,
    setMode,
    setPalette,
    toggleDark,
  }
}
