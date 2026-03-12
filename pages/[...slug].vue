<script setup lang="ts">
import { useContent, useContentHead, useRequestEvent } from '#imports'
import { formatDateLong } from '~/utils/dates'

const { page, layout } = useContent()
const title = computed(() => page.value?.title || 'Untitled note')
const description = computed(() => page.value?.description || (page.value as any)?.describe || '')
const isLandingPage = computed(() => ['/', '/posts'].includes(page.value?._path || ''))
const articleDate = computed(() => formatDateLong((page.value as any)?.date))

// Page not found, set correct status code on SSR
if (!(page as any).value && process.server) {
  const event = useRequestEvent()
  event.res.statusCode = 404
}

useContentHead(page)
</script>

<template>
  <NuxtLayout :name="layout as string || 'default'">
    <template v-if="page">
      <div v-if="isLandingPage">
        <ContentRenderer :key="(page as any)._id" :value="page">
          <template #empty="{ value }">
            <DocumentDrivenEmpty :value="value" />
          </template>
        </ContentRenderer>
      </div>

      <article v-else class="article-shell slide-enter-shift">
        <header class="article-header">
          <div class="space-y-5">
            <p class="eyebrow">journal entry</p>

            <div class="space-y-4">
              <h1 class="font-display text-4xl leading-none tracking-[-0.08em] text-[var(--c-text)] text-balance sm:text-6xl">
                {{ title }}
              </h1>
              <p v-if="description" class="max-w-[56ch] text-lg leading-8 text-[var(--c-text-soft)] text-balance">
                {{ description }}
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--c-text-faint)]">
              <span v-if="articleDate">{{ articleDate }}</span>
              <NuxtLink
                to="/posts"
                class="group inline-flex items-center gap-2 transition hover:text-[var(--c-text)]"
              >
                <span class="arrow-icon arrow-left i-ph-arrow-left text-base" />
                <span>Back to journal</span>
              </NuxtLink>
            </div>
          </div>
        </header>

        <div class="article-prose prose m-auto max-w-none">
          <ContentRenderer :key="(page as any)._id" :value="page">
            <template #empty="{ value }">
              <DocumentDrivenEmpty :value="value" />
            </template>
          </ContentRenderer>
        </div>
      </article>
    </template>

    <DocumentDrivenNotFound v-else />
  </NuxtLayout>
</template>
