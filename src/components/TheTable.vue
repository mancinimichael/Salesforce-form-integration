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

const fields = [
  {
    property: 'Id',
    name: 'Id'
  },
  {
    property: 'Name',
    name: 'Ticket'
  },
  // {
  //   property: 'Contact_Key__c',
  //   name: 'ID Sparta'
  // },
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
  SELECT ${fields.map((field) => field.property).join(', ')}
  FROM CaseInternal__c
  WHERE Contact_Key__c = '${store.auth.user.id}'
  LIMIT ${LIMIT}
  OFFSET ${offset.value}
`
)

const tickets = ref<Response[]>([])

const fileList = ref<FileList | null>(null)

const router = useRouter()

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

const handleChange = (event: Event) => {
  const { files } = event.target as HTMLInputElement
  fileList.value = files
}

const handleSubmit = async (id: string) => {
  if (fileList.value?.length === 0) return

  const headers = {
    Authorization: `${store.auth.bearer}`
  }

  const reader = new FileReader()
  reader.readAsDataURL(fileList.value?.item(0) as Blob)
  reader.onload = async () => {
    const encodedFile = (reader.result as string).split(',')[1]
    await axios
      .post(
        'https://covisian6.my.salesforce.com/services/data/v58.0/sobjects/Attachment',
        {
          ParentId: id,
          Name: fileList.value?.item(0)?.name,
          Body: encodedFile
        },
        { headers: headers }
      )
      .catch(console.error)
  }
}
</script>

<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th v-for="(field, index) of fields.map((field) => field.name)" :key="index">
            {{ field }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, index) of tickets" :key="index">
          <td>{{ ticket.Id }}</td>
          <td>{{ ticket.Name }}</td>
          <!-- <td>{{ ticket.Contact_Key__c }}</td> -->
          <td>{{ ticket.Subject__c }}</td>
          <td>{{ new Date(ticket.Date_Time_Opened__c).toDateString() }}</td>
          <td>{{ ticket.Status__c }}</td>
          <td>{{ ticket.Sector__c }}</td>
          <td>
            <sl-icon
              name="info-circle"
              @click="router.push({ name: 'ticket', params: { id: ticket.Id } })"
            ></sl-icon>
          </td>
          <td>
            <div :style="{ display: 'flex', alignItems: 'center', gap: '0.5rem' }">
              <label for="file">Upload</label>
              <input
                id="file"
                type="file"
                :style="{ display: 'none' }"
                @change="handleChange($event)"
              />
              <sl-button size="small" type="submit" variant="primary" @click="handleSubmit(ticket.Id)">Allega</sl-button>
            </div>
          </td>
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
  background-color: var(--sl-color-neutral-0);
  border-collapse: collapse;
  text-align: left;
  width: 100%;
}

table thead {
  background-color: var(--sl-color-neutral-300);
}

table td,
table th {
  border: 1px solid var(--sl-color-neutral-1000);
  padding: var(--sl-spacing-medium);
}

table td:last-child {
  padding: 8px;
  text-align: center;
}

sl-icon:hover {
  cursor: pointer;
}

/* table {
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
} */

.pagination-btn {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: var(--sl-spacing-medium);
}
</style>
