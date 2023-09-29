<script setup lang="ts">
import { CASE_INTERNAL_ENDPOINT } from '@/constants'
import { store } from '@/store'
import axios from 'axios'
import { onMounted, ref } from 'vue'

type TicketDetailsProps = { ticket: string }

type Case = {
  Name: string
  Origin__c: string
  Application__c: string
  Sector__c: string
  Type__c: string
  Category__c: string
  Reason__c: string
}

type General = {
  Subject__c: string
  Note__c: string
  Date_Time_Opened__c: string
  Date_Time_Closed__c: string
  Contact__c: string
  Contact_Key__c: string
  CaseInternalLook__c: string
  Contact_Email__c: string
  Contact_Phone__c: string
  SuppliedName__c: string
  SuppliedPhone__c: string
  WebEmail__c: string
  Web_Site__c: string
  Web_Team__c: string
}

type Status = {
  Status__c: string
  Comments__c: string
}

type Details = {
  general: General
  case: Case
  status: Status
}

const { ticket: id } = defineProps<TicketDetailsProps>()
const details = ref<any>()

onMounted(async () => {
  const headers = { Authorization: store.auth.bearer }

  await axios
    .get(`${CASE_INTERNAL_ENDPOINT}/${id}`, { headers })
    .then((res) => res.data)
    .then((res) => (details.value = res))
    .catch(console.error)
})
</script>

<template>
  <div class="container">
    <section class="general">
      <h1>Informazioni generali</h1>
      <sl-input v-for="(detail, index) of details" disabled :key="index" :value="detail"></sl-input>
    </section>

    <!-- <section class="case">
      <h1>Informazioni ticket</h1>
    </section>

    <section class="status">
      <h1>Status ticket</h1>
    </section> -->
  </div>
</template>

<style scoped></style>
