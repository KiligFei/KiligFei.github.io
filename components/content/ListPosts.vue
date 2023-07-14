<script setup lang="ts">
const articles: any = ref([])
async function getData() {
  articles.value = await queryContent('posts').find()
  articles.value.shift()
}
getData()
const router = useRouter()
function gotoBlog(blog: { _path: string }) {
  router.push(blog._path)
}
</script>

<template>
  <div v-for="item in articles" :key="item.title" cursor-pointer @click="gotoBlog(item)">
    {{ item.title }}
  </div>
</template>
