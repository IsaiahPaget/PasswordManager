<script setup lang="ts">
import type { loginDto } from '@/models/logins/loginDto';
defineProps<{ login: loginDto }>()
</script>

<template>
  <div class="login-item">
    <div class="title">
      {{ login.name }}
    </div>
    <div class="detail">
      {{ login.username }}
    </div>
    <div class="detail">
      {{ login.url }}
    </div>
  </div>
</template>

<style scoped>
.login-item {
  border-bottom: var(--border-width) solid var(--color-orange);
  padding: var(--space-base)
}

.login-item:hover {
  background-color: var(--color-bg-1);
}

.title {
  font-weight: bold;
}

.detail {
  color: var(--color-fg-3);
}
</style>