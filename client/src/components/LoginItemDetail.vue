<script setup lang="ts">
  import type { loginDto } from 'models/loginDto';
  import { ref, watch, watchEffect } from 'vue';
  const showPassword = ref<boolean>(false)

  let props = defineProps<{ login: loginDto }>()
  watch(props.login, () => {
    showPassword.value = false
  })

  function ToggleShowPassword() {
    showPassword.value = !showPassword.value
  }
</script>

<template>
  <div v-if="login.id > 0" class="login-item">
    <div class="name">
      <h1>
        {{ login.name }}
      </h1>
      <p class="url">
        {{ login.url }}
      </p>
    </div>
    <p class="box">
      <span>{{ login.username }}</span>
    </p>
    <p class="box">
      <div v-if="showPassword" class="justify-content-space-between">
        <span>{{ login.password }}</span>
        <a @click="ToggleShowPassword" class="password-toggle-button">hide</a>
      </div>
      <div v-else class="justify-content-space-between">
        <span >******</span>
        <a @click="ToggleShowPassword" class="password-toggle-button">view</a>
      </div>
    </p>
    <p>
      {{ login.notes }}
    </p>
    <p>
      Created On: <span class="date-value">{{ login.createdOn }}</span>
    </p>
    <p>
      Updated On: <span class="date-value">{{ login.updatedOn }}</span>
    </p>
  </div>
</template>

<style scoped>
.login-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-base);
  padding: var(--space-base)
}

.name {
    border-bottom: var(--border-width) solid var(--color-green);
    padding-bottom: var(--space-base);
}

.url {
  color: var(--color-text-darkest);
}
.password-toggle-button {
  color: var(--color-text-darkest);
}

.box {
  border: var(--border-width) solid var(--color-blue) ;
  border-radius: var(--border-radius);
  padding: var(--space-base);
}

.date-value {
  color: var(--color-text-darkest);
}
</style>