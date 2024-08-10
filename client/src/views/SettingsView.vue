<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue';
import { ExportCSV, ImportCSV } from '@/controllers/CSVController';
import { HandleFileDownload } from '@/services/Download';
import { useBannerStore } from '@/stores/Banner';
import { bannerError, bannerSuccess } from '@/Styles';
import { faFileArrowDown, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, ref, watch } from 'vue';
const uploadInput = ref<HTMLInputElement>()
const { ShowBanner } = useBannerStore()
async function Import() {
    try {
        uploadInput.value?.click()
        uploadInput.value?.addEventListener("change", async (e) => {
            const inputElement = e.target as HTMLInputElement
            if (inputElement.files && inputElement.files[0]) {
                const file = inputElement.files[0]
                await ImportCSV(file)
                ShowBanner("Successfully imported logins", bannerSuccess)
            }
        })
    } catch (error) {
        ShowBanner("Failed to import logins", bannerError)
    }

}
async function Export() {
    const response = await ExportCSV()
    if (!response || !response?.ok) {
        ShowBanner("Failed to export logins", bannerError)
        return
    }
    HandleFileDownload(response)
}
</script>
<template>
    <MainLayout>
        <template #main>
            <section class="settings-main">
                <div class="import-export">
                    Import / Export CSV
                    <div>
                        <input class="uploadCSV" type="file" ref="uploadInput" />
                        <button @click="Import" class="btn-green">
                            Import
                            <FontAwesomeIcon :icon="faFileArrowDown" />
                        </button>
                        <button @click="Export" class="btn-blue">
                            Export
                            <FontAwesomeIcon :icon="faFileArrowUp" />
                        </button>
                    </div>
                </div>
            </section>
        </template>
    </MainLayout>
</template>
<style scoped>
.uploadCSV {
    display: none;
}

.settings-main {
    padding: var(--space-base);
}

.import-export {
    border-bottom: solid var(--border-width) var(--color-fg-3);
}

.import-export>div {
    padding-top: var(--space-base);
    display: flex;
    gap: var(--space-base);
    padding-bottom: var(--space-base);
}
</style>