<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TwoColumns from './patterns/TwoColumns.vue';
import { RequiredInputValid } from '@/models/ModelValidators';
import { MaxEmailLength, MaxUsernameLength, MinimumEmailLength, MinimumUsernameLength } from '@/Config';
import type { EditUser } from '@/models/User/EditUser';

const emitsOnSubmit = "onSubmit"
const emit = defineEmits([emitsOnSubmit])
const props = defineProps<{ userInfo: EditUser }>()
const UserInputs = ref<EditUser>({
    username: props.userInfo.username,
    email: props.userInfo.email
})

watch(() => props.userInfo, () => {
    UserInputs.value = props.userInfo
})

const validation = ref({
    username: {
        isValid: true,
        message: ""
    },
    email: {
        isValid: true,
        message: ""
    },
})
function IsFormValid() {
    validation.value = {
        username: new RequiredInputValid(UserInputs.value.username, "Username")
            .Because(username => username.length >= MinimumUsernameLength, `must be atleast ${MinimumUsernameLength} characters`)
            .Because(username => username.length <= MaxUsernameLength, `must be less than ${MaxUsernameLength} characters`)
            .Check(),
        email: new RequiredInputValid(UserInputs.value.email, "Email")
            .Because(email => email.length >= MinimumEmailLength, `must be atleast ${MinimumEmailLength} characters`)
            .Because(email => email.length <= MaxEmailLength, `must be less than ${MaxEmailLength} characters`)
            .Because(email => /^\S+@\S+\.\S+$/.test(email), "must be a valid email")
            .Check(),
    }
    // looping over all the key value pairs in the validation object and not "submitting" the form is one is valid
    for (const [key, value] of Object.entries(validation.value)) {
        if (!value.isValid) {
            return false
        }
    }
    return true
}

function OnSubmit() {
    if (!IsFormValid()) {
        return
    }

    emit(emitsOnSubmit, UserInputs.value)
}
</script>
<template>
    <form>
        <TwoColumns>
            <template #one>
                <label for="Username_Input">Username</label>
            </template>
            <template #two>
                <input class="input" :class="{ warning: !validation?.username.isValid }" v-model="UserInputs.username"
                    name="Username_Input" id="Username_Input" type="text" required>
                <p class="warning" v-if="!validation?.username.isValid">{{ validation?.username.message }}</p>
            </template>
        </TwoColumns>

        <TwoColumns>
            <template #one>
                <label for="Email_Input">Email</label>
            </template>
            <template #two>
                <input class="input" :class="{ warning: !validation?.email.isValid }" v-model="UserInputs.email"
                    name="Email_Input" id="Email_Input" type="email" required />
                <p class="warning" v-if="!validation?.email.isValid">{{ validation?.email.message }}</p>
                <button class="btn-save btn-blue" @click.prevent="OnSubmit">
                    Save
                </button>
            </template>
        </TwoColumns>
        <button class="btn-warning">
            Change Password
        </button>
    </form>
</template>
<style scoped>
.btn-save {
    margin-left: var(--space-base);
}

form {
    padding-top: var(--space-base);
    padding-bottom: var(--space-base);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: clamp(400px, 50%, 800px);
}
</style>
