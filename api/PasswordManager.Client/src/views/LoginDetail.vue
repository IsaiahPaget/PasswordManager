<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DeleteLogin, GetLoginById, UpdateLogin } from '@/controllers/LoginController';
import type { loginDto } from '@/models/logins/loginDto';
import { useBannerStore } from '@/stores/Banner';
import { bannerError, bannerInfo, bannerSuccess } from '@/Styles';
import { useRoute } from 'vue-router';
import MainLayout from '@/components/MainLayout.vue';
import router from '@/router';
import Loading from '@/components/Loading.vue';
import ConfirmationPopup from '@/components/ConfirmationPopup.vue';

const route = useRoute()
const showPassword = ref<boolean>(false)
const IsLoading = ref(true)
const { ShowBanner } = useBannerStore()
const login = ref<loginDto>({} as loginDto)
const IsShowDeleteConfirmationPopup = ref(false)

const createdOn = computed(() => {
    const date = new Date(login.value.createdOn)
    return date.toLocaleDateString()
})
const updatedOn = computed(() => {
    if (login.value.updatedOn == "0001-01-01T00:00:00") {
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
    const id = parseInt(newId)
    const result = await GetLoginById(id)
    if (result == undefined) {
        ShowBanner("Failed to get login", bannerError)
        router.push("/")
        return
    }
    login.value = result
    IsLoading.value = false
}
async function HandleDeleteLogin() {
    const result = await DeleteLogin(login.value.id)
    if (result == undefined) {
        ShowBanner("Failed to delete login", bannerError)
        return undefined
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
                    <div class=" justify-content-space-between">
                        <span class="overflow-hidden" v-if="showPassword">{{ login.password }}</span>
                        <span v-else>******</span>
                        <div class="utilities">
                            <a @click="CopyPasswordToClipboard" class="clickable password-toggle-button">
                                <span>Copy</span>
                            </a>
                            <a @click="ToggleShowPassword" class="clickable password-toggle-button">
                                <span v-if="showPassword">Hide</span>
                                <span v-else>View</span>
                            </a>
                        </div>
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
                        <button class="btn-delete" @click="IsShowDeleteConfirmationPopup = true">Delete</button>
                    </div>
                </div>
                <ConfirmationPopup v-if="IsShowDeleteConfirmationPopup"
                    @on-close="IsShowDeleteConfirmationPopup = false" @on-confirm="HandleDeleteLogin"
                    message="Are you sure you want to delete?" />
            </section>
        </template>
    </MainLayout>
</template>

<style scoped>
section {
    padding: var(--space-base);
}

.utilities {
    display: flex;
    gap: var(--space-base);
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