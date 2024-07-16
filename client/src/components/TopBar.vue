<script setup lang="ts">
    const emitsCreateNewItem = "createNewItem"
    const emit = defineEmits([emitsCreateNewItem])
</script>

<template>
    <nav>
        <button @click="$emit(emitsCreateNewItem)">New</button>
    </nav>
</template>

<style scoped >
    nav {
        padding: var(--space-base);
        background-color: var(--color-bg-dark);
        display: flex;
        justify-content: flex-end;
    }
    button {
        background-color: var(--color-yellow);
    }
</style>