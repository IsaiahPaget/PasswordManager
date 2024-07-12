<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { loginDto } from '../../models/loginDto'
import loginItem from '@/components/LoginItem.vue'
import LoginItemDetail from '@/components/LoginItemDetail.vue';
import MainLayout from '@/components/MainLayout.vue'
import SideBar from '@/components/SideBar.vue';
  const Logins = ref<loginDto[]>([])
  const currentLogin = ref<loginDto>({} as loginDto);
  getLogins()
  
  function viewLogin(login: loginDto) {
    currentLogin.value = login
  }
  async function getLogins() {
    const data = await fetch("https://localhost:7238/api/logins?startIndex=0&maxRecords=10&searchTerm=%22%22", {
      headers: { Authorization: 'Bearer ${token}' }
    })
    if (data == null) {
      return
    }
    const results: loginDto[] = await data.json()
    Logins.value = results
  }
</script>

<template>
  <MainLayout>

    <template #sidebar>
      <SideBar />
    </template>

    <template #items>
      <ul>
        <li v-for="login in Logins" :key="login.id"  @click="viewLogin(login)">
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
