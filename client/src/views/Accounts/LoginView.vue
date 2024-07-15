<script setup lang="ts">
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
  <h1>This is a login page</h1>
  <form action="">
    <label for="Username_Input">Username</label>
    <input v-model="Username" name="Username_Input" id="Username_Input" type="text" required>

    <label for="Email_Input">Email</label>
    <input v-model="Email" name="Email_Input" id="Email_Input" type="email" required/>

    <label for="Password_Input">Password</label>
    <input v-model="Password" name="Password_Input" id="Password_Input" type="password" required/>

    <button @click.prevent="onLogin">Login</button>
  </form>
</template>

<style scoped>
</style>
