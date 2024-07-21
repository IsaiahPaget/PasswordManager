<script setup lang="ts">
    import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto';
    import { ref } from 'vue';
    import TwoColumns from './patterns/TwoColumns.vue';
    import type { NewLoginRequestValidation } from '@/models/ModelValidators';
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
    const validation = ref<NewLoginRequestValidation>()
    function OnSubmit() {
        validation.value = {
            name: {
                isValid: (loginInputs.value.name != null && loginInputs.value.name.length >= 3),
                message: "Name is mandatory",
            },
            url: {
                isValid: (loginInputs.value.url != null && loginInputs.value.url.length >= 4),
                message: "Url is mandatory",
            },
            username: {
                isValid: (loginInputs.value.username != null && loginInputs.value.username.length >= 3),
                message: "Username is mandatory",
            },
            password: {
                isValid: (loginInputs.value.password != null && loginInputs.value.password.length >= 12),
                message: "Password is mandatory",
            }
        }
        // looping over all the entries in the validation object and not "submitting" the form is one is valid
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
                <input class="input" v-model="loginInputs.name" name="nameInput" id="nameInput" type="text" required />
                <p v-if="!validation?.name.isValid">{{ validation?.name.message }}</p>
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>URL</label>
            </template>
            <template #two>
                <input class="input" v-model="loginInputs.url" name="urlInput" id="urlInput" type="text" required />
                <p v-if="!validation?.url.isValid">{{ validation?.url.message }}</p>
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Username</label>
            </template>
            <template #two>
                <input class="input" v-model="loginInputs.username" name="usernameInput" id="usernameInput" type="text" required />
                <p v-if="!validation?.username.isValid">{{ validation?.username.message }}</p>
            </template>
        </TwoColumns>
        <TwoColumns>
            <template #one>
                <label>Password</label>
            </template>
            <template #two>
                <input class="input" v-model="loginInputs.password" name="passwordInput" id="passwordInput" type="text" required />
                <p v-if="!validation?.password.isValid">{{ validation?.password.message }}</p>
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

    .input {
        background-color: var(--color-bg-light);
        border: none;
        padding: 0.5rem;
        color: var(--color-text-darker);
    }
    p {
        color: var(--color-red-light);
    }
</style>