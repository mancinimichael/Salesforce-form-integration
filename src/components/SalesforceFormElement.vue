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
  <div>
    <label :for="props.element.id">{{ props.element.label }}</label>
    <input
      v-if="props.element.selector === 'input'"
      :id="props.element.id"
      :type="props.element.type"
      :value="props.model"
      @input="handleInput"
    />
    <textarea
      v-else-if="props.element.selector === 'textarea'"
      :id="props.element.id"
      :type="props.element.type"
      :value="props.model"
      @input="handleInput"
    ></textarea>
    <select v-else :id="props.element.id" :value="props.model" @input="handleInput">
      <option value>--None--</option>
      <template v-if="props.element.id !== 'category'">
        <option v-for="opt of props.element.data" :key="opt.value" :value="opt.value">
          {{ opt.value }}
        </option>
      </template>
      <template v-else>
        <option
          v-for="opt of props.element.data?.filter((e) => e.sector === props.sector)"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.value }}
        </option>
      </template>
    </select>
  </div>
</template>

<style scoped lang="scss"></style>
