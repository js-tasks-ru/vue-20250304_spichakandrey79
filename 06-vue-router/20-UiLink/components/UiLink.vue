<script setup lang="ts">
import { computed } from 'vue'
import type {RouteLocationRaw } from 'vue-router'
// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">
const props = defineProps < {
  to?: RouteLocationRaw
  href?: string
} > ()
const link = computed(() => props.to ? { to: props.to } : { href: props.href })
</script>

<template>
  <component :is="props.to ? 'router-link' : 'a'" v-bind="link" class="link">
    <slot />
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
