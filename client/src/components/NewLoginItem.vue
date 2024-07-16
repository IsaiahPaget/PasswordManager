<script setup lang="ts">
    import LoginForm from '@/components/LoginForm.vue'
import { CreateLogin } from '@/controllers/LoginController';
    import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
    const emitsCreatedLogin = "createdLogin"
    const emitsOnClose = "onClose"
    const emit = defineEmits([emitsCreatedLogin, emitsOnClose])
    async function HandleSubmit(loginInputs: NewLoginRequestDto) {
        const createdLogin = await CreateLogin(loginInputs)
        if (createdLogin == null) {
            window.alert("failed to create login")
            return null
        }

        emit(emitsCreatedLogin)
        window.alert("successfully created login")
    }
</script>

<template>
    <section>
        <LoginForm :login="{} as NewLoginRequestDto" @on-submit="HandleSubmit" />
        <button @click="$emit(emitsOnClose)">Close</button>
    </section>
</template>

<style scoped>
    section {
        padding: var(--space-base)
    }
</style>