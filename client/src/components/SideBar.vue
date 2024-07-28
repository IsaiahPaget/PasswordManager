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
    <div class="topbar-main">
        <div class="foo">
            {{ username }}
        </div>
        <button @click="Logout" class="btn-bg">
            Log out
        </button>
    </div>
</template>

<style scoped>
    .topbar-main {
        padding: var(--space-base);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--color-bg-light);
        background: linear-gradient(25deg, var(--color-bg-light) 20%, var(--color-bg-lighter) 100%);
    }
    .foo {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>