<script setup lang="ts">
import SalesforceForm from '@/components/TheForm.vue'
import { store } from '@/store'
</script>

<template>
  <main>
    <SalesforceForm :form="store.form" />
  </main>
</template>

<style scoped>
main {
  height: 100%;
  padding: 1.5rem 5rem;
}
</style>
