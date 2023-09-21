import App from '@/App.vue'
import '@/assets/base.css'
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
import { setBasePath } from '@shoelace-style/shoelace'
import '@shoelace-style/shoelace/dist/themes/light.css'
import axios from 'axios'
import { createApp } from 'vue'

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

await initializeApp().then(() => {
  setBasePath('/node_modules/@shoelace-style/shoelace/cdn')

  const app = createApp(App)

  app.mount('#app')
})
