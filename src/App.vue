<script setup lang="ts">
import { store } from '@/store'
import { initApp, initSmart } from '@/utils'
import { onMounted } from 'vue'

onMounted(() => initApp())
</script>

<template>
  <template v-if="store.auth.user.id && store.auth.headers.Authorization">
    <main>
      <router-view></router-view>
    </main>
  </template>

  <smart-bus @ready="initSmart"></smart-bus>
</template>
