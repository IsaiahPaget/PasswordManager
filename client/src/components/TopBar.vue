<script setup lang="ts">
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emitsOpenDrawer = "openDrawer"
const emit = defineEmits([emitsOpenDrawer])
const showBackButton = ref(false)
const showNewButton = ref(false)
const router = useRouter()
const route = useRoute()

watch(() => route.path, () => {
    if (route.path == "/") {
        showBackButton.value = false
        showNewButton.value = true
    } else {
        showBackButton.value = true
        showNewButton.value = false
    }
},
    { immediate: true }
)

</script>

<template>
    <nav>
        <div>
            <button @click="emit(emitsOpenDrawer)" class="btn-transparent hamburger">
                <FontAwesomeIcon :icon="faBars" />
            </button>
        </div>
        <div class="utility">
            <button v-if="showNewButton" class="btn-green" @click="router.push('/new')">New</button>
            <button v-if="showBackButton" class="btn-bg" @click="router.back()">
                <FontAwesomeIcon :icon="faChevronLeft" />
            </button>
        </div>
    </nav>
</template>

<style scoped>
.hamburger {
    display: none;
}
.utility {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-base);
    align-items: center;
}

nav {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: var(--space-base);
    background-color: var(--color-bg-dark);
}
@media only screen and (max-width: 426px) { 
.hamburger {
    display: block;
}
}
</style>