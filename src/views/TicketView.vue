<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TicketDetails from '@/components/TicketDetails.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <the-header :title="`Ticket ${route.params.id}`"></the-header>
  <ticket-details :ticket-id="`${route.params.id}`"></ticket-details>
</template>
