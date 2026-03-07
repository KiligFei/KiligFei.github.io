<script setup lang="ts">
const { data } = useAsyncData('home-latest-post', () => queryContent('posts').find())

const latestPost = computed(() => {
  const items = (data.value || [])
    .filter((item: any) => item._path !== '/posts')
    .sort((a: any, b: any) => +new Date(b.date || 0) - +new Date(a.date || 0))

  return items[0]
})

const principles = [
  {
    title: 'Interfaces should feel quiet before they feel clever.',
    body: 'I like layouts that leave room to think, then use motion and detail only where they sharpen the interaction.',
  },
  {
    title: 'Frontend work is visual engineering, not decoration.',
    body: 'Spacing, states, contrast, and timing carry as much weight as logic. They need the same discipline as code.',
  },
  {
    title: 'Notes are where unfinished ideas become useful.',
    body: 'The journal is a place to keep small findings, practical CSS experiments, and patterns worth reusing later.',
  },
]

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
  <section class="slide-enter-content pt-8 sm:pt-12">
    <div class="grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-end">
      <div class="space-y-8">
        <div class="inline-flex items-center gap-3 rounded-full border border-[var(--c-border)] bg-[var(--c-surface-strong)] px-4 py-2 text-sm text-[var(--c-text-soft)] shadow-[var(--shadow-soft)]">
          <span class="h-2.5 w-2.5 rounded-full bg-[var(--c-accent)]" />
          <span>Based in Xi'an, China</span>
        </div>

        <div class="space-y-5">
          <h1 class="max-w-5xl font-display text-5xl leading-[0.92] tracking-[-0.08em] text-[var(--c-text)] text-balance sm:text-6xl lg:text-[5.5rem]">
            Building calm interfaces with a sharper edge.
          </h1>
          <p class="max-w-[64ch] text-lg leading-8 text-[var(--c-text-soft)]">
            I am Kilig Fei. This site holds the projects, frontend notes, and small experiments I keep returning to while figuring out how good interfaces should look and move.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <NuxtLink to="/posts" class="button-primary">
            <span>Read the journal</span>
            <span class="i-ph-arrow-right text-base" />
          </NuxtLink>
          <a
            href="https://github.com/KiligFei"
            target="_blank"
            rel="noreferrer"
            class="button-secondary"
          >
            <span>View GitHub</span>
            <span class="i-ph-arrow-up-right text-base" />
          </a>
        </div>

        <div class="grid gap-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.85fr)]">
          <div class="surface-panel rounded-[2rem] p-6 sm:p-7">
            <p class="eyebrow">Current direction</p>
            <p class="mt-4 max-w-[26rem] text-xl leading-8 text-[var(--c-text)]">
              Turning visual systems, motion, and content structure into pages that feel deliberate instead of assembled.
            </p>
          </div>

          <div class="surface-panel surface-panel-muted rounded-[2rem] p-6 sm:p-7">
            <p class="eyebrow">Influence</p>
            <p class="mt-4 text-base leading-7 text-[var(--c-text-soft)]">
              Anthony Fu's energy around craft and tools pushed me to treat frontend work as something to study deeply, not just ship quickly.
            </p>
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <article class="surface-panel rounded-[2rem] p-6 md:col-span-2 sm:p-7">
          <div class="flex items-center justify-between gap-4">
            <p class="eyebrow">Practice</p>
            <span class="inline-flex items-center rounded-full border border-[var(--c-border)] bg-[var(--c-surface-muted)] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--c-text-faint)]">
              frontend craft
            </span>
          </div>
          <p class="mt-5 max-w-[28rem] font-display text-3xl leading-[1] tracking-[-0.06em] text-[var(--c-text)]">
            Small details first. Big visual decisions second.
          </p>
          <div class="mt-6 grid gap-4 border-t border-[var(--c-border)] pt-5 sm:grid-cols-3">
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">01</p>
              <p class="mt-2 text-sm leading-6 text-[var(--c-text-soft)]">Clear spacing rhythm and tighter typography.</p>
            </div>
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">02</p>
              <p class="mt-2 text-sm leading-6 text-[var(--c-text-soft)]">Motion that supports hierarchy instead of distracting from it.</p>
            </div>
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">03</p>
              <p class="mt-2 text-sm leading-6 text-[var(--c-text-soft)]">Content blocks shaped to feel like a system, not a stack.</p>
            </div>
          </div>
        </article>

        <article class="surface-panel surface-panel-muted rounded-[2rem] p-6 sm:p-7">
          <p class="eyebrow">Toolkit</p>
          <p class="mt-4 text-lg leading-8 text-[var(--c-text)]">
            Nuxt, Vue, CSS, and enough restraint to stop a page before it becomes noise.
          </p>
        </article>

        <article class="surface-panel rounded-[2rem] p-6 sm:p-7">
          <p class="eyebrow">Bias</p>
          <p class="mt-4 text-lg leading-8 text-[var(--c-text)]">
            Prefer warm neutrals, decisive contrast, and layouts with tension instead of perfect symmetry.
          </p>
        </article>

        <NuxtLink
          v-if="latestPost"
          :to="latestPost._path"
          class="surface-panel article-link block rounded-[2rem] p-6 transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[var(--c-border-strong)] hover:bg-[var(--c-surface-strong)] active:translate-y-[1px] md:col-span-2 sm:p-7"
        >
          <div class="flex items-center justify-between gap-4">
            <p class="eyebrow">Latest note</p>
            <span class="inline-flex items-center gap-2 text-sm text-[var(--c-text-faint)]">
              <span>{{ formatDate(latestPost.date) }}</span>
              <span class="i-ph-arrow-up-right text-base" />
            </span>
          </div>
          <h2 class="mt-5 font-display text-3xl leading-[1.02] tracking-[-0.06em] text-[var(--c-text)] text-balance">
            {{ latestPost.title }}
          </h2>
          <p class="mt-3 max-w-[48ch] text-base leading-7 text-[var(--c-text-soft)]">
            {{ latestPost.description || 'A note from the journal.' }}
          </p>
        </NuxtLink>
      </div>
    </div>

    <section class="mt-20 grid gap-8 border-t border-[var(--c-border)] pt-8 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,1fr)]">
      <div class="space-y-3">
        <p class="eyebrow">Working principles</p>
        <h2 class="max-w-sm font-display text-4xl leading-[0.98] tracking-[-0.06em] text-[var(--c-text)] text-balance">
          The site stays personal, but the craft stays strict.
        </h2>
      </div>

      <div class="space-y-5">
        <article
          v-for="item in principles"
          :key="item.title"
          class="surface-panel rounded-[1.8rem] p-6 sm:p-7"
        >
          <h3 class="max-w-[46rem] font-display text-2xl leading-[1.04] tracking-[-0.05em] text-[var(--c-text)] text-balance">
            {{ item.title }}
          </h3>
          <p class="mt-3 max-w-[60ch] text-base leading-7 text-[var(--c-text-soft)]">
            {{ item.body }}
          </p>
        </article>
      </div>
    </section>
  </section>
</template>
