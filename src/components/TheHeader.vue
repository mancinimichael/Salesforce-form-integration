<script setup lang="ts">
import { useRouter } from 'vue-router'

type TheHeaderProps = {
  title: string
}

const { title } = defineProps<TheHeaderProps>()
const router = useRouter()
</script>

<template>
  <header class="header">
    <h1>{{ title }}</h1>
    <div class="btn-group">
      <sl-button size="small" variant="primary" @click="router.push({ name: 'home' })">
        Crea ticket
      </sl-button>
      <sl-button size="small" variant="primary" @click="router.push({ name: 'tickets' })">
        Visualizza tickets
      </sl-button>
    </div>
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

.header .btn-group {
  display: flex;
  gap: 8px;
}
</style>
