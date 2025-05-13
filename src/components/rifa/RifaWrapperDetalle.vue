<template>
  <RifaDetallePage />
</template>

<script setup>
import { createPinia } from 'pinia'
import { onBeforeMount, getCurrentInstance } from 'vue'
import RifaDetallePage from './RifaDetallePage.vue'

onBeforeMount(() => {
  const app = getCurrentInstance().appContext.app
  if (!app._context.provides.pinia) {
    const pinia = createPinia()
    app.use(pinia)
  }
})
</script>
