<script setup lang="ts">
import TwoColumns from '@/components/patterns/TwoColumns.vue';
import { LoginUser } from '@/controllers/AccountController';
import type { LoginUserDto } from '@/models/Account/LoginUserDto';
import type { AccountLoginValidation } from '@/models/ModelValidators';
import { RequiredInputValid } from '@/models/ModelValidators';
import router from '@/router';
import { useBannerStore } from '@/stores/Banner';
import { bannerError } from '@/Styles';
import { ref } from 'vue';
import Loading from '@/components/Loading.vue';
import { MaxEmailLength, MaxPasswordLength, MaxUsernameLength, MinimumEmailLength, MinimumPasswordLength, MinimumUsernameLength } from '@/Config';

const IsLoading = ref(false)
const Username = ref()
const Email = ref()
const Password = ref()
const validation = ref<AccountLoginValidation>({
  username: {
    isValid: true,
    message: ""
  },
  email: {
    isValid: true,
    message: ""
  },
  password: {
    isValid: true,
    message: ""
  },
})
const { ShowBanner } = useBannerStore()
function IsFormValid() {
  validation.value = {
    username: new RequiredInputValid(Username.value, "Username")
      .Because(username => username.length >= MinimumUsernameLength, `must be atleast ${MinimumUsernameLength} characters`)
      .Because(username => username.length <= MaxUsernameLength, `must be less than ${MaxUsernameLength} characters`)
      .Check(),
    email: new RequiredInputValid(Email.value, "Email")
      .Because(email => email.length >= MinimumEmailLength, `must be atleast ${MinimumEmailLength} characters`)
      .Because(email => email.length <= MaxEmailLength, `must be less than ${MaxEmailLength} characters`)
      .Because(email => /^\S+@\S+\.\S+$/.test(email), "must be a valid email")
      .Check(),
    password: new RequiredInputValid(Password.value, "Password")
      .Because(password => password.length >= MinimumPasswordLength, `must be atleast ${MinimumPasswordLength} characters`)
      .Because(password => password.length <= MaxPasswordLength, `must be less than ${MaxPasswordLength} characters`)
      .Because(password => /\d/.test(password), "must contain a number")
      .Because(password => /[a-z]/.test(password), "must contain lower case letters")
      .Because(password => /[A-Z]/.test(password), "must contain upper case letters")
      .Because(password => /[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?~]/.test(password), "must contain special characters")
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
async function OnLogin() {
  if (!IsFormValid()) {
    return
  }
  const user: LoginUserDto = {
    Username: Username.value,
    Email: Email.value,
    Password: Password.value,
  }
  IsLoading.value = true
  const login = await LoginUser(user)
  IsLoading.value = false
  if (login == undefined) {
    // temporary
    ShowBanner("failed to login", bannerError)
    return
  }
  router.push("/")
}
</script>
<template>
  <section>
    <form v-if="!IsLoading" action="">

      <TwoColumns>
        <template #one>
          <label for="Username_Input">Username</label>
        </template>
        <template #two>
          <input class="input" :class="{ warning: !validation?.username.isValid }" v-model="Username"
            name="Username_Input" id="Username_Input" type="text" required>
          <p class="warning" v-if="!validation?.username.isValid">{{ validation?.username.message }}</p>
        </template>
      </TwoColumns>

      <TwoColumns>
        <template #one>
          <label for="Email_Input">Email</label>
        </template>
        <template #two>
          <input class="input" :class="{ warning: !validation?.email.isValid }" v-model="Email" name="Email_Input"
            id="Email_Input" type="email" required />
          <p class="warning" v-if="!validation?.email.isValid">{{ validation?.email.message }}</p>
        </template>
      </TwoColumns>

      <TwoColumns>
        <template #one>
          <label for="Password_Input">Password</label>
        </template>
        <template #two>
          <input class="input" :class="{ warning: !validation?.password.isValid }" v-model="Password"
            name="Password_Input" id="Password_Input" type="password" required />
          <p class="warning" v-if="!validation?.password.isValid">{{ validation?.password.message }}</p>
        </template>
      </TwoColumns>

      <button class="btn-blue" @click.prevent="OnLogin">Login</button>
      <button class="btn-transparent" @click.prevent="router.push('/account/register')">Register</button>
    </form>
    <Loading v-else />
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: var(--space-base);
  width: clamp(400px, 50%, 800px);
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.input {
  background-color: var(--color-bg-1);
  border: none;
  padding: 0.5rem;
  color: var(--color-fg-2);
  width: 75%;
}
</style>
