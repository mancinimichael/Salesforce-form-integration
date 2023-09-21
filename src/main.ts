import App from '@/App.vue'
import '@/assets/base.css'
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE,
  OAUTH_CLIENT_ID,
  OAUTH_ENDPOINT,
  OAUTH_REDIRECT_URI,
  PASSWORD,
  USERNAME
} from '@/constants'
import { store } from '@/store'
import type { OauthApiResponse } from '@/types'
import { setBasePath } from '@shoelace-style/shoelace'
import '@shoelace-style/shoelace/dist/themes/light.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import qs from 'qs'
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

await initializeApp()
  .then(async () => {
    //#region FAKE AUTH
    const searchParams = new URL(window.location.href).searchParams

    const code = searchParams.get('code')

    if (!code) {
      const url = new URL('https://api.app.covisian.com/v1/openid/authorize')

      url.searchParams.append('response_type', 'code')
      url.searchParams.append('scope', 'openid profile email sparta')
      url.searchParams.append('client_id', OAUTH_CLIENT_ID)
      url.searchParams.append('redirect_uri', OAUTH_REDIRECT_URI)

      window.location.href = url.toString()
    } else {
      let id = ''

      await axios
        .post(
          'https://api.app.covisian.com/v1/openid/token',
          qs.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: OAUTH_REDIRECT_URI
          })
        )
        .then<OauthApiResponse>((res) => res.data)
        .then((res) => {
          id = (jwtDecode(res.id_token as string) as { idSparta: string }).idSparta
        })
        .catch(console.error)

      await axios
        .post(
          'http://172.23.6.86/Services/WsRecoveryTK/api/TKrecovery/leads/agents/openContracts',
          {
            idSparta: [id]
          }
        )
        .then<{
          dipendenti: {
            anagrafica: {
              email: string
              codice_sparta: string
              nome: string
              cognome: string
              numero_mobile: string
            }
            sede_operativa: { nome_sede: string; team: string }
          }[]
        }>((res) => res.data)
        .then<{
          anagrafica: {
            email: string
            codice_sparta: string
            nome: string
            cognome: string
            numero_mobile: string
          }
          sede_operativa: { nome_sede: string; team: string }
        }>((res) => res.dipendenti[0])
        .then((res) => {
          store.form.contact = `${res.anagrafica.nome} ${res.anagrafica.cognome}`
          store.form.email = res.anagrafica.email
          store.form.contactId = res.anagrafica.codice_sparta
          store.form.phone = res.anagrafica.numero_mobile
          store.form.site = res.sede_operativa.nome_sede
          store.form.team = res.sede_operativa.team
        })
        .catch(console.error)
    }
    //#endregion
  })
  .finally(() => {
    setBasePath('/node_modules/@shoelace-style/shoelace/cdn')

    const app = createApp(App)

    app.mount('#app')
  })
