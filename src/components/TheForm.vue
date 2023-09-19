<script setup lang="ts">
import FormItem from '@/components/FormItem.vue'
import { API_ENDPOINT, BEARER } from '@/constants'
import type { Form, FormItems } from '@/types'
import { onMounted, ref } from 'vue'

type SalesforceFormProps = { form: Form }

const { form } = defineProps<SalesforceFormProps>()

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
    id: 'sparta',
    label: 'ID Sparta',
    selector: 'input',
    type: 'text'
  },
  {
    id: 'description',
    label: 'Descrizione',
    selector: 'textarea'
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
  const CATEGORY_ENDPOINT = `${API_ENDPOINT}/Category__c`
  const SECTOR_ENDPOINT = `${API_ENDPOINT}/Sector__c`
  const TIPOLOGY_ENDPOINT = `${API_ENDPOINT}/Tipology__c`

  const headers = {
    Authorization: `Bearer ${BEARER}`
  }

  const categoryRequest = fetch(CATEGORY_ENDPOINT, { headers })
  const sectorRequest = fetch(SECTOR_ENDPOINT, { headers })
  const tipologyRequest = fetch(TIPOLOGY_ENDPOINT, { headers })

  const res = await Promise.all([categoryRequest, sectorRequest, tipologyRequest])
  const data = await Promise.all<{ values: Array<{ value: string; validFor: Array<number> }> }>(
    res.map((r) => r.json())
  )

  const [category, sector, tipology] = data

  category.values.forEach((value, index) => {
    elements.value
      .find((element) => element.id === 'category')
      ?.options?.push({ id: index, value: value.value, sectorId: `${value.validFor[0]}` })
  })

  sector.values.forEach((value, index) => {
    elements.value
      .find((element) => element.id === 'sector')
      ?.options?.push({ id: index, value: value.value })
  })

  tipology.values.forEach((value, index) => {
    elements.value
      .find((element) => element.id === 'tipology')
      ?.options?.push({ id: index, value: value.value, sectorId: `${value.validFor[0]}` })
  })
})

const handleSubmit = () => {
  console.log(form)
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
        <div v-for="element of elements.slice(6, 8)" class="col" :key="element.id">
          <FormItem :disabled="true" :item="element" />
        </div>
      </div>

      <div class="row">
        <div v-for="element of elements.slice(8, 10)" class="col" :key="element.id">
          <FormItem :disabled="true" :item="element" />
        </div>
      </div>

      <sl-button type="submit" variant="success">Invia</sl-button>
    </form>
  </div>
</template>

<style scoped>
sl-button {
  width: 100%;
}
.container {
  margin: 0 auto;
  max-width: 50rem;
}

.container .row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.container .row .col {
  flex: 1 0 auto;
}
</style>
