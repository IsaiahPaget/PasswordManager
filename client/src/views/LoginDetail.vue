<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DeleteLogin, GetLoginById, UpdateLogin } from '@/controllers/LoginController';
import type { loginDto } from '@/models/logins/loginDto';
import { nullDateValue } from '@/DateValues';
import { useBannerStore } from '@/stores/Banner';
import { bannerError, bannerInfo, bannerSuccess } from '@/Styles';
import { useRoute } from 'vue-router';
import MainLayout from '@/components/MainLayout.vue';
import router from '@/router';
import Loading from '@/components/Loading.vue';

const route = useRoute()
const showPassword = ref<boolean>(false)
const IsLoading = ref(true)
const { ShowBanner } = useBannerStore()
const login = ref<loginDto>({} as loginDto)

const createdOn = computed(() => {
    const date = new Date(login.value.createdOn)
    return date.toLocaleDateString()
})
const updatedOn = computed(() => {
    if (Date.parse(login.value.updatedOn) === nullDateValue) {
        return "N/A"
    }
    const date = new Date(login.value.updatedOn)
    return date.toLocaleDateString()
})
GetLogin()

function ToggleShowPassword() {
    showPassword.value = !showPassword.value
}

async function GetLogin() {
    const newId = route.params.id as string
    IsLoading.value = true
    try {
        const id = parseInt(newId)
        const result = await GetLoginById(id)
        if (result == null) {
            return
        }
        login.value = result
        IsLoading.value = false
    } catch (error) {
        ShowBanner("Failed to get login", bannerError)
        return
    }
}
async function HandleDeleteLogin() {
    const result = await DeleteLogin(login.value.id)
    if (result == null) {
        ShowBanner("Failed to delete login", bannerError)
        return null
    }
    login.value.id = 0 // this is for hiding the old data
    ShowBanner("Successfully delete login", bannerInfo)

    router.push("/")
}
function CopyPasswordToClipboard() {
    navigator.clipboard.writeText(login.value.password);
    ShowBanner("Copied password to clipboard", bannerInfo)
}
</script>

<template>
    <MainLayout>

        <template #main>
            <section>
                <Loading v-if="IsLoading" />
                <div v-else class="login-item fade-in">
                    <div class="name">
                        <div>
                            <h1>
                                {{ login.name }}
                            </h1>
                            <p class="url">
                                {{ login.url }}
                            </p>
                        </div>
                        <button class="btn-blue" @click="$router.push(`/edit/${login.id}`)">Edit</button>
                    </div>
                    <p class="box">
                        <span>{{ login.username }}</span>
                    </p>
                    <p class="password-box box">
                    <div @click="CopyPasswordToClipboard" class=" clickable justify-content-space-between">
                        <span v-if="showPassword">{{ login.password }}</span>
                        <span v-else>******</span>
                        <a @click="ToggleShowPassword" class="password-toggle-button">
                            <span>Copy</span>
                            <span v-if="showPassword">Hide</span>
                            <span v-else>View</span>
                        </a>
                    </div>
                    </p>
                    <p>
                        {{ login.notes }}
                    </p>
                    <p>
                        Created On: <span class="date-value">{{ createdOn }}</span>
                    </p>
                    <p>
                        Updated On: <span class="date-value">{{ updatedOn }}</span>
                    </p>
                    <div>
                        <button class="btn-delete" @click="HandleDeleteLogin">Delete</button>
                    </div>
                </div>
            </section>
        </template>
    </MainLayout>
</template>

<style scoped>
section {
    padding: var(--space-base);
}

.password-box:hover {

    background-color: var(--color-bg-0);
}

.login-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-base);
}

.name {
    border-bottom: var(--border-width) solid var(--color-green);
    padding-bottom: var(--space-base);
    display: flex;
    justify-content: space-between;
}

.url {
    color: var(--color-fg-3);
}

.password-toggle-button {
    color: var(--color-fg-3);
    display: flex;
    gap: var(--space-base);
}

.box {
    border: var(--border-width) solid var(--color-blue);
    border-radius: var(--border-radius);
    padding: var(--space-base);
}

.date-value {
    color: var(--color-fg-3);
}
</style>