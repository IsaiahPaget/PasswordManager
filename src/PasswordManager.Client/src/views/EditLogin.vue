<script setup lang="ts">
import Loading from '@/components/Loading.vue';
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
const IsLoading = ref(false)
GetLogin()

async function GetLogin() {
    const newId = route.params.id as string
    try {
        const id = parseInt(newId)
        IsLoading.value = true
        const result = await GetLoginById(id)
        IsLoading.value = false
        if (result == undefined) {
            return
        }
        login.value = result

    } catch (error) {
        ShowBanner("Failed to get login", bannerError)
    }
}
async function HandleSubmit(loginInputs: UpdateLoginRequest) {
    loginInputs.id = login.value.id
    IsLoading.value = true
    const updatedLogin = await UpdateLogin(loginInputs)
    IsLoading.value = false
    if (updatedLogin == undefined) {
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
                <LoginForm v-if="!IsLoading" :login="login" @on-submit="HandleSubmit" class="fade-in" />
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