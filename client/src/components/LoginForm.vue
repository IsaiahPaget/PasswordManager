<script setup lang="ts">
import { CreateLogin, UpdateLogin } from '@/controllers/LoginController';
import type { loginDto } from '@/models/logins/loginDto';
import { ToNewLoginRequest, ToUpdateLoginRequest } from '@/models/ModelMappers';
const props = defineProps<{ login: loginDto }>();
async function onSubmit() {
    const loginToSubmit = props.login

    if (loginToSubmit.id > 0) {
        // update login
        const updatedLogin = await UpdateLogin(ToUpdateLoginRequest(loginToSubmit))
        if (updatedLogin == null) {
            return null
        }

        window.alert("successfully updated login")
    } else {
        // new login
        const id = await CreateLogin(ToNewLoginRequest(loginToSubmit))
        console.log(id)
    }
}
</script>
<template>
    <form action="">
        <div>
            <label>Name</label>
            <input v-model="props.login.name" name="nameInput" id="nameInput" type="text" required />
        </div>

        <div>
            <label>URL</label>
            <input v-model="props.login.url" name="urlInput" id="urlInput" type="text" required />
        </div>

        <div>
            <label>Username</label>
            <input v-model="props.login.username" name="usernameInput" id="usernameInput" type="text" required />
        </div>

        <div>
            <label>Password</label>
            <input v-model="props.login.password" name="passwordInput" id="passwordInput" type="text" required />
        </div>

        <div>
            <label>Notes</label>
            <textarea v-model="props.login.notes" name="notesInput" id="notesInput" type="text" required></textarea>
        </div>
        <button @click.prevent="onSubmit">Submit</button>
    </form>

</template>
<style scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>