<script setup lang="ts">
import TheTable from '@/components/TheTable.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="title-header">
    <h1>I tuoi ticket</h1>
    <sl-button variant="success" @click="router.push('home')">Crea ticket</sl-button>
  </div>

  <the-table></the-table>
</template>
