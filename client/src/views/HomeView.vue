<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import type { loginDto } from '@/models/logins/loginDto'
  import loginItem from '@/components/LoginItem.vue'
  import LoginItemDetail from '@/components/LoginItemDetail.vue';
  import MainLayout from '@/components/MainLayout.vue'
  import SideBar from '@/components/SideBar.vue';
  import TopBar from '@/components/TopBar.vue'
  import { GetAllLogins } from "@/controllers/LoginController"
import router from '@/router';
import NewLoginItem from '@/components/NewLoginItem.vue';

  if (localStorage.getItem("JWTSessionToken") == null) {
    router.push("/account/login")
  }
  const Logins = ref<loginDto[]>([])
  const indexCurrentFocusedLogin = ref<number>()
  const currentLogin = computed(() => {
    if (indexCurrentFocusedLogin.value == null) {
      return {} as loginDto
    }
    return Logins.value[indexCurrentFocusedLogin.value]
  })

  const isCreatingNewLogin = ref<boolean>(false);

  getLogins()
  
  async function getLogins() {
    try {
      const logins = await GetAllLogins({StartIndex: 0, MaxRecords: 10, SearchTerm: ""})
      if (logins == null) {
        return 
      }
      Logins.value = logins
      isCreatingNewLogin.value = false
    } catch (error) {
      localStorage.removeItem("JWTSessionToken")  
      router.push("account/login")
    }
  }
</script>

<template>
  <MainLayout>
    <template #navigation>
      <TopBar @create-new-item="isCreatingNewLogin = true"/>
    </template>

    <template #sidebar>
      <SideBar />
    </template>

    <template #items>
      <p v-if="Logins.length === 0">No logins</p>
      <ul v-else >
        <li v-for="login, index in Logins" :key="login.id"  @click="indexCurrentFocusedLogin = index">
          <loginItem  :login="login"/>
        </li>
      </ul>
    </template>

    <template #detail>
      <NewLoginItem v-if="isCreatingNewLogin" @created-login="getLogins" @on-close="isCreatingNewLogin = false"/>
      <LoginItemDetail v-else :login="currentLogin" @updated-login="getLogins"/>
    </template>

  </MainLayout>
</template>

<style scoped>
</style>
