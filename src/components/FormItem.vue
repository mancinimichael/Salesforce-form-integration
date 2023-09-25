<script setup lang="ts">
import { store } from '@/store'
import type { FormItem, FormItemProps, Option } from '@/types'

const { item } = defineProps<FormItemProps>()

const disabled = (item: FormItem) => {
  return (
    (item.id === 'tipology' &&
      !store.form.sector &&
      !item.options?.filter((option) => option.sectorId === store.form.sector).length) ||
    (item.id === 'category' &&
      !store.form.tipology &&
      !item.options?.filter((option) => option.sectorId === store.form.tipology).length)
  )
}

const filter = (item: FormItem, option: Option) => {
  if (!['category', 'tipology'].includes(item.id)) return true

  return (
    (item.id === 'tipology' && option.sectorId === store.form.sector) ||
    (item.id === 'category' && option.sectorId === store.form.tipology)
  )
}
</script>

<template>
  <div class="wrapper">
    <sl-input
      v-if="item.selector === 'input'"
      v-model="store.form[item.id]"
      required
      :disabled="item.disabled"
      :label="item.label"
      :type="item.type"
    ></sl-input>

    <sl-textarea
      v-else-if="item.selector === 'textarea'"
      v-model="store.form[item.id]"
      required
      resize="auto"
      rows="15"
      :label="item.label"
      :type="item.type"
    ></sl-textarea>

    <sl-select
      v-if="item.selector === 'option'"
      required
      :disabled="disabled(item)"
      :label="item.label"
      @sl-input="store.updateForm(item.id, $event.target.value)"
    >
      <sl-option
        v-for="option of item.options?.filter((option) => filter(item, option))"
        :key="option.id"
        :value="option.id"
      >
        {{ option.value }}
      </sl-option>
    </sl-select>
  </div>
</template>
