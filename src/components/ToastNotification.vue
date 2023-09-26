<script setup lang="ts"></script>

<template>
  <div class="toast-container">
    <div class="toast-title">
      <slot name="title"></slot>
    </div>
    <div class="tost-body">
      <slot name="body"></slot>
    </div>
  </div>
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
</style>
