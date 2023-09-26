<script setup lang="ts">
import { initApp, initSmart } from '@/utils'
import { onMounted } from 'vue'

onMounted(() => {
  initApp()
})
</script>

<template>
  <main>
    <router-view></router-view>
  </main>

  <smart-bus @ready="initSmart"></smart-bus>
</template>
