<script setup lang="ts">
import '@fontsource/outfit/latin-400.css'
import '@fontsource/outfit/latin-500.css'
import '@fontsource/outfit/latin-600.css'
import '@fontsource/outfit/latin-700.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import 'assets/main.css'
import 'uno.css'
import '@unocss/reset/tailwind.css'
</script>

<template>
  <div class="app-shell relative min-h-[100dvh] font-sans text-[var(--c-text)]">
    <a href="#main-content" class="skip-link">
      Skip to content
    </a>
    <NavBar />
    <main id="main-content" class="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-6 of-x-hidden sm:px-8 sm:pt-8 lg:px-10 lg:pt-10">
      <NuxtPage />
      <Footer />
    </main>
  </div>
</template>
