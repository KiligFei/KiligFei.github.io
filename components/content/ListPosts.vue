<script setup lang="ts">
const { data, status } = useAsyncData('posts-list', () => queryContent('posts').find())

const articles = computed(() => {
  const items = (data.value || [])
    .filter((item: any) => item._path !== '/posts')
    .sort((a: any, b: any) => +new Date(b.date || 0) - +new Date(a.date || 0))

  return items
})

function formatDate(date?: string) {
  if (!date)
    return 'Undated'

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}
</script>

<template>
  <div class="space-y-4">
    <template v-if="status === 'pending' && !articles.length">
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
                <p class="eyebrow">{{ formatDate(item.date) }}</p>
                <span class="inline-flex items-center rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--c-text-faint)]">
                  article {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>

              <div class="space-y-2">
                <h2 class="font-display text-2xl leading-[1.02] tracking-[-0.06em] text-[var(--c-text)] text-balance sm:text-3xl">
                  {{ item.title }}
                </h2>
                <p class="max-w-[62ch] text-base leading-7 text-[var(--c-text-soft)]">
                  {{ item.description || 'A note from the journal.' }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-sm text-[var(--c-text-faint)] transition duration-300 group-hover:text-[var(--c-text)]">
              <span>Open note</span>
              <span class="i-ph-arrow-up-right text-base" />
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
        No notes published yet.
      </p>
      <p class="mt-3 text-[var(--c-text-soft)]">
        The journal is empty for now. New entries will appear here once they are written.
      </p>
    </div>
  </div>
</template>
