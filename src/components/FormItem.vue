<script setup lang="ts">
import { store } from '@/store'
import type { FormItem, FormItemProps, Option } from '@/types'

const { disabled, item } = defineProps<FormItemProps>()

const filter = (item: FormItem, option: Option) => {
  if (item.id === 'tipology') return option.sectorId === store.form.sector

  if (item.id === 'category') return option.sectorId === store.form.tipology

  return true
}
</script>

<template>
  <div class="wrapper">
    <sl-input
      v-if="item.selector === 'input' && disabled"
      filled
      :disabled="disabled"
      :label="item.label"
      :type="item.type"
      :value="item.value"
    ></sl-input>

    <sl-input
      v-if="item.selector === 'input' && !disabled"
      v-model="store.form[item.id]"
      filled
      required
      :label="item.label"
      :type="item.type"
    ></sl-input>

    <sl-textarea
      v-else-if="item.selector === 'textarea'"
      v-model="store.form[item.id]"
      filled
      required
      resize="auto"
      :label="item.label"
      :type="item.type"
    ></sl-textarea>

    <sl-select
      v-if="item.selector === 'option'"
      filled
      :disabled="
        ['category', 'tipology'].includes(item.id) &&
        (!store.form.sector ||
          !item.options?.filter((option) => option.sectorId === store.form.sector).length)
      "
      :label="item.label"
      :required="item.id !== 'tipology'"
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

<style scoped>
.wrapper {
  margin-bottom: 1.5rem;
}

.wrapper:last-child {
  margin-bottom: 0;
}
</style>
