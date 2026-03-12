export type ThemeMode = 'light' | 'dark'
export type ThemePalette = 'clay' | 'sage' | 'ocean'

export interface ThemePaletteOption {
  id: ThemePalette
  label: string
  description: string
  swatch: string
}

export interface ThemeModeOption {
  id: ThemeMode
  label: string
  icon: string
}

export const modeStorageKey = 'kilig-theme-mode'
export const paletteStorageKey = 'kilig-theme-palette'
export const defaultThemeMode: ThemeMode = 'light'
export const defaultPalette: ThemePalette = 'clay'

export const themePalettes: ThemePaletteOption[] = [
  {
    id: 'clay',
    label: 'Clay',
    description: 'Warm terracotta with soft parchment neutrals.',
    swatch: '#b86b45',
  },
  {
    id: 'sage',
    label: 'Sage',
    description: 'Muted green with calm editorial contrast.',
    swatch: '#557a58',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    description: 'Deep teal with clean, high-contrast surfaces.',
    swatch: '#2e6d73',
  },
]

export const themeModeOptions: ThemeModeOption[] = [
  {
    id: 'light',
    label: 'Light',
    icon: 'i-ph-sun-dim-fill',
  },
  {
    id: 'dark',
    label: 'Dark',
    icon: 'i-ph-moon-stars-fill',
  },
]

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark'
}

export function isThemePalette(value: string | null): value is ThemePalette {
  return themePalettes.some(item => item.id === value)
}

export function applyThemeToRoot(root: HTMLElement, mode: ThemeMode, palette: ThemePalette) {
  root.dataset.mode = mode
  root.dataset.theme = palette
  root.classList.toggle('dark', mode === 'dark')
  root.style.colorScheme = mode
}

export function getThemeBootstrapScript() {
  const paletteIds = JSON.stringify(themePalettes.map(item => item.id))

  return `(function(){try{var root=document.documentElement;var modeKey='${modeStorageKey}';var paletteKey='${paletteStorageKey}';var paletteIds=${paletteIds};var storedMode=window.localStorage.getItem(modeKey);var storedPalette=window.localStorage.getItem(paletteKey);var mode=storedMode==='light'||storedMode==='dark'?storedMode:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var palette=paletteIds.indexOf(storedPalette)>-1?storedPalette:'${defaultPalette}';root.dataset.mode=mode;root.dataset.theme=palette;root.classList.toggle('dark',mode==='dark');root.style.colorScheme=mode;}catch(error){}})();`
}
