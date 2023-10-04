<script setup lang="ts">
import FormItem from '@/components/TheFormItem.vue'
import TheToast from '@/components/TheToast.vue'
import {
  APPLICATION_ENDPOINT,
  CASE_ENDPOINT,
  CATEGORY_ENDPOINT,
  FORM_ITEMS,
  SECTOR_ENDPOINT,
  TIPOLOGY_ENDPOINT
} from '@/constants'
import { store } from '@/store'
import type { ApiResponse, Form, FormItems, FormKey, Values } from '@/types'
import axios from 'axios'
import { computed, ref, watchEffect } from 'vue'

type TheFormProps = {
  form: Form
}

const { form } = defineProps<TheFormProps>()

const elements = ref<FormItems>(FORM_ITEMS)
const toast = ref<InstanceType<typeof TheToast>>()

const sortedElements = computed(() => [...elements.value].sort((x, y) => x.order - y.order))

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
    Contact_Key__c: store.auth.user.id,
    SuppliedEmail: store.auth.user.email,
    SuppliedName: store.auth.user.contact,
    SuppliedPhone: store.auth.user.phone,
    Web_Team__c: store.auth.user.team,
    Web_Site__c: store.auth.user.site
  }

  const id = await axios
    .post<{ id: string }>(CASE_ENDPOINT, body, { headers: store.auth.headers })
    .then((res) => {
      if (res.status === 201) {
        toast.value?.show('Ticket creato con successo', 'success')
      }

      return res.data.id
    })
    .catch(console.error)

  if (!id) return

  Object.keys(form).forEach((key) => store.updateForm(key as FormKey, ''))
}

watchEffect(async () => {
  if (!store.auth.headers.Authorization) return

  await Promise.all([
    axios.get<ApiResponse>(APPLICATION_ENDPOINT, { headers: store.auth.headers }),
    axios.get<ApiResponse>(CATEGORY_ENDPOINT, { headers: store.auth.headers }),
    axios.get<ApiResponse>(SECTOR_ENDPOINT, { headers: store.auth.headers }),
    axios.get<ApiResponse>(TIPOLOGY_ENDPOINT, { headers: store.auth.headers })
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
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-2">
          <div v-for="element of sortedElements.slice(2, 7)" :key="element.id">
            <FormItem :item="element" />
          </div>
        </div>

        <div class="col-8">
          <div v-for="element of sortedElements.slice(0, 2)" :key="element.id">
            <FormItem :item="element" />
          </div>

          <sl-button-group>
            <sl-button
              type="submit"
              variant="success"
              :disabled="!Object.values(form).every((value) => !!value)"
            >
              Invia
            </sl-button>
            <sl-button
              type="reset"
              variant="danger"
              :disabled="Object.values(form).every((value) => !value)"
              @click="Object.keys(form).forEach((key) => store.updateForm(key as FormKey, ''))"
            >
              Reset
            </sl-button>
          </sl-button-group>
        </div>
      </div>
    </form>

    <the-toast ref="toast"></the-toast>
  </div>
</template>
