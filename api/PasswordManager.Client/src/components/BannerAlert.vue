<script setup lang="ts">
const emitsOnClose = "onClose"
defineProps<{ extendedClass: string, message: string }>()
const emit = defineEmits([emitsOnClose])
</script>
<template>
    <div class="banner" :class="extendedClass">
        <p>{{ message }}</p>
        <button class="btn-transparent" @click="emit(emitsOnClose)">close</button>
    </div>
</template>
<style scoped>
p, button {
    color: var(--light0-hard);
}
button:hover {
    color: var(--light1);
}
</style>