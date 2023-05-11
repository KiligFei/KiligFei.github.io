<script setup lang="ts">
import 'assets/main.css'
import 'uno.css'
import '@unocss/reset/tailwind.css'
</script>

<template>
  <div class="font-sans text-gray-700 dark:text-gray-200 relative">
    <NavBar />
    <main class="px-7 py-10 of-x-hidden">
      <NuxtPage />
      <Footer />
    </main>
  </div>
</template>

