<script setup lang="ts">
import { QUERY_ENDPOINT } from '@/constants'
import { store } from '@/store'
import type { QueryResponse } from '@/types'
import axios from 'axios'
import { html, Grid } from "gridjs"
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const fields = [
  {
    property: "Id",
    name: "Id",
    order: 0
  },
  {
    property: 'Name',
    name: 'Ticket',
    order: 1
  },
  {
    property: 'Subject__c',
    name: 'Oggetto',
    order: 2
  },
  {
    property: 'Date_Time_Opened__c',
    name: 'Data creazione',
    order: 5
  },
  {
    property: 'Status__c',
    name: 'Stato',
    order: 4
  },
  {
    property: 'Sector__c',
    name: 'Sezione',
    order: 3
  }
]

const table = ref<HTMLDivElement>()
const query = ref(`
  SELECT ${fields.sort((x, y) => x.order - y.order).map((field) => field.property).join(', ')}
  FROM CaseInternal__c
  WHERE Contact_Key__c = '${store.auth.user.id}'
  ORDER BY Date_Time_Opened__c DESC
`)

const router = useRouter()

onMounted(async () => {
  await axios
    .get<QueryResponse>(QUERY_ENDPOINT, {
      headers: store.auth.headers,
      params: {
        q: query.value.trim()
      }
    })
    .then(res => {
      new Grid({
        columns: fields.sort((x, y) => x.order - y.order).map(field => {
          if(field.property === "Name") {
            return {
              name: field.name,
              attributes: (cell: any, row: any) => {
                if(cell) {
                  return {
                    'onclick': () => router.push({name: 'ticket', params: { id: row._cells[0].data }}),
                    'style': 'cursor: pointer; text-decoration: underline'
                  }
                }
              },
              formatter: (cell: any) => html(`<b>${cell}</b>`)
            }
          }

          if(field.property === "Id") {
            return {
              name: field.name,
              hidden: true
            }
          }

          if(field.property === "Status__c") {
            return {
              name: field.name,
              formatter: (cell: any) => html(`<sl-tag variant="neutral">${cell}</sl-tag>`) 
            }
          }

          return field.name
        }),
        data: res.data.records.map(ticket => {
          delete ticket.attributes
          ticket.Date_Time_Opened__c = new Date(ticket.Date_Time_Opened__c).toLocaleString()
          return Object.values(ticket)
        }),
        pagination: {
          limit: 10
        },
        search: true,
        sort: true
    }).render(table.value)})
    .catch(console.error)
})</script>

<template>
  <div class="table-wrapper" ref="table"></div>
</template>

<style scoped>
.table-wrapper {
  padding: 0 64px;
}
</style>