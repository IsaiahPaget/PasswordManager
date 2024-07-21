<script setup lang="ts">
import TwoColumns from '@/components/patterns/TwoColumns.vue';
import { LoginUser } from '@/controllers/AccountController';
import type { LoginUserDto } from '@/models/Account/LoginUserDto';
import router from '@/router';
import { ref } from 'vue';

  let Username = ref()
  let Email = ref()
  let Password = ref()
  async function onLogin() {
    const user: LoginUserDto = {
      Username: Username.value,
      Email: Email.value,
      Password: Password.value,
    }
    const login = await LoginUser(user)
    if (login == null) {
      // temporary
      window.alert("failed to login")
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

      <button @click.prevent="onLogin">Login</button>
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
