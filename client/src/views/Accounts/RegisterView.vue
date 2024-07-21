<script setup lang="ts">
  import TwoColumns from '@/components/patterns/TwoColumns.vue';
  import { RegisterUser } from '@/controllers/AccountController';
  import type { RegisterUserDto } from '@/models/Account/RegisterUserDto';
  import router from '@/router';
  import { ref } from 'vue';

  let Username = ref()
  let Email = ref()
  let Password = ref()
  let ValidationPassword = ref()

  async function onRegister() {
    if (Password.value !== ValidationPassword.value) {
      window.alert("passwords do not match")
      return
    }
    const user: RegisterUserDto = {
      Username: Username.value,
      Email: Email.value,
      Password: Password.value,
    }
    const register = await RegisterUser(user)
    if (register == null) {
      // temporary
      window.alert("failed to register")
      return
    }
    router.push("/")
  }
</script>
<template>
  <section>
    <form action="">

      <TwoColumns>
        <template #one>
          <label for="Username_Input">Username</label>
        </template>
        <template #two>
          <input class="input" v-model="Username" name="Username_Input" id="Username_Input" type="text" required>
        </template>
      </TwoColumns>

      <TwoColumns>
        <template #one>
          <label for="Email_Input">Email</label>
        </template>
        <template #two>
          <input class="input" v-model="Email" name="Email_Input" id="Email_Input" type="email" required/>
        </template>
      </TwoColumns>

      <TwoColumns>
        <template #one>
          <label for="Password_Input">Password</label>
        </template>
        <template #two>
          <input class="input" v-model="Password" name="Password_Input" id="Password_Input" type="password" required/>
        </template>
      </TwoColumns>

      <TwoColumns>
        <template #one>
          <label for="ValidationPassword_Input">Validation Password</label>
        </template>
        <template #two>
          <input class="input" v-model="ValidationPassword" name="ValidationPassword_Input" id="ValidationPassword_Input" type="password" required/>
        </template>
      </TwoColumns>

      <button @click.prevent="onRegister">Register</button>
    </form>
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
        background-color: var(--color-bg-light);
        border: none;
        padding: 0.5rem;
        color: var(--color-text-darker);
        width: 75%;
    }
</style>
