<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheTable from '@/components/TheTable.vue'
</script>

<template>
  <the-header :button="'Crea ticket'" :title="'Visualizza ticket'"></the-header>
  <the-table></the-table>
</template>
