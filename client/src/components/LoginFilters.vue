<script setup lang="ts">
import { ref } from 'vue';
const emitsOnChange = "onChange"
const emit = defineEmits([emitsOnChange])
const searchTerm = ref("")
const isTyping = ref(false)
function OnKeyUp() {
    if (!isTyping.value) {
        isTyping.value = true
        setTimeout(() => {
            isTyping.value = false
            emit(emitsOnChange, searchTerm)
        }, 200);
    }
}
</script>
<template>
    <div class="container">
        <input @keyup="OnKeyUp" placeholder="Search" class="input" v-model="searchTerm" name="searchInput" id="searchInput" type="text" required />
    </div>
</template>
<style scoped>
.container {
    padding: var(--space-base);
    display: flex;
}

.input {
    border-radius: var(--border-radius);
    background-color: var(--color-bg-light);
    border: solid var(--color-purple-light);
    padding: 0.5rem;
    color: var(--color-text-darker);
    flex-grow: 1;
}
</style>