<script setup lang="ts">
    import type { loginDto } from 'models/loginDto'; 
    defineProps<{login: loginDto}>()
</script>

<template>
  <div class="login-item">
    <div>
        <h1 >
        {{ login.name }}  
        </h1>
        <p class="url" >
        {{ login.url }}  
        </p>
    </div>
    <p >
      {{ login.username }}  
    </p>
    <p>
        {{ login.password }}
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

  }

  .url {
    color: var(--color-text-darkest);
  }

  .date-value {
    color: var(--color-text-darkest);
  }
</style>