<script setup lang="ts">
import { ref } from 'vue'

const visible = ref<boolean>(false)

const show = () => {
  visible.value = true

  setTimeout(() => (visible.value = false), 2000)
}

defineExpose({
  show
})
</script>

<template>
  <Transition>
    <div v-if="visible" class="toast-container">
      <div class="toast-title">
        <slot name="title"></slot>
      </div>
      <div class="tost-body">
        <slot name="body"></slot>
      </div>
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

.toast-container .toast-title {
  align-items: center;
  display: flex;
  font-weight: 600;
  gap: 8px;
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
