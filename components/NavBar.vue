<script setup lang="ts">
const route = useRoute()

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/posts', label: 'Journal' },
]

function isActive(path: string) {
  return path === '/'
    ? route.path === path
    : route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <header class="site-header sticky top-0 z-50 px-5 pt-4 sm:px-8 lg:px-10">
    <div class="site-header-shell mx-auto flex max-w-[1440px] flex-col gap-3">
      <div class="flex items-center justify-between gap-4 rounded-[1.75rem] border border-[var(--c-border)] bg-[var(--c-surface-strong)] px-4 py-3 shadow-[var(--shadow-soft)] sm:px-5">
        <NuxtLink
          to="/"
          class="group flex min-w-0 items-center gap-3 rounded-full p-1 text-[var(--c-text)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px]"
          title="Home base. The journal is the playground."
        >
          <span class="brand-mark flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] text-sm font-semibold tracking-[0.2em] text-[var(--c-text)]">
            KF
          </span>
          <span class="min-w-0">
            <span class="block font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--c-text-faint)]">kilig fei</span>
            <span class="block text-sm text-[var(--c-text-soft)]">frontend notes and experiments</span>
          </span>
        </NuxtLink>

        <div class="flex items-center gap-2 sm:gap-3">
          <nav class="hidden items-center gap-1 rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] p-1 md:flex">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="nav-link rounded-full px-4 py-2 text-sm font-medium text-[var(--c-text-soft)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[var(--c-text)] active:translate-y-[1px]"
              :class="isActive(item.to) ? 'bg-[var(--c-accent)] text-[var(--c-accent-contrast)] shadow-[var(--shadow-soft)]' : ''"
              :aria-current="isActive(item.to) ? 'page' : undefined"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="hidden sm:block">
            <ThemePicker />
          </div>

          <a
            href="https://github.com/KiligFei"
            target="_blank"
            rel="noreferrer"
            class="icon-link hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] text-[var(--c-text-soft)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:text-[var(--c-text)] active:translate-y-[1px] sm:flex"
            title="GitHub"
            aria-label="Visit GitHub profile"
          >
            <span class="i-ph-github-logo text-lg" />
          </a>

          <ToggleTheme />
        </div>
      </div>

      <div class="sm:hidden">
        <ThemePicker mobile class="site-header-mobile-theme" />
      </div>
    </div>
  </header>
</template>
