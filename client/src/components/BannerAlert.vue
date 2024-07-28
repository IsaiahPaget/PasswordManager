<script setup lang="ts">
    const emitsOnClose = "onClose"
    defineProps<{ extendedClass: string, message: string}>()
    const emit = defineEmits([emitsOnClose])
</script>
<template>
    <div class="banner" :class="extendedClass">
        <p>{{ message }}</p>
        <button @click="emit(emitsOnClose)">close</button>
    </div>
</template>
<style scoped>
    button {
        background-color: transparent;
        color: var(--color-text)
    }
    button:hover {
        background-color: transparent;
        color: var(--color-text-dark);
    }
</style>