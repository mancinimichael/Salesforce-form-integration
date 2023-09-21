<script setup lang="ts">
import TheForm from '@/components/TheForm.vue'
import { store } from '@/store'
</script>

<template>
  <main>
    <TheForm :form="store.form" />
  </main>
</template>
