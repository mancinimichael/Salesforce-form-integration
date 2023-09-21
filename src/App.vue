<script setup lang="ts">
import TheForm from '@/components/TheForm.vue'
import { store } from '@/store'
</script>

<template>
  <main>
    <TheForm :form="store.form" />
  </main>
</template>

<style scoped>
main {
  height: 100%;
  padding: 1.5rem 5rem;
}
</style>
