<script setup lang="ts">
import { ref } from 'vue'

const message = ref<string>('')
const visible = ref<boolean>(false)

const show = (msg: string) => {
  message.value = msg
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
    <div v-if="visible" class="toast-container">
      <span class="toast-message">
        {{ message }}
      </span>
    </div>
  </Transition>
</template>

<style scoped>
.toast-container {
  background-color: var(--sl-color-neutral-200);
  bottom: 64px;
  left: 0;
  margin: 0 auto;
  padding: 8px 16px;
  position: fixed;
  right: 0;
  width: fit-content;
}

.toast-container .toast-message {
  font-size: var(--sl-spacing-medium);
  font-weight: 600;
  padding: 4px 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
