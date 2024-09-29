<script setup lang="ts">
defineProps<{ message: string}>()
</script>
<template>
    <div class="confirm-container" @click="$emit('onClose')">
        <span>
            {{ message }}
        </span>
        <button class="btn-red" @click="$emit('onConfirm')">
            Confirm
        </button>
    </div>
</template>
<style scoped>

.confirm-container {
    background-color: #000000c0;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-base);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: var(--light1);
}
</style>