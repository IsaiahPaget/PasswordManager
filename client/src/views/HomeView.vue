<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { loginDto } from '../../models/loginDto'
import loginItem from '@/components/LoginItem.vue'
import LoginItemDetail from '@/components/LoginItemDetail.vue';
import MainLayout from '@/components/MainLayout.vue'
import SideBar from '@/components/SideBar.vue';
  const logins = ref<loginDto[]>([])
  const currentLogin = ref<loginDto>({} as loginDto);
  getLogins()
  
  function viewLogin(login: loginDto) {
    currentLogin.value = login
  }
  function getLogins() {
    logins.value = [
      {
        id: 1,
        name: "youtube",
        url: "youtube.com",
        username: "name",
        password: "password",
        notes: "no notes",
        createdOn: new Date(),
        updatedOn: new Date(),
      },
      {
        id: 2,
        name: "facebook",
        url: "facebook.com",
        username: "two",
        password: "passwordtwo",
        notes: "no notes",
        createdOn: new Date(),
        updatedOn: new Date(),
      },
    ] 
  }
</script>

<template>
  <MainLayout>

    <template #sidebar>
      <SideBar />
    </template>

    <template #items>
      <ul>
        <li v-for="login in logins" :key="login.id"  @click="viewLogin(login)">
          <loginItem  :login="login"/>
        </li>
      </ul>
    </template>

    <template #detail>
      <LoginItemDetail :login="currentLogin"/>
    </template>

  </MainLayout>
</template>

<style scoped>
</style>
