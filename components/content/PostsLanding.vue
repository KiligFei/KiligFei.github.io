<script setup lang="ts">
const { data, error, refresh } = useAsyncData('posts-landing-summary', () => queryContent('posts').find())

const count = computed(() => {
  if (error.value)
    return null

  return (data.value || []).filter((item: any) => item._path !== '/posts').length
})
</script>

<template>
  <section class="slide-enter-content pt-8 sm:pt-12">
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
      <div class="space-y-5">
        <p class="eyebrow">Journal</p>
        <h1 class="max-w-4xl font-display text-5xl leading-[0.94] tracking-[-0.08em] text-[var(--c-text)] text-balance sm:text-6xl">
          Notes on frontend craft, CSS experiments, and small things worth keeping.
        </h1>
        <p class="max-w-[62ch] text-lg leading-8 text-[var(--c-text-soft)]">
          This is the working archive: patterns I want to remember, problems I had to solve, and pieces of interface work that survived the first draft.
        </p>
      </div>

      <aside class="surface-panel rounded-[2rem] p-6 sm:p-7">
        <template v-if="error">
          <p class="eyebrow">Archive</p>
          <p class="mt-4 font-display text-2xl leading-tight tracking-[-0.05em] text-[var(--c-text)]">
            Archive count is catching up.
          </p>
          <p class="mt-3 text-sm leading-6 text-[var(--c-text-soft)]">
            The summary is taking a moment to load.
          </p>
          <button
            type="button"
            class="button-secondary mt-4"
            @click="refresh"
          >
            Try again
          </button>
        </template>

        <template v-else>
          <p class="eyebrow">Archive</p>
          <p class="mt-4 font-display text-5xl leading-none tracking-[-0.08em] text-[var(--c-text)]">
            {{ count ?? '—' }}
          </p>
          <p class="mt-3 text-sm leading-6 text-[var(--c-text-soft)]">
            published {{ count === 1 ? 'note' : 'notes' }} and counting.
          </p>
        </template>
      </aside>
    </div>

    <section class="mt-12">
      <ListPosts />
    </section>
  </section>
</template>
