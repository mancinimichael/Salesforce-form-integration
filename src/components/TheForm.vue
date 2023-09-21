<script setup lang="ts">
import FormItem from '@/components/FormItem.vue'
import {
  APPLICATION_ENDPOINT,
  CASE_ENDPOINT,
  CATEGORY_ENDPOINT,
  SECTOR_ENDPOINT,
  TIPOLOGY_ENDPOINT
} from '@/constants'
import { store } from '@/store'
import type { ApiResponse, FormItems, TheFormProps, Values } from '@/types'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const { form } = defineProps<TheFormProps>()

const elements = ref<FormItems>([
  {
    id: 'contact',
    label: 'Contatto',
    selector: 'input',
    type: 'text',
    value: 'Michael Mancini'
  },
  {
    id: 'email',
    label: 'Email',
    selector: 'input',
    type: 'email',
    value: 'michael.mancini@covisian.com'
  },
  {
    id: 'phone',
    label: 'Telefono',
    selector: 'input',
    type: 'text',
    value: '+39 345 7781791'
  },
  {
    id: 'subject',
    label: 'Oggetto',
    selector: 'input',
    type: 'text'
  },
  {
    id: 'contactId',
    label: 'ID Contatto',
    selector: 'input',
    type: 'text'
  },
  {
    id: 'description',
    label: 'Descrizione',
    selector: 'textarea'
  },
  {
    id: 'application',
    label: 'Applicazione',
    selector: 'option',
    options: []
  },
  {
    id: 'sector',
    label: 'Sezione',
    selector: 'option',
    options: []
  },
  {
    id: 'tipology',
    label: 'Tipologia',
    selector: 'option',
    options: []
  },
  {
    id: 'category',
    label: 'Categoria',
    selector: 'option',
    options: []
  },
  {
    id: 'priority',
    label: 'Priorità',
    selector: 'option',
    options: [
      { id: 0, value: 'Low' },
      { id: 1, value: 'Medium' },
      { id: 2, value: 'High' },
      { id: 3, value: 'Critical' }
    ]
  }
])

onMounted(async () => {
  const headers = {
    Authorization: `${store.bearer}`
  }

  await Promise.all([
    axios.get<ApiResponse>(APPLICATION_ENDPOINT, { headers }),
    axios.get<ApiResponse>(CATEGORY_ENDPOINT, { headers }),
    axios.get<ApiResponse>(SECTOR_ENDPOINT, { headers }),
    axios.get<ApiResponse>(TIPOLOGY_ENDPOINT, { headers })
  ])
    .then<Values[]>((res) => res.map((r) => r.data.values))
    .then(([applications, categories, sectors, tipologies]) => {
      applications.forEach((application, index) => {
        elements.value
          .find((element) => element.id === 'application')
          ?.options?.push({ id: index, value: application.value })
      })

      categories.forEach((category, index) => {
        elements.value
          .find((element) => element.id === 'category')
          ?.options?.push({ id: index, value: category.value, sectorId: `${category.validFor[0]}` })
      })

      sectors.forEach((sector, index) => {
        elements.value
          .find((element) => element.id === 'sector')
          ?.options?.push({ id: index, value: sector.value })
      })

      tipologies.forEach((tipology, index) => {
        elements.value
          .find((element) => element.id === 'tipology')
          ?.options?.push({ id: index, value: tipology.value, sectorId: `${tipology.validFor[0]}` })
      })
    })
})

const handleSubmit = async () => {
  if (!Object.values(form).every((value) => !!value)) return

  const headers = {
    Authorization: `${store.bearer}`
  }

  const body = {
    Application__c: elements.value
      .find((element) => element.id === 'application')
      ?.options?.find((option) => option.id === parseInt(form.application))?.value,
    Category__c: elements.value
      .find((element) => element.id === 'category')
      ?.options?.find((option) => option.id === parseInt(form.category))?.value,
    Contact_Key__c: form.contactId,
    Description: form.description,
    Origin: 'Smart',
    Priority: elements.value
      .find((element) => element.id === 'priority')
      ?.options?.find((option) => option.id === parseInt(form.priority))?.value,
    Sector__c: elements.value
      .find((element) => element.id === 'sector')
      ?.options?.find((option) => option.id === parseInt(form.sector))?.value,
    Subject: form.subject,
    SuppliedEmail: form.email,
    SuppliedName: form.contact,
    SuppliedPhone: form.phone,
    Tipology__c: elements.value
      .find((element) => element.id === 'tipology')
      ?.options?.find((option) => option.id === parseInt(form.tipology))?.value
  }

  await axios.post(CASE_ENDPOINT, body, { headers }).catch(console.error)
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div v-for="element of elements.slice(0, 3)" class="col" :key="element.id">
          <FormItem :disabled="true" :item="element" />
        </div>
      </div>

      <div class="row">
        <div v-for="element of elements.slice(3, 5)" class="col" :key="element.id">
          <FormItem :item="element" />
        </div>
      </div>

      <FormItem v-for="element of elements.slice(5, 6)" :item="element" :key="element.id" />

      <div class="row">
        <div v-for="element of elements.slice(6, 9)" class="col" :key="element.id">
          <FormItem :disabled="true" :item="element" />
        </div>
      </div>

      <div class="row">
        <div v-for="element of elements.slice(9, 11)" class="col" :key="element.id">
          <FormItem :disabled="true" :item="element" />
        </div>
      </div>

      <sl-button type="submit" variant="success">Invia</sl-button>
    </form>
  </div>
</template>
