import {
  SALESFORCE_CLIENT_ID,
  SALESFORCE_CLIENT_SECRET,
  SALESFORCE_GRANT_TYPE,
  SALESFORCE_OAUTH_ENDPOINT,
  SALESFORCE_PASSWORD,
  SALESFORCE_USERNAME,
  SPARTA_ENDPOINT
} from '@/constants'
import { store } from '@/store'
import type { OAuthResponse } from '@/types'
import axios from 'axios'
// @ts-ignore
import { html } from 'gridjs'

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
      store.auth.headers.Authorization = `${res.token_type} ${res.access_token}`
    })
    .catch(console.error)
}

export const initSmart = async (event: any) => {
  const user = await event.detail.getSpartaUser()

  if (!user) return

  store.auth.user.id = user.id

  await axios
    .post(SPARTA_ENDPOINT, { idSparta: [user.id] })
    .then((res) => res.data)
    .then((res) => {
      store.auth.user.contact = `${res.dipendenti[0].anagrafica.nome} ${res.dipendenti[0].anagrafica.cognome}`
      store.auth.user.email = res.dipendenti[0].anagrafica.email
      store.auth.user.function = res.dipendenti[0].sede_operativa.funzione
      store.auth.user.phone = res.dipendenti[0].anagrafica.numero_aziendale
      store.auth.user.site = res.dipendenti[0].sede_operativa.nome_sede
      store.auth.user.team = res.dipendenti[0].sede_operativa.team
    })
    .catch(console.error)
}

export const getTag = (cell: any) => {
  switch (cell) {
    case 'Preso in carico':
      return html(`<sl-tag variant="success">${cell}</sl-tag>`)
    case 'Inoltrato altra coda':
      return html(`<sl-tag variant="primary">${cell}</sl-tag>`)
    case 'Sospeso':
      return html(`<sl-tag variant="warning">${cell}</sl-tag>`)
    case 'Errato':
      return html(`<sl-tag variant="danger">${cell}</sl-tag>`)
    default:
      return html(`<sl-tag variant="neutral">${cell}</sl-tag>`)
  }
}
