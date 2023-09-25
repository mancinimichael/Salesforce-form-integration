<script setup lang="ts">
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE,
  OAUTH_ENDPOINT,
  PASSWORD,
  USERNAME
} from '@/constants'
import { store } from '@/store'
import type { OauthApiResponse } from '@/types'
import axios from 'axios'
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

onMounted(() => initializeApp())

const setSmartService = async (event: any) => {
  const user = await event.detail.getSpartaUser()

  console.log(user)

  store.user.id = user.id

  const SPARTA_ENDPOINT =
    'http://172.23.6.86/Services/WsRecoveryTK/api/TKrecovery/leads/agents/openContracts'

  await axios
    .post(SPARTA_ENDPOINT, { idSparta: [store.user.id] })
    .then((res) => res.data)
    .then(console.log)
    .catch(console.error)
}
</script>

<template>
  <main>
    <router-view></router-view>
  </main>

  <smart-bus id="smartBus" name="smartBus" app-id="ext-app-1" @ready="setSmartService"></smart-bus>
</template>
