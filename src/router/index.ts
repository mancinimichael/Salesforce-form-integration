import { OAUTH_CLIENT_ID, OAUTH_CODE, OAUTH_REDIRECT_URI, OAUTH_SCOPE } from '@/constants'
import { store } from '@/store'
import type { OauthApiResponse } from '@/types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import qs from 'qs'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (sessionStorage.getItem('access_token')) {
    store.form.contactId = sessionStorage.getItem('id_sparta') || ''
    store.form.contact = sessionStorage.getItem('contact') || ''
    store.form.email = sessionStorage.getItem('email') || ''
    store.form.phone = sessionStorage.getItem('phone') || ''
    store.form.site = sessionStorage.getItem('site') || ''
    store.form.team = sessionStorage.getItem('team') || ''

    next()
  } else {
    const code = to.query['code']

    if (!code) {
      const url = new URL('https://api.app.covisian.com/v1/openid/authorize')

      url.searchParams.append('response_type', OAUTH_CODE)
      url.searchParams.append('scope', OAUTH_SCOPE)
      url.searchParams.append('client_id', OAUTH_CLIENT_ID)
      url.searchParams.append('redirect_uri', OAUTH_REDIRECT_URI)

      window.location.href = url.href
    } else {
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
          sessionStorage.setItem('access_token', res.access_token)
          store.form.contactId = (
            jwtDecode(res.id_token as string) as { idSparta: string }
          ).idSparta
          sessionStorage.setItem('id_sparta', store.form.contactId)
        })
        .catch(console.error)

      await axios
        .post(
          'http://172.23.6.86/Services/WsRecoveryTK/api/TKrecovery/leads/agents/openContracts',
          {
            idSparta: [store.form.contactId]
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

          sessionStorage.setItem('contact', store.form.contact)
          sessionStorage.setItem('email', store.form.email)
          sessionStorage.setItem('phone', store.form.phone)
          sessionStorage.setItem('site', store.form.site)
          sessionStorage.setItem('team', store.form.team)
        })
        .catch(console.error)

      next({ path: '/' })
    }
  }
})

export default router
