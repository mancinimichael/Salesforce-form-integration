<script setup lang="ts">
import FormItem from '@/components/TheFormItem.vue'
import ToastNotification from '@/components/TheToast.vue'
import {
  APPLICATION_ENDPOINT,
  CASE_ENDPOINT,
  CATEGORY_ENDPOINT,
  SECTOR_ENDPOINT,
  TIPOLOGY_ENDPOINT
} from '@/constants'
import { store } from '@/store'
import type { ApiResponse, Form, FormItems, Values } from '@/types'
import axios from 'axios'
import { computed, ref, watchEffect } from 'vue'

type TheFormProps = {
  form: Form
}

const { form } = defineProps<TheFormProps>()

const fileList = ref<FileList | null>(null)
const elements = ref<FormItems>([
  {
    id: 'subject',
    label: 'Oggetto',
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
    id: 'priority',
    label: 'Priorità',
    selector: 'option',
    options: [
      { id: 0, value: 'Low' },
      { id: 1, value: 'Medium' },
      { id: 2, value: 'High' },
      { id: 3, value: 'Critical' }
    ]
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
  }
])
const toast = ref<InstanceType<typeof ToastNotification> | null>(null)
const headers = computed(() => ({ Authorization: store.auth.bearer }))

watchEffect(async () => {
  if (!store.auth.bearer) return

  await Promise.all([
    axios.get<ApiResponse>(APPLICATION_ENDPOINT, { headers: headers.value }),
    axios.get<ApiResponse>(CATEGORY_ENDPOINT, { headers: headers.value }),
    axios.get<ApiResponse>(SECTOR_ENDPOINT, { headers: headers.value }),
    axios.get<ApiResponse>(TIPOLOGY_ENDPOINT, { headers: headers.value })
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
    .catch(console.error)
})

const handleChange = (event: Event) => {
  const { files } = event.target as HTMLInputElement
  fileList.value = files
}

const handleSubmit = async () => {
  if (!Object.values(form).every((value) => !!value)) return
  const body = {
    Application__c: elements.value
      .find((element) => element.id === 'application')
      ?.options?.find((option) => option.id === parseInt(form.application))?.value,
    Category__c: elements.value
      .find((element) => element.id === 'category')
      ?.options?.find((option) => option.id === parseInt(form.category))?.value,
    Description: form.description,
    Origin: 'Smart',
    Priority: elements.value
      .find((element) => element.id === 'priority')
      ?.options?.find((option) => option.id === parseInt(form.priority))?.value,
    Sector__c: elements.value
      .find((element) => element.id === 'sector')
      ?.options?.find((option) => option.id === parseInt(form.sector))?.value,
    Subject: form.subject,
    Tipology__c: elements.value
      .find((element) => element.id === 'tipology')
      ?.options?.find((option) => option.id === parseInt(form.tipology))?.value,
    // Values obtained from OAuth2
    Contact_Key__c: store.auth.user.id
    // SuppliedEmail: store.auth.user.email,
    // SuppliedName: store.auth.user.contact,
    // SuppliedPhone: store.auth.user.phone,
    // Web_Team__c: store.auth.user.team,
    // Web_Site__c: store.auth.user.site
  }

  const id = await axios
    .post<{ id: string }>(CASE_ENDPOINT, body, { headers: headers.value })
    .then((res) => {
      if (res.status === 201) {
        toast.value?.show()
      }

      return res.data.id
    })
    .catch(console.error)

  // if (fileList.value?.length === 0) return

  // const reader = new FileReader()
  // reader.readAsDataURL(fileList.value?.item(0) as Blob)
  // reader.onload = async () => {
  //   const encodedFile = (reader.result as string).split(',')[1]
  //   await axios
  //     .post(
  //       'https://covisian6.my.salesforce.com/services/data/v58.0/sobjects/Attachment',
  //       {
  //         ParentId: id,
  //         Name: fileList.value?.item(0)?.name,
  //         Body: encodedFile
  //       },
  //       { headers: headers.value }
  //     )
  //     .catch(console.error)
  // }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div v-for="element of elements.slice(2, 5)" class="col" :key="element.id">
          <FormItem :item="element" />
        </div>
      </div>

      <div class="row">
        <div v-for="element of elements.slice(5, 7)" class="col" :key="element.id">
          <FormItem :item="element" />
        </div>
      </div>

      <div class="row">
        <div v-for="element of elements.slice(0, 1)" class="col" :key="element.id">
          <FormItem :item="element" />
        </div>
      </div>

      <div class="row">
        <div v-for="element of elements.slice(1, 2)" class="col" :key="element.id">
          <FormItem :item="element" />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <input type="file" @change="handleChange($event)" />
        </div>
      </div>

      <sl-button type="submit" variant="success">Invia</sl-button>
    </form>

    <the-toast ref="toast">
      <template #title>
        <sl-icon name="check-circle-fill"></sl-icon>
        <span> Ticket creato con successo </span>
      </template>
    </the-toast>
  </div>
</template>
