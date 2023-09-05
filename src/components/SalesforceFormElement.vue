<script setup lang="ts">
import type { ElementEmits, ElementProps } from '@/types/form'

const emit = defineEmits<ElementEmits>()
const props = defineProps<ElementProps>()

const handleInput = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  emit('change', value)
}
</script>

<template>
  <div class="wrapper">
    <label :for="props.element.id">{{ props.element.label }}</label>
    <sl-input
      v-if="props.element.selector === 'input'"
      :id="props.element.id"
      :type="props.element.type"
      :value="props.model"
      @input="handleInput"
    ></sl-input>
    <sl-textarea
      v-else-if="props.element.selector === 'textarea'"
      :id="props.element.id"
      :type="props.element.type"
      :value="props.model"
      @input="handleInput"
    ></sl-textarea>
    <sl-select v-else :id="props.element.id" :value="props.model" @sl-input="handleInput">
      <sl-option value>--None--</sl-option>
      <sl-option
        v-for="opt of props.element.id === 'category'
          ? props.element.data?.filter((element) => element.sector === props.sector)
          : props.element.data"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.value }}
      </sl-option>
    </sl-select>
  </div>
</template>

<style scoped lang="scss"></style>
