<script setup lang="ts">
import TheForm from '@/components/TheForm.vue'
import { store } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="title-header">
    <h1>Crea ticket</h1>
    <sl-button variant="success" @click="router.push('tickets')">Visualizza ticket</sl-button>
  </div>

  <the-form :form="store.form" />
</template>
