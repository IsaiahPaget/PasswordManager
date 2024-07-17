<script setup lang="ts">
    import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
    import { ref } from 'vue';
import TwoColumns from './patterns/TwoColumns.vue';
    const props = defineProps<{ login: NewLoginRequestDto }>();
    const loginInputs = ref<NewLoginRequestDto>({
        name: props.login.name,
        url: props.login.url,
        username: props.login.username,
        password: props.login.password,
        notes: props.login.notes,
    })
</script>
<template>
    <form action="">
        <TwoColumns>
            <template #one>
                <label>Name</label>
            </template>
            <template #two>
                <input class="input" v-model="loginInputs.name" name="nameInput" id="nameInput" type="text" required />
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>URL</label>
            </template>
            <template #two>
                <input class="input" v-model="loginInputs.url" name="urlInput" id="urlInput" type="text" required />
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Username</label>
            </template>
            <template #two>
                <input class="input" v-model="loginInputs.username" name="usernameInput" id="usernameInput" type="text" required />
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Password</label>
            </template>
            <template #two>
                <input class="input" v-model="loginInputs.password" name="passwordInput" id="passwordInput" type="text" required />
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Notes</label>
            </template>
            <template #two>
                <textarea class="input" v-model="loginInputs.notes" name="notesInput" id="notesInput" type="text" required></textarea>
            </template>
        </TwoColumns>
        <div>
            <button @click.prevent="$emit('onSubmit', loginInputs)">Save</button>
        </div>
    </form>

</template>
<style scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input {
        background-color: var(--color-bg-light);
        border: none;
        padding: 0.5rem;
        color: var(--color-text-darker);
    }

</style>