<script setup lang="ts">
import { formatDateShort } from '~/utils/dates'

const { data, pending, error, refresh } = useAsyncData('posts-list', () => queryContent('posts').find())

const articles = computed(() => {
  const items = (data.value || [])
    .filter((item: any) => item._path !== '/posts')
    .sort((a: any, b: any) => +new Date(b.date || 0) - +new Date(a.date || 0))

  return items
})

const errorMessage = computed(() => error.value?.message || 'Unable to load the journal right now.')
</script>

<template>
  <div class="space-y-4">
    <template v-if="error && !articles.length">
      <div class="surface-panel rounded-[1.8rem] p-6 text-center sm:p-7">
        <p class="font-display text-2xl tracking-[-0.05em] text-[var(--c-text)]">
          The journal is taking a short breather.
        </p>
        <p class="mt-3 text-[var(--c-text-soft)]">
          {{ errorMessage }} Give it another try in a moment.
        </p>
        <button
          type="button"
          class="button-secondary mt-5"
          @click="refresh"
        >
          Try again
        </button>
      </div>
    </template>

    <template v-else-if="pending && !articles.length">
      <p class="font-mono text-xs uppercase tracking-[0.18em] text-[var(--c-text-faint)]">
        Indexing the notes...
      </p>
      <div
        v-for="index in 3"
        :key="index"
        class="surface-panel skeleton rounded-[1.8rem] p-6 sm:p-7"
      >
        <div class="h-3 w-28 rounded-full bg-[var(--c-border)]" />
        <div class="mt-5 h-8 w-3/5 rounded-full bg-[var(--c-border)]" />
        <div class="mt-4 h-3 w-full rounded-full bg-[var(--c-border)]" />
        <div class="mt-3 h-3 w-4/5 rounded-full bg-[var(--c-border)]" />
      </div>
    </template>

    <template v-else-if="articles.length">
      <div
        v-if="error"
        class="surface-panel rounded-[1.8rem] border border-[var(--c-border-strong)] p-5 text-sm text-[var(--c-text-soft)]"
      >
        <span>Some entries did not refresh in time.</span>
        <button
          type="button"
          class="ml-3 inline-flex items-center gap-2 text-[var(--c-text)] transition hover:text-[var(--c-accent)]"
          @click="refresh"
        >
          <span>Retry</span>
          <span class="i-ph-arrow-clockwise text-base" />
        </button>
      </div>

      <article
        v-for="(item, index) in articles"
        :key="item._path"
        class="group"
      >
        <NuxtLink
          :to="item._path"
          class="article-link surface-panel block rounded-[1.8rem] p-6 transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[var(--c-border-strong)] hover:bg-[var(--c-surface-strong)] active:translate-y-[1px] sm:p-7"
        >
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-3xl space-y-4">
              <div class="flex flex-wrap items-center gap-3">
                <p class="eyebrow">{{ formatDateShort(item.date) }}</p>
                <span class="inline-flex items-center rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--c-text-faint)]">
                  article {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>

              <div class="space-y-2">
                <h2 class="font-display text-2xl leading-[1.02] tracking-[-0.06em] text-[var(--c-text)] text-balance sm:text-3xl">
                  {{ item.title || 'Untitled note' }}
                </h2>
                <p class="max-w-[62ch] text-base leading-7 text-[var(--c-text-soft)]">
                  {{ item.description || 'A note from the journal.' }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-sm text-[var(--c-text-faint)] transition duration-300 group-hover:text-[var(--c-text)]">
              <span>Open note</span>
              <span class="arrow-icon arrow-up-right i-ph-arrow-up-right text-base" />
            </div>
          </div>
        </NuxtLink>
      </article>
    </template>

    <div
      v-else
      class="surface-panel rounded-[1.8rem] p-8 text-center"
    >
      <p class="font-display text-2xl tracking-[-0.05em] text-[var(--c-text)]">
        No notes yet.
      </p>
      <p class="mt-3 text-[var(--c-text-soft)]">
        The next entry is still in draft. Check back soon.
      </p>
    </div>
  </div>
</template>
