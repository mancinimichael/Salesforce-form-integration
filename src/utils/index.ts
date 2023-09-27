import {
  SALESFORCE_CLIENT_ID,
  SALESFORCE_CLIENT_SECRET,
  SALESFORCE_GRANT_TYPE,
  SALESFORCE_OAUTH_ENDPOINT,
  SALESFORCE_PASSWORD,
  SALESFORCE_USERNAME
} from '@/constants'
import { store } from '@/store'
import type { OAuthResponse } from '@/types'
import axios from 'axios'

export const initApp = async () => {
  const formData = new FormData()

  formData.append('grant_type', SALESFORCE_GRANT_TYPE)
  formData.append('client_id', SALESFORCE_CLIENT_ID)
  formData.append('client_secret', SALESFORCE_CLIENT_SECRET)
  formData.append('username', SALESFORCE_USERNAME)
  formData.append('password', SALESFORCE_PASSWORD)

  await axios
    .post<OAuthResponse>(SALESFORCE_OAUTH_ENDPOINT, formData)
    .then((res) => res.data)
    .then((res) => {
      store.auth.bearer = `${res.token_type} ${res.access_token}`
    })
    .catch(console.error)
}

export const initSmart = async (event: any) => {
  const user = await event.detail.getSpartaUser()

  if (!user) return

  store.auth.user.id = user.id

  // const body = {
  //   idSparta: [store.auth.user.id]
  // }

  // await axios
  //   .post(SPARTA_ENDPOINT, body)
  //   .then((res) => res.data)
  //   .then(console.log)
  //   .catch(console.error)
}
