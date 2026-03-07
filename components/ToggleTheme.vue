<script setup lang="ts">
import { useThemePreferences } from '~/composables/useThemePreferences'
import { themeModeOptions } from '~/utils/theme'

const { mode, setMode } = useThemePreferences()
</script>

<template>
  <div
    class="theme-toggle flex items-center gap-1 rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] p-1 shadow-[var(--shadow-soft)]"
    aria-label="Color mode"
    role="toolbar"
  >
    <button
      v-for="item in themeModeOptions"
      :key="item.id"
      type="button"
      class="theme-mode-button flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-accent)] active:translate-y-[1px]"
      :class="mode === item.id
        ? 'bg-[var(--c-surface-strong)] text-[var(--c-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
        : 'text-[var(--c-text-faint)] hover:text-[var(--c-text)]'"
      :aria-label="`Use ${item.label.toLowerCase()} mode`"
      :aria-pressed="mode === item.id"
      @click="setMode(item.id)"
    >
      <span
        class="text-base transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="[item.icon, mode === item.id ? 'scale-100 opacity-100' : 'scale-90 opacity-70']"
      />
      <span class="hidden md:inline">{{ item.label }}</span>
    </button>
  </div>
</template>
