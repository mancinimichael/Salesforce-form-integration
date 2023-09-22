<script setup lang="ts">
import axios from 'axios'
import {
  GRANT_TYPE,
  CLIENT_ID,
  CLIENT_SECRET,
  USERNAME,
  PASSWORD,
  OAUTH_ENDPOINT
} from '@/constants'
import { store } from '@/store'
import type { OauthApiResponse } from '@/types'
import { onMounted } from 'vue'

const initializeApp = async () => {
  const formData = new FormData()

  formData.append('grant_type', GRANT_TYPE)
  formData.append('client_id', CLIENT_ID)
  formData.append('client_secret', CLIENT_SECRET)
  formData.append('username', USERNAME)
  formData.append('password', PASSWORD)

  await axios
    .post<OauthApiResponse>(OAUTH_ENDPOINT, formData)
    .then((res) => res.data)
    .then((res) => (store.bearer = `${res.token_type} ${res.access_token}`))
    .catch(console.error)
}

onMounted(() => {
  initializeApp()
})
</script>

<template>
  <main>
    <router-view />
  </main>
</template>
