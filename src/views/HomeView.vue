<script setup lang="ts">
import TheForm from '@/components/TheForm.vue'
import { store } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="title-header">
    <h1>Crea ticket</h1>
    <span class="sparta-id">Sparta ID: {{ store.user.id }}</span>
  </div>

  <button @click="router.push('tickets')">Visualizza ticket</button>

  <the-form :form="store.form" />
</template>
