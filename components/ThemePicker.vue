<script setup lang="ts">
import { useThemePreferences } from '~/composables/useThemePreferences'
import { themePalettes } from '~/utils/theme'

const props = withDefaults(defineProps<{
  mobile?: boolean
}>(), {
  mobile: false,
})

const { palette, setPalette } = useThemePreferences()
</script>

<template>
  <div
    class="theme-picker flex rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] shadow-[var(--shadow-soft)]"
    :class="mobile ? 'w-full items-stretch gap-1.5 p-1.5' : 'items-center gap-1 p-1'"
    aria-label="Accent theme"
    role="toolbar"
  >
    <button
      v-for="item in themePalettes"
      :key="item.id"
      type="button"
      class="theme-chip group flex items-center rounded-full text-sm transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-[1px]"
      :class="[
        mobile ? 'min-w-0 flex-1 justify-center gap-2 px-3 py-2.5' : 'gap-2 px-2.5 py-2',
        palette === item.id ? 'bg-[var(--c-surface-strong)] text-[var(--c-text)]' : 'text-[var(--c-text-faint)] hover:text-[var(--c-text)]',
      ]"
      :aria-label="`Use ${item.label} palette`"
      :aria-pressed="palette === item.id"
      :title="item.description"
      @click="setPalette(item.id)"
    >
      <span
        class="theme-chip-dot h-4 w-4 rounded-full border border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
        :style="{ background: item.swatch }"
      />
      <span :class="mobile ? 'truncate text-[0.7rem] uppercase tracking-[0.18em]' : 'hidden lg:inline'">{{ item.label }}</span>
    </button>
  </div>
</template>
