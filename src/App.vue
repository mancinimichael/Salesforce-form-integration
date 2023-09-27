<script setup lang="ts">
import { initApp, initSmart } from '@/utils'
import { onMounted } from 'vue'
import { store } from '@/store'

onMounted(() => {
  initApp()
})
</script>

<template>
  <template v-if="!!store.auth.user.id">
    <main>
      <router-view></router-view>
    </main>
  </template>

  <smart-bus @ready="initSmart"></smart-bus>
</template>
