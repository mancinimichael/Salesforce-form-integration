<script setup lang="ts">
import TheForm from '@/components/TheForm.vue'
import { store } from '@/store'
</script>

<template>
  <the-form :form="store.form" />
</template>
