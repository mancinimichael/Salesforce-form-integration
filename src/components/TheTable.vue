<script setup lang="ts">
import { store } from '@/store'
import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'

const LIMIT = 10

const count = ref<number>(0)
const offset = ref<number>(0)
const pages = computed(() => Math.floor(count.value / LIMIT) + 1)

watch(offset, async () => {
  const headers = {
    Authorization: `${store.auth.bearer}`
  }

  await axios
    .get('https://covisian6.my.salesforce.com/services/data/v58.0/query/', {
      headers,
      params: {
        q: query.value.trim()
      }
    })
    .then<QueryResponse>((res) => res.data)
    .then((res) => (tickets.value = res.records))
    .catch(console.error)
})

type QueryResponse = {
  records: Response[]
}

type Response = {
  Id: string
  Name: string
  Contact_Key__c: string
  Subject__c: string
  Date_Time_Opened__c: string
  Status__c: string
  Sector__c: string
  expr0?: number
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

const countQuery = `
  SELECT COUNT(Id)
  FROM CaseInternal__c
  WHERE Contact_Key__c = '${store.auth.user.id}'
`

const query = computed(
  () => `
  SELECT ${fields.join(', ')}
  FROM CaseInternal__c
  WHERE Contact_Key__c = '${store.auth.user.id}'
  LIMIT ${LIMIT}
  OFFSET ${offset.value}
`
)

const tickets = ref<Response[]>([])

onMounted(async () => {
  const headers = {
    Authorization: `${store.auth.bearer}`
  }

  await axios
    .get('https://covisian6.my.salesforce.com/services/data/v58.0/query/', {
      headers,
      params: {
        q: countQuery.trim()
      }
    })
    .then<QueryResponse>((res) => res.data)
    .then((res) => (count.value = res.records[0].expr0 as number))
    .catch(console.error)

  await axios
    .get('https://covisian6.my.salesforce.com/services/data/v58.0/query/', {
      headers,
      params: {
        q: query.value.trim()
      }
    })
    .then<QueryResponse>((res) => res.data)
    .then((res) => (tickets.value = res.records))
    .catch(console.error)
})
</script>

<template>
  <div class="container">
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
          <td>{{ ticket.Subject__c }}</td>
          <td>{{ new Date(ticket.Date_Time_Opened__c).toDateString() }}</td>
          <td>{{ ticket.Status__c }}</td>
          <td>{{ ticket.Sector__c }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-btn">
      <sl-button-group>
        <sl-button
          v-for="page of pages"
          variant="primary"
          :key="page"
          @click="offset = (page - 1) * LIMIT"
        >
          {{ page }}
        </sl-button>
      </sl-button-group>
    </div>
  </div>
</template>

<style scoped>
table {
  border: 4px solid var(--sl-color-neutral-700);
  border-top: 0;
  border-collapse: collapse;
  margin: 0 auto;
  scroll-behavior: smooth;
  width: 100%;
}

table thead {
  background-color: var(--sl-color-neutral-700);
  color: var(--sl-color-neutral-0);
  position: sticky;
  top: 0;
}

table tr {
  text-align: left;
}

table td:nth-child(odd) {
  background-color: var(--sl-color-neutral-100);
}

table td:nth-child(even) {
  background-color: var(--sl-color-neutral-200);
}

table td,
table th {
  padding: 16px;
  width: fit-content;
}

.pagination-btn {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: var(--sl-spacing-medium);
}
</style>
