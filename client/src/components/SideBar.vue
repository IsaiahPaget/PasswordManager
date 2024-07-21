<script setup lang="ts">
import { UserUsername } from '@/LocalStorage';
import router from '@/router';
import { ref } from 'vue';

    const username = ref(localStorage.getItem(UserUsername))
    function Logout() {
        localStorage.clear()
        router.push("/account/login")
    }
</script>
<template>
    <div class="main">
        {{ username }}
        <button @click="Logout" class="btn-bg">
            Log out
        </button>
    </div>
</template>

<style scoped>
    .main {
        padding: var(--space-base);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
</style>