<script setup lang="ts">
import { computed, ref } from 'vue'

const message = ref<string>('')
const type = ref<'success' | 'danger'>('success')
const visible = ref<boolean>(false)

const toastClass = computed(() => ({
  danger: type.value === 'danger',
  success: type.value === 'success'
}))

const show = (toastMessage: string, toastType: 'danger' | 'success') => {
  message.value = toastMessage
  type.value = toastType
  visible.value = true

  setTimeout(() => {
    message.value = ''
    visible.value = false
  }, 2000)
}

defineExpose({ show })
</script>

<template>
  <Transition>
    <div v-if="visible" class="toast-container" :class="toastClass">
      <span v-html="message" class="toast-message"></span>
    </div>
  </Transition>
</template>

<style scoped>
.toast-container {
  align-items: center;
  background-color: var(--sl-color-neutral-200);
  bottom: 64px;
  display: flex;
  height: 5%;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  padding: 24px 16px;
  position: fixed;
  right: 0;
  width: 20%;
}

.toast-container.danger {
  background-color: var(--sl-color-danger-600);
  color: var(--sl-color-neutral-0);
}

.toast-container.success {
  background-color: var(--sl-color-success-600);
  color: var(--sl-color-neutral-0);
}

.toast-container .toast-message {
  font-size: var(--sl-spacing-medium);
  font-weight: 600;
  padding: 4px 0;
}
</style>
