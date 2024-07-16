<script setup lang="ts">
    import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
    import { ref } from 'vue';
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
        <div>
            <label>Name</label>
            <input v-model="loginInputs.name" name="nameInput" id="nameInput" type="text" required />
        </div>

        <div>
            <label>URL</label>
            <input v-model="loginInputs.url" name="urlInput" id="urlInput" type="text" required />
        </div>

        <div>
            <label>Username</label>
            <input v-model="loginInputs.username" name="usernameInput" id="usernameInput" type="text" required />
        </div>

        <div>
            <label>Password</label>
            <input v-model="loginInputs.password" name="passwordInput" id="passwordInput" type="text" required />
        </div>

        <div>
            <label>Notes</label>
            <textarea v-model="loginInputs.notes" name="notesInput" id="notesInput" type="text" required></textarea>
        </div>
        <button @click.prevent="$emit('onSubmit', loginInputs)">Save</button>
    </form>

</template>
<style scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>