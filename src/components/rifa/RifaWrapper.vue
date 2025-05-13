<template>
  <RifaPage />
</template>

<script setup>
import { createPinia } from 'pinia'
import { onBeforeMount, getCurrentInstance } from 'vue'
import RifaPage from './RifaPage.vue'

onBeforeMount(() => {
  const app = getCurrentInstance().appContext.app
  if (!app._context.provides.pinia) {
    const pinia = createPinia()
    app.use(pinia)
  }
})
</script>
