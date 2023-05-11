<script setup lang="ts">
import { useContent, useContentHead, useRequestEvent } from '#imports'

const { page, layout } = useContent()
const title = page.value.title

// Page not found, set correct status code on SSR
if (!(page as any).value && process.server) {
  const event = useRequestEvent()
  event.res.statusCode = 404
}

useContentHead(page)
</script>

<template>
  <div class="prose m-auto slide-enter-content">
    <h1 class="mb-0 slide-enter" v-if="title">
      {{ title }}
    </h1>
    <NuxtLayout :name="layout as string || 'default'">
      <ContentRenderer v-if="page" :key="(page as any)._id" :value="page">
        <template #empty="{ value }">
          <DocumentDrivenEmpty :value="value" />
        </template>
      </ContentRenderer>
      <DocumentDrivenNotFound v-else />
    </NuxtLayout>
  </div>
</template>


