<script setup lang='ts'>
import { toggleDark } from '~/logics'
</script>

<template>
  <a select-none title="Toggle Color Scheme" @click="toggleDark">
    <div class="i-ri-sun-line"></div>
  </a>
</template>
