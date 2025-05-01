<script setup lang="ts">
import { computed } from 'vue'

// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">

const props = defineProps<{
  to?: string | {}
  href?: string
}>()

const link = computed(() => props.href ? {to: props.to} : {href: props.href})
</script>

<template>
  <component :is="props.to ? 'router-link' : 'a'" :link="link" class="link">
    <slot />
  </component>

  <!-- <span class="link" tabindex="0">Link</span> -->
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
