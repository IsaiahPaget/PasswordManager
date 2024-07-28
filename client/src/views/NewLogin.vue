<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import MainLayout from '@/components/MainLayout.vue';
import { CreateLogin } from '@/controllers/LoginController';
import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
import router from '@/router';
import { useBannerStore } from '@/stores/Banner';
import { bannerError, bannerSuccess } from '@/Styles';

const { ShowBanner } = useBannerStore()
const login: NewLoginRequestDto = {
    name: "",
    url: "",
    username: "",
    password: "",
    notes: ""
}

async function HandleSubmit(loginInputs: NewLoginRequestDto) {
    const createdLogin = await CreateLogin(loginInputs)
    if (createdLogin == null) {
        ShowBanner("Failed to create login", bannerError)
        return
    }
    ShowBanner("Successfully created login", bannerSuccess)
    router.back()
}
</script>

<template>
    <MainLayout>
        <template #main>
            <section>
                <LoginForm :login="login" @on-submit="HandleSubmit" />
            </section>
        </template>
    </MainLayout>
</template>

<style scoped>
section {
    padding: var(--space-base)
}
</style>