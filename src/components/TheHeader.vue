<script setup lang="ts">
import { useRouter } from 'vue-router'

type TheHeaderProps = {
  button: string
  title: string
  navigate?: string
}

const { button, navigate, title } = defineProps<TheHeaderProps>()
const router = useRouter()
</script>

<template>
  <header class="header">
    <h1>{{ title }}</h1>
    <sl-button size="small" variant="primary" @click="router.push({ name: navigate ?? 'home' })">
      {{ button }}
    </sl-button>
  </header>
</template>

<style scoped>
.header {
  align-items: center;
  background-color: var(--sl-color-neutral-0);
  border: 1px solid var(--sm-color-border, #dee2e7);
  display: flex;
  justify-content: space-between;
  padding: var(--sl-spacing-medium);
}

.header h1 {
  font-size: var(--sl-spacing-medium);
}
</style>
