<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import MainLayout from '@/components/MainLayout.vue';
import { GetLoginById, UpdateLogin } from '@/controllers/LoginController';
import type { loginDto } from '@/models/logins/loginDto';
import type { UpdateLoginRequest } from '@/models/logins/UpdateLoginRequest';
import router from '@/router';
import { useBannerStore } from '@/stores/Banner';
import { bannerError, bannerInfo } from '@/Styles';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { ShowBanner } = useBannerStore()
const login = ref<loginDto>({} as loginDto)
const route = useRoute()
GetLogin()

async function GetLogin() {
    const newId = route.params.id as string
    try {
        const id = parseInt(newId)
        const result = await GetLoginById(id)

        if (result == null) {
            return
        }
        login.value = result

    } catch (error) {
        ShowBanner("Failed to get login", bannerError)
    }
}
async function HandleSubmit(loginInputs: UpdateLoginRequest) {
    loginInputs.id = login.value.id
    const updatedLogin = await UpdateLogin(loginInputs)

    if (updatedLogin == null) {
        ShowBanner("Failed to update login", bannerError)
        return
    }

    ShowBanner("Successfully updated login", bannerInfo)
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