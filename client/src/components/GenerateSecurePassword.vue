<script setup lang="ts">
import { faCheck, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, watch } from 'vue';
import { GetRandomPassword, ToBase64 } from '@/services/Crypto';
import { MinimumPasswordLength } from '@/Config';

const emitsPassword = "password"
const emit = defineEmits([emitsPassword])
const Password = ref<string>("")
const AmountOfCharacters = ref<number>(MinimumPasswordLength)
watch(AmountOfCharacters, () => {
    if (AmountOfCharacters.value < MinimumPasswordLength) {
        AmountOfCharacters.value = MinimumPasswordLength
    }
})
GeneratePassword()
function GeneratePassword() {
    Password.value = GetRandomPassword(AmountOfCharacters.value)
}
</script>
<template>
    <div class="password-container">
        <div class="password">
            {{ Password }}
        </div>
        <div class="buttons">
            <div class="utilities">
                <input class="input" v-model="AmountOfCharacters" type="number" />
                <button class="btn-blue" @click.prevent="GeneratePassword">
                    <FontAwesomeIcon :icon="faRefresh" />
                </button>
                <button class="btn-green" @click.prevent="emit(emitsPassword, Password)">
                    <FontAwesomeIcon :icon="faCheck" />
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.utilities {
    display: flex;
    gap: var(--space-base);
}

.buttons {
    display: flex;
    justify-content: flex-end;
}

.password-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-base);
    background-color: var(--color-bg-0);
    border: solid var(--border-width) var(--color-fg-3);
    border-radius: var(--border-radius);
    padding: var(--space-base);
    justify-content: space-between;
    width: clamp(250px, 50%, 300px);
    position: absolute;
    left: -92px;
    top: calc(34px + var(--space-base) / 2);
}

.input {
    width: 100%;
}

.password {
    color: var(--color-fg-2);
    display: flex;
    align-items: center;
    font-size: small;
    height: 20px;
    border-bottom: solid var(--border-width) var(--color-bg-3);
}
</style>