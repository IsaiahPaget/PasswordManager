<script setup lang="ts">
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
const emitsOnPrevious = "onPrevious"
const emitsOnNext = "onNext"
defineProps<{ pageNumber: number, startIndex: number, rowCount: number, maxRecords: number }>()
const emit = defineEmits([emitsOnPrevious, emitsOnNext])
</script>
<template>
    <button ref="backward" class="btn-transparent" :disabled="pageNumber < 1" @click="emit(emitsOnPrevious)">
        <FontAwesomeIcon :icon="faChevronLeft" />
    </button>
    <span>
        {{ pageNumber + 1 }}
    </span>
    <button ref="forward" class="btn-transparent" :disabled="rowCount < startIndex + maxRecords + 1" @click="emit(emitsOnNext)">
        <FontAwesomeIcon :icon="faChevronRight" />
    </button>
</template>
<style scoped>
button:disabled {
    color: var(--color-bg-1) !important;
}

span {
    color: var(--color-fg-2);
    font: bold;
}
</style>