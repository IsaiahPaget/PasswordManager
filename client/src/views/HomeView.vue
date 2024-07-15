<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import type { loginDto } from '@/models/logins/loginDto'
  import loginItem from '@/components/LoginItem.vue'
  import LoginItemDetail from '@/components/LoginItemDetail.vue';
  import MainLayout from '@/components/MainLayout.vue'
  import SideBar from '@/components/SideBar.vue';
  import TopBar from '@/components/TopBar.vue'
  import { GetAllLogins } from "@/controllers/LoginController"
import router from '@/router';

  if (localStorage.getItem("JWTSessionToken") == null) {
    router.push("/account/login")
  }
  const Logins = ref<loginDto[]>([])
  const currentLogin = ref<loginDto>({} as loginDto)
  const isEditing = ref(false)
  getLogins()
  
  function viewLogin(login: loginDto) {
    currentLogin.value = login
  }
  async function getLogins() {
    const logins = await GetAllLogins({StartIndex: 0, MaxRecords: 10, SearchTerm: ""})
    if (logins == null) {
      return 
    }
    Logins.value = logins
  }
</script>

<template>
  <MainLayout>
    <template #navigation>
      <TopBar />
    </template>

    <template #sidebar>
      <SideBar />
    </template>

    <template #items>
      <p v-if="Logins.length === 0">No logins</p>
      <ul v-else >
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
