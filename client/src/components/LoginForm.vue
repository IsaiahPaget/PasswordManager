<script setup lang="ts">
import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
import { ref, watch } from 'vue';
import TwoColumns from './patterns/TwoColumns.vue';
import { RequiredInputValid, type NewLoginRequestValidation } from '@/models/ModelValidators';
const emitsOnSubmit = "onSubmit"
const emit = defineEmits([emitsOnSubmit])
const props = defineProps<{ login: NewLoginRequestDto }>();

const loginInputs = ref<NewLoginRequestDto>({
    name: props.login.name,
    url: props.login.url,
    username: props.login.username,
    password: props.login.password,
    notes: props.login.notes,
})

watch(() => props.login, () => {
    loginInputs.value = props.login
})

const validation = ref<NewLoginRequestValidation>({
    username: {
        isValid: true,
        message: ""
    },
    name: {
        isValid: true,
        message: ""
    },
    password: {
        isValid: true,
        message: ""
    },
    url: {
        isValid: true,
        message: ""
    },
})
function OnSubmit() {
    validation.value = {
        name: new RequiredInputValid(loginInputs.value.name, "Name")
            .Because(name => name.length >= 3, "must be atleast 3 characters")
            .Check(),
        url: new RequiredInputValid(loginInputs.value.url, "URL")
            .Because(url => url.length >= 4, "must be atleast 4 characters")
            .Check(),
        username: new RequiredInputValid(loginInputs.value.username, "Username")
            .Because(username => username.length >= 3, "must be atleast 3 characters")
            .Check(),
        password: new RequiredInputValid(loginInputs.value.password, "Password")
            .Because(password => password.length >= 12, "must be atleast 12 characters")
            .Because(password => /\d/.test(password), "must contain a number")
            .Because(password => /[a-z]/.test(password), "must contain lower case letters")
            .Because(password => /[A-Z]/.test(password), "must contain upper case letters")
            .Because(password => /[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?~]/.test(password), "must contain special characters")
            .Check()
    }
    // looping over all the key value pairs in the validation object and not "submitting" the form is one is valid
    for (const [key, value] of Object.entries(validation.value)) {
        if (!value.isValid) {
            return
        }
    }
    emit(emitsOnSubmit, loginInputs.value)
}
</script>
<template>
    <form action="">
        <TwoColumns>
            <template #one>
                <label>Name</label>
            </template>
            <template #two>
                <input class="input" :class="{ warning: !validation?.name.isValid }" v-model="loginInputs.name"
                    name="nameInput" id="nameInput" type="text" required />
                <p class="warning" v-if="!validation?.name.isValid">{{ validation?.name.message }}</p>
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>URL</label>
            </template>
            <template #two>
                <input class="input" :class="{ warning: !validation?.url.isValid }" v-model="loginInputs.url"
                    name="urlInput" id="urlInput" type="text" required />
                <p class="warning" v-if="!validation?.url.isValid">{{ validation?.url.message }}</p>
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Username</label>
            </template>
            <template #two>
                <input class="input" :class="{ warning: !validation?.username.isValid }" v-model="loginInputs.username"
                    name="usernameInput" id="usernameInput" type="text" required />
                <p class="warning" v-if="!validation?.username.isValid">{{ validation?.username.message }}</p>
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Password</label>
            </template>
            <template #two>
                <input class="input" :class="{ warning: !validation?.password.isValid }" v-model="loginInputs.password"
                    name="passwordInput" id="passwordInput" type="text" required />
                <p class="warning" v-if="!validation?.password.isValid">{{ validation?.password.message }}</p>
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Notes</label>
            </template>
            <template #two>
                <textarea class="input" v-model="loginInputs.notes" name="notesInput" id="notesInput" type="text"
                    required></textarea>
            </template>
        </TwoColumns>
        <div class="button-row">
            <button @click.prevent="OnSubmit">Save</button>
        </div>
    </form>

</template>
<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.button-row {
    display: flex;
    justify-content: flex-end;
}
.input {
    background-color: var(--color-bg-light);
    border: none;
    padding: 0.5rem;
    color: var(--color-text-darker);
}
</style>