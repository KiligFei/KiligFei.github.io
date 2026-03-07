<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-20 border-t border-[var(--c-border)] pt-8 text-sm text-[var(--c-text-soft)]">
    <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div class="space-y-2">
        <p class="eyebrow">kilig fei</p>
        <p class="max-w-[36rem] leading-7">
          Personal space for frontend notes, interface studies, and small experiments built from Xi'an.
        </p>
      </div>

      <div class="flex flex-col gap-2 md:items-end">
        <div class="flex flex-wrap items-center gap-4">
          <NuxtLink class="transition hover:text-[var(--c-text)]" to="/">
            Home
          </NuxtLink>
          <NuxtLink class="transition hover:text-[var(--c-text)]" to="/posts">
            Journal
          </NuxtLink>
          <a
            class="transition hover:text-[var(--c-text)]"
            href="https://github.com/KiligFei"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <p>2021-{{ year }} © Kilig Fei</p>
      </div>
    </div>
  </footer>
</template>
