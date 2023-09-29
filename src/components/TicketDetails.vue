<script setup lang="ts">
import { CASE_INTERNAL_ENDPOINT } from '@/constants'
import { store } from '@/store'
import axios from 'axios'
import { onMounted, ref } from 'vue'

type TicketDetailsProps = { ticketId: string }

type Case = {
  Name: DetailsInfo
  Origin__c: DetailsInfo
  Application__c: DetailsInfo
  Sector__c: DetailsInfo
  Type__c: DetailsInfo
  Category__c: DetailsInfo
  Reason__c: DetailsInfo
}

type General = {
  Subject__c: DetailsInfo
  Note__c: DetailsInfo
  Date_Time_Opened__c: DetailsInfo
  Date_Time_Closed__c: DetailsInfo
  Contact__c: DetailsInfo
  Contact_Key__c: DetailsInfo
  CaseInternalLook__c: DetailsInfo
  SuppliedName__c: DetailsInfo
  SuppliedPhone__c: DetailsInfo
  WebEmail__c: DetailsInfo
  Web_Site__c: DetailsInfo
  Web_Team__c: DetailsInfo
}

type Status = {
  Status__c: DetailsInfo
  Comments__c: DetailsInfo
}

type Details = {
  Subject__c: string
  Note__c: string
  Date_Time_Opened__c: string
  Date_Time_Closed__c: string
  Contact__c: string
  Contact_Key__c: string
  CaseInternalLook__c: string
  Contact_Email__c: string
  Contact_Phone__c: string
  SuppliedName__c: string
  SuppliedPhone__c: string
  WebEmail__c: string
  Web_Site__c: string
  Web_Team__c: string
  Name: string
  Origin__c: string
  Application__c: string
  Sector__c: string
  Type__c: string
  Category__c: string
  Reason__c: string
  Status__c: string
  Comments__c: string
}

type DetailsInfo = {
  label: string
  value: string
}

const { ticketId } = defineProps<TicketDetailsProps>()
const caseDetails = ref<Case>({
  Application__c: { label: '', value: '' },
  Category__c: { label: '', value: '' },
  Name: { label: '', value: '' },
  Origin__c: { label: '', value: '' },
  Reason__c: { label: '', value: '' },
  Sector__c: { label: '', value: '' },
  Type__c: { label: '', value: '' }
})
const generalDetails = ref<General>({
  CaseInternalLook__c: { label: '', value: '' },
  Contact__c: { label: '', value: '' },
  Contact_Key__c: { label: '', value: '' },
  Date_Time_Closed__c: { label: '', value: '' },
  Date_Time_Opened__c: { label: '', value: '' },
  Note__c: { label: '', value: '' },
  Subject__c: { label: '', value: '' },
  SuppliedName__c: { label: '', value: '' },
  SuppliedPhone__c: { label: '', value: '' },
  Web_Site__c: { label: '', value: '' },
  Web_Team__c: { label: '', value: '' },
  WebEmail__c: { label: '', value: '' }
})
const statusDetails = ref<Status>({
  Comments__c: { label: '', value: '' },
  Status__c: { label: '', value: '' }
})

onMounted(async () => {
  const headers = { Authorization: store.auth.bearer }

  await axios
    .get(`${CASE_INTERNAL_ENDPOINT}/${ticketId}`, { headers })
    .then<Details>((res) => res.data)
    .then((res) => {
      caseDetails.value.Application__c = { label: 'Application', value: res.Application__c }
      caseDetails.value.Category__c = { label: 'Category', value: res.Category__c }
      caseDetails.value.Name = { label: 'Case Number', value: res.Name }
      caseDetails.value.Origin__c = { label: 'Origin', value: res.Origin__c }
      caseDetails.value.Reason__c = { label: 'Reason', value: res.Reason__c }
      caseDetails.value.Sector__c = { label: 'Sector', value: res.Sector__c }
      caseDetails.value.Type__c = { label: 'Type', value: res.Type__c }

      generalDetails.value.CaseInternalLook__c = {
        label: 'Case Internal Look',
        value: res.CaseInternalLook__c
      }
      generalDetails.value.Contact__c = { label: 'Contact', value: res.Contact__c }
      generalDetails.value.Contact_Key__c = { label: 'Contact Key', value: res.Contact_Key__c }
      generalDetails.value.Date_Time_Closed__c = {
        label: 'Date / Time Closed',
        value: res.Date_Time_Closed__c
      }
      generalDetails.value.Date_Time_Opened__c = {
        label: 'Date / Time Opened',
        value: res.Date_Time_Opened__c
      }
      generalDetails.value.Note__c = { label: 'Note', value: res.Note__c }
      generalDetails.value.Subject__c = { label: 'Subject', value: res.Subject__c }
      generalDetails.value.SuppliedName__c = { label: 'Web Name', value: res.SuppliedName__c }
      generalDetails.value.SuppliedPhone__c = { label: 'Web Phone', value: res.SuppliedPhone__c }
      generalDetails.value.WebEmail__c = { label: 'Web Email', value: res.WebEmail__c }
      generalDetails.value.Web_Site__c = { label: 'Web Site', value: res.Web_Site__c }
      generalDetails.value.Web_Team__c = { label: 'Web Email', value: res.Web_Team__c }

      statusDetails.value.Comments__c = { label: 'Comments', value: res.Comments__c }
      statusDetails.value.Status__c = { label: 'Status', value: res.Status__c }
    })
    .catch(console.error)
})
</script>

