<script setup lang="ts">
import TheForm from '@/components/TheForm.vue'
import TheHeader from '@/components/TheHeader.vue'
import { store } from '@/store'
</script>

<template>
  <the-header
    :button="'Visualizza ticket'"
    :navigate="'tickets'"
    :title="'Crea ticket'"
  ></the-header>
  <the-form :form="store.form" />
</template>
