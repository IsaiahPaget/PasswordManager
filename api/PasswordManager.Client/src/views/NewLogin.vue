<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import MainLayout from '@/components/MainLayout.vue';
import { CreateLogin } from '@/controllers/LoginController';
import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
import router from '@/router';
import Loading from '@/components/Loading.vue';
import { useBannerStore } from '@/stores/Banner';
import { bannerError, bannerSuccess } from '@/Styles';
import { ref } from 'vue';

const { ShowBanner } = useBannerStore()
const IsLoading = ref(false)
const login: NewLoginRequestDto = {
    name: "",
    url: "",
    username: "",
    password: "",
    notes: ""
}

async function HandleSubmit(loginInputs: NewLoginRequestDto) {
    IsLoading.value = true
    const createdLogin = await CreateLogin(loginInputs)
    IsLoading.value = false
    if (createdLogin == undefined) {
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
                <LoginForm v-if="!IsLoading" :login="login" @on-submit="HandleSubmit" />
                <Loading v-else />
            </section>
        </template>
    </MainLayout>
</template>

<style scoped>
section {
    padding: var(--space-base)
}
</style>