<template>
  <div class="container">
    <sl-tab-group>
      <sl-tab slot="nav" panel="general">General</sl-tab>
      <sl-tab slot="nav" panel="case">Case</sl-tab>
      <sl-tab slot="nav" panel="status">Status</sl-tab>

      <sl-tab-panel name="general">
        <div class="row">
          <div class="col-5">
            <sl-input
              v-model="generalDetails.SuppliedName__c.value"
              :label="generalDetails.SuppliedName__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.WebEmail__c.value"
              :label="generalDetails.WebEmail__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.SuppliedPhone__c.value"
              :label="generalDetails.SuppliedPhone__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.Web_Site__c.value"
              :label="generalDetails.Web_Site__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.Web_Team__c.value"
              :label="generalDetails.Web_Team__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.Subject__c.value"
              :label="generalDetails.Subject__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.Note__c.value"
              :label="generalDetails.Note__c.label"
              disabled
              filled
            ></sl-input>
          </div>
          <div class="col-5">
            <sl-input
              v-model="generalDetails.Date_Time_Opened__c.value"
              :label="generalDetails.Date_Time_Opened__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.Date_Time_Closed__c.value"
              :label="generalDetails.Date_Time_Closed__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.Contact__c.value"
              :label="generalDetails.Contact__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.Contact_Key__c.value"
              :label="generalDetails.Contact_Key__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="generalDetails.CaseInternalLook__c.value"
              :label="generalDetails.CaseInternalLook__c.label"
              disabled
              filled
            ></sl-input>
          </div>
        </div>
      </sl-tab-panel>
      <sl-tab-panel name="case">
        <div class="row">
          <div class="col-5">
            <sl-input
              v-model="caseDetails.Name.value"
              :label="caseDetails.Name.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="caseDetails.Origin__c.value"
              :label="caseDetails.Origin__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="caseDetails.Application__c.value"
              :label="caseDetails.Application__c.label"
              disabled
              filled
            ></sl-input>
          </div>
          <div class="col-5">
            <sl-input
              v-model="caseDetails.Sector__c.value"
              :label="caseDetails.Sector__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="caseDetails.Type__c.value"
              :label="caseDetails.Type__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="caseDetails.Category__c.value"
              :label="caseDetails.Category__c.label"
              disabled
              filled
            ></sl-input>
            <sl-input
              v-model="caseDetails.Reason__c.value"
              :label="caseDetails.Reason__c.label"
              disabled
              filled
            ></sl-input>
          </div>
        </div>
      </sl-tab-panel>
      <sl-tab-panel name="status">
        <div class="row">
          <div class="col-5">
            <sl-input
              v-model="statusDetails.Status__c.value"
              :label="statusDetails.Status__c.label"
              disabled
              filled
            ></sl-input>
          </div>
          <div class="col-5">
            <sl-input
              v-model="statusDetails.Comments__c.value"
              :label="statusDetails.Comments__c.label"
              disabled
              filled
            ></sl-input>
          </div>
        </div>
      </sl-tab-panel>
    </sl-tab-group>
  </div>
</template>

<style scoped>
sl-input {
  margin-bottom: var(--sl-spacing-medium);
}
</style>
