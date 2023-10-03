<script setup lang="ts">
import { store } from '@/store'
import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const LIMIT = 10

const count = ref<number>(0)
const offset = ref<number>(0)
const pages = computed(() => Math.floor(count.value / LIMIT) + 1)

watch(offset, async () => {
  await axios
    .get('https://covisian6.my.salesforce.com/services/data/v58.0/query/', {
      headers: store.auth.headers,
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

const fields = [
  {
    property: 'Name',
    name: 'Ticket'
  },
  {
    property: 'Subject__c',
    name: 'Oggetto'
  },
  {
    property: 'Date_Time_Opened__c',
    name: 'Data creazione'
  },
  {
    property: 'Status__c',
    name: 'Stato'
  },
  {
    property: 'Sector__c',
    name: 'Sezione'
  }
]

const countQuery = `
  SELECT COUNT(Id)
  FROM CaseInternal__c
  WHERE Contact_Key__c = '${store.auth.user.id}'
`

const query = computed(
  () => `
  SELECT Id, ${fields.map((field) => field.property).join(', ')}
  FROM CaseInternal__c
  WHERE Contact_Key__c = '${store.auth.user.id}'
  LIMIT ${LIMIT}
  OFFSET ${offset.value}
`
)

const tickets = ref<Response[]>([])

const router = useRouter()

onMounted(async () => {
  await axios
    .get('https://covisian6.my.salesforce.com/services/data/v58.0/query/', {
      headers: store.auth.headers,
      params: {
        q: countQuery.trim()
      }
    })
    .then<QueryResponse>((res) => res.data)
    .then((res) => (count.value = res.records[0].expr0 as number))
    .catch(console.error)

  await axios
    .get('https://covisian6.my.salesforce.com/services/data/v58.0/query/', {
      headers: store.auth.headers,
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
  <div v-if="tickets.length > 0" class="container">
    <table>
      <thead>
        <tr>
          <th v-for="(field, index) of fields.map((field) => field.name)" :key="index">
            {{ field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, index) of tickets" :key="index">
          <td>
            <span
              class="table-link"
              @click="router.push({ name: 'ticket', params: { id: ticket.Id } })"
            >
              {{ ticket.Name }}
            </span>
          </td>
          <td>{{ ticket.Subject__c }}</td>
          <td>{{ new Date(ticket.Date_Time_Opened__c).toDateString() }}</td>
          <td>{{ ticket.Status__c }}</td>
          <td>{{ ticket.Sector__c }}</td>
        </tr>
      </tbody>
    </table>

    <sl-button-group>
      <sl-button
        v-for="page of pages"
        size="small"
        variant="primary"
        :key="page"
        @click="offset = (page - 1) * LIMIT"
      >
        {{ page }}
      </sl-button>
    </sl-button-group>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  margin: 0 auto;
  margin-bottom: var(--sl-spacing-x-small);
  text-align: left;
  width: 100%;
}

table thead {
  background-color: var(--sl-color-neutral-100);
}

table tbody {
  background-color: var(--sl-color-neutral-0);
}

table thead tr,
table tbody tr {
  border-bottom: 1px solid var(--sl-color-neutral-200);
}

table thead tr th,
table tbody tr td {
  padding: var(--sl-spacing-medium);
}

table thead tr th:first-child,
table tbody tr td:first-child {
  width: 128px;
}

.table-link {
  font-weight: 700;
  text-decoration: underline;
}

.table-link:hover {
  cursor: pointer;
}
</style>
