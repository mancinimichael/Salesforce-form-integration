<script setup lang="ts">
import { store } from '@/store'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

type QueryResponse = {
  records: Response[]
}

type Response = {
  Id: string
  Name: string
  Contact_Key__c: string
  Subject_Key__c: string
  Date_Time_Opened__c: string
  Status__c: string
  Sector__c: string
}

type Key = keyof Response

const fields = [
  'Id',
  'Name',
  'Contact_Key__c',
  'Subject__c',
  'Date_Time_Opened__c',
  'Status__c',
  'Sector__c'
]

const query = `
    SELECT ${fields.join(', ')}
    FROM CaseInternal__c
    WHERE Contact_Key__c = '${store.auth.user.id}'
`

const tickets = ref<Response[]>([])
const router = useRouter()

onMounted(async () => {
  const headers = {
    Authorization: `${store.auth.bearer}`
  }

  await axios
    .get('https://covisian6.my.salesforce.com/services/data/v58.0/query/', {
      headers,
      params: {
        q: query.trim()
      }
    })
    .then<QueryResponse>((res) => res.data)
    .then((res) => (tickets.value = res.records))
    .catch(console.error)
})
</script>

<template>
  <div class="title-header">
    <h1>I tuoi ticket</h1>
    <span class="sparta-id">Sparta ID: {{ store.auth.user.id }}</span>
  </div>

  <button @click="router.push('home')">Crea ticket</button>

  <table>
    <thead>
      <tr>
        <th v-for="(field, index) of fields" :key="index">{{ field }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(ticket, index) of tickets" :key="index">
        <td>{{ ticket.Id }}</td>
        <td>{{ ticket.Name }}</td>
        <td>{{ ticket.Contact_Key__c }}</td>
        <td>{{ ticket.Subject_Key__c }}</td>
        <td>{{ ticket.Date_Time_Opened__c }}</td>
        <td>{{ ticket.Status__c }}</td>
        <td>{{ ticket.Sector__c }}</td>
      </tr>
    </tbody>
  </table>
</template>
