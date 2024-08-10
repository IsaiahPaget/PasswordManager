<script setup lang="ts">
import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
import { ref, watch } from 'vue';
import TwoColumns from './patterns/TwoColumns.vue';
import { RequiredInputValid, type NewLoginRequestValidation } from '@/models/ModelValidators';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import GenerateSecurePassword from './GenerateSecurePassword.vue';
import { MaxNameLength, MaxNotesLength, MaxPasswordLength, MaxURLLength, MaxUsernameLength, MinimumNameLength, MinimumPasswordLength, MinimumURLLength, MinimumUsernameLength } from '@/Config';
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
const IsShowGeneratePassword = ref(false)

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
    notes: {
        isValid: true,
        message: ""
    }
})
function OnPasswordGenerated(password: string) {
    loginInputs.value.password = password
    ShowGeneratePassword()
}
function OnSubmit() {
    validation.value = {
        name: new RequiredInputValid(loginInputs.value.name, "Name")
            .Because(name => name.length >= MinimumNameLength, `must be atleast ${MinimumNameLength} characters`)
            .Because(name => name.length <= MaxNameLength, `must be less than ${MaxNameLength} characters`)
            .Check(),
        url: new RequiredInputValid(loginInputs.value.url, "URL")
            .Because(name => name.length >= MinimumURLLength, `must be atleast ${MinimumURLLength} characters`)
            .Because(name => name.length <= MaxURLLength, `must be less than ${MaxURLLength} characters`)
            .Check(),
        username: new RequiredInputValid(loginInputs.value.username, "Username")
            .Because(username => username.length >= MinimumUsernameLength, `must be atleast ${MinimumUsernameLength} characters`)
            .Because(username => username.length <= MaxUsernameLength, `must be less than ${MaxUsernameLength} characters`)
            .Check(),
        password: new RequiredInputValid(loginInputs.value.password, "Password")
            .Because(password => password.length >= MinimumPasswordLength, `must be atleast ${MinimumPasswordLength} characters`)
            .Because(password => password.length <= MaxPasswordLength, `must be less than ${MaxPasswordLength} characters`)
            .Because(password => /\d/.test(password), "must contain a number")
            .Because(password => /[a-z]/.test(password), "must contain lower case letters")
            .Because(password => /[A-Z]/.test(password), "must contain upper case letters")
            .Because(password => /[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?~]/.test(password), "must contain special characters")
            .Check(),
        notes: new RequiredInputValid(loginInputs.value.notes, "Notes")
            .Because(notes => notes.length <= MaxNotesLength, `must be less than ${MaxNotesLength} characters`)
            .Check(),
    }
    // looping over all the key value pairs in the validation object and not "submitting" the form is one is valid
    for (const [key, value] of Object.entries(validation.value)) {
        if (!value.isValid) {
            return
        }
    }
    emit(emitsOnSubmit, loginInputs.value)
}
function ShowGeneratePassword() {
    IsShowGeneratePassword.value = !IsShowGeneratePassword.value
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
                <div class="input pos-rel" :class="{ warning: !validation?.password.isValid }">
                    <input v-model="loginInputs.password" name="passwordInput" id="passwordInput" type="text"
                        required />
                    <button @click.prevent="ShowGeneratePassword" class="btn-transparent clickable">
                        <FontAwesomeIcon v-if="!IsShowGeneratePassword" :icon="faCircleChevronDown" />
                        <FontAwesomeIcon v-else :icon="faCircleChevronUp" />
                    </button>
                    <GenerateSecurePassword v-if="IsShowGeneratePassword" @password="OnPasswordGenerated" />
                </div>
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
            <button class="btn-blue" @click.prevent="OnSubmit">Save</button>
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

.btn-transparent {
    padding: 0;
}

div.input {
    width: calc(185px - var(--space-base));
    display: flex;
}

div.input>input {
    width: calc(169px - var(--space-base));
}

input {
    background-color: var(--color-bg-1);
    border: none;
    padding: 0;
    color: var(--color-fg-2);
}

.input {
    background-color: var(--color-bg-1);
    border: none;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    color: var(--color-fg-2);
}
</style>