<script setup lang="ts">
async function getData() {
  const articles = await queryContent('posts').find()
  console.log('🚀 ~ file: ListPosts.vue:6 ~ articles:', articles)
}
getData()
</script>

<template>
  <div>
    hjfahjh
  </div>
</template>

<style scoped lang="less">
</style>
