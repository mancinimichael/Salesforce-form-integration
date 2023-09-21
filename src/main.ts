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
import { setBasePath } from '@shoelace-style/shoelace'
import '@shoelace-style/shoelace/dist/themes/light.css'
import axios from 'axios'
import { createApp } from 'vue'
import type { OauthApiResponse } from './types'

const initializeApp = async () => {
  await axios
    .post<OauthApiResponse>(OAUTH_ENDPOINT, {
      grant_type: GRANT_TYPE,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: USERNAME,
      password: PASSWORD
    })
    .then((res) => res.data)
    .then((res) => {
      store.bearer = `${res.tokenType} ${res.accessToken}`
    })
    .catch(console.error)

  store.bearer =
    '00D7Q00000CItjk!ARIAQF7oZVLwMRVz5UOWPEUg7kvg6Bqq7f45pzhvLreEZA6t8jIqbEGereM.wL.1tX5p5JP96.971Wjf2Wz_T4.Hc6mzP1yk'
}

await initializeApp().then(() => {
  setBasePath('/node_modules/@shoelace-style/shoelace/cdn')

  const app = createApp(App)

  app.mount('#app')
})
