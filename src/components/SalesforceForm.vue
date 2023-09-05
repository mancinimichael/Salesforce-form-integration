<script setup lang="ts">
import SalesforceFormElement from '@/components/SalesforceFormElement.vue'
import type { Form, FormElements, FormKey } from '@/types/form'
import { computed, ref } from 'vue'

const elements: FormElements = [
  {
    id: 'contact',
    label: 'Contact Name',
    selector: 'input',
    type: 'text'
  },
  {
    id: 'email',
    label: 'Email',
    selector: 'input',
    type: 'email'
  },
  {
    id: 'phone',
    label: 'Phone',
    selector: 'input',
    type: 'text'
  },
  {
    id: 'subject',
    label: 'Subject',
    selector: 'input',
    type: 'text'
  },
  {
    id: 'description',
    label: 'Description',
    selector: 'textarea'
  },
  {
    id: 'sector',
    label: 'Sector',
    selector: 'select',
    data: [
      { index: 0, value: 'Application' },
      { index: 1, value: 'Help Desk' },
      { index: 2, value: 'Human Resource' },
      { index: 3, value: 'Networking' },
      { index: 4, value: 'Security' }
    ]
  },
  {
    id: 'category',
    label: 'Category',
    selector: 'select',
    data: [
      { index: 0, value: 'Application - Abilitazione utente', sector: 'Application' },
      { index: 1, value: 'Application - Errore applicativo', sector: 'Application' },
      { index: 2, value: 'Application - Import', sector: 'Application' },
      { index: 3, value: 'Application - Export', sector: 'Application' },
      { index: 4, value: 'Application - Modifica portale', sector: 'Application' },
      { index: 5, value: 'Application - Nuova campagna', sector: 'Application' },
      { index: 6, value: 'Application - Nuova campagna', sector: 'Application' },
      { index: 7, value: 'Help Desk - Nuove utente', sector: 'Help Desk' },
      { index: 8, value: 'Help Desk - Postazione', sector: 'Help Desk' },
      { index: 9, value: 'Help Desk - Verifica applicativo', sector: 'Help Desk' },
      { index: 10, value: 'Human Resource - Disattivazione utente', sector: 'Human Resource' },
      { index: 11, value: 'Human Resource - Estrazione ore', sector: 'Human Resource' },
      { index: 12, value: 'Networking - Connettività', sector: 'Networking' },
      { index: 13, value: 'Networking - Verifica server', sector: 'Networking' },
      { index: 14, value: 'Security - Audit client', sector: 'Security' }
    ]
  },
  {
    id: 'priority',
    label: 'Priority',
    selector: 'select',
    data: [
      { index: 0, value: 'Low' },
      { index: 1, value: 'Medium' },
      { index: 2, value: 'High' },
      { index: 3, value: 'Critical' }
    ]
  }
]

const form = ref<Form>({
  contact: '',
  email: '',
  phone: '',
  subject: '',
  description: '',
  sector: '',
  category: '',
  priority: ''
})

const handleChange = (value: string, key: string) => (form.value[key as FormKey] = value)

const handleClick = () => {
  // TODO: POST request with form value to salesforce API endpoint.
  console.log(form.value)
}
</script>

<template>
  <SalesforceFormElement
    v-for="element of elements"
    :sector="form.sector"
    :element="element"
    :key="element.id"
    :model="form[element.id as FormKey]"
    @change="handleChange($event, element.id)"
  />
  <button type="submit" @click="handleClick">Invia</button>
</template>

<style scoped lang="scss"></style>
