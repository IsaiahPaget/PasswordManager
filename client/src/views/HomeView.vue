<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import type { loginDto } from '@/models/logins/loginDto'
import loginItem from '@/components/LoginItem.vue'
import MainLayout from '@/components/MainLayout.vue'
import { GetAllLogins } from "@/controllers/LoginController"
import router from '@/router';
import { JWTSessionToken } from '@/LocalStorage';
import LoginFilters from '@/components/LoginFilters.vue';
import type { Pagination } from '@/models/Pagination';
import PaginationComponent from '@/components/Pagination.vue';
import Loading from '@/components/Loading.vue';

if (localStorage.getItem("JWTSessionToken") == null) {
  router.push("/account/login")
}
const LoginsLoading = ref(true)
const Logins = ref<loginDto[]>([])
const RowCount = ref(0)
const pagination = ref<Pagination>({ StartIndex: 0, MaxRecords: 10, SearchTerm: "" });
const isCreatingNewLogin = ref<boolean>(false);
const pageNumber = ref(0)

getLogins()

async function getLogins() {
  try {
    LoginsLoading.value = true
    const logins = await GetAllLogins(pagination.value)
    LoginsLoading.value = false
    if (logins == null) {
      Logins.value = []
      return
    }
    Logins.value = logins.logins
    RowCount.value = logins.rowCount
    isCreatingNewLogin.value = false
  } catch (error) {
    localStorage.removeItem(JWTSessionToken)
    router.push("account/login")
  }
}

function OnSearchTermChange(searchTerm: string) {
  pagination.value.SearchTerm = searchTerm
  pagination.value.StartIndex = 0
  pageNumber.value = 0
  getLogins()
}
function OnPrevious() {
  pagination.value.StartIndex -= pagination.value.MaxRecords
  pageNumber.value -= 1
  getLogins()
}
function OnNext() {
  pagination.value.StartIndex += pagination.value.MaxRecords
  pageNumber.value += 1
  getLogins()
}

</script>

<template>
  <MainLayout>
    <template #main>
      <section class="main-list" ref="main-list">
        <LoginFilters @on-change="OnSearchTermChange" />
        <ul>
          <Loading v-if="LoginsLoading" />
          <div class="no-logins" v-else-if="Logins.length === 0">
            <span>No passwords</span>
          </div>
          <li v-else v-for="login in Logins" :key="login.id" @click="$router.push(`/${login.id}`)" class="fade-in">
            <loginItem :login="login" />
          </li>
        </ul>
        <div class="pagination-container">
          <PaginationComponent @on-previous="OnPrevious" @on-next="OnNext" :start-index="pagination.StartIndex"
            :max-records="pagination.MaxRecords" :row-count="RowCount" :page-number="pageNumber" />
        </div>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
  padding: var(--space-base);
  align-items: center;
  position: sticky;
  bottom: 0px;
  background: linear-gradient(to top, var(--color-bg) 75%, transparent);
}

.no-logins {
  padding: var(--space-base);
}

main {
  display: flex;
  height: 100%;
}

.main-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

ul {
  flex-grow: 1;
}


.content {
  /* display: flex; */
  /* flex-grow: 1; */
}

.item-list {
  flex: calc(3/12);
}

.item-detail {
  flex: calc(9/12);
}

@media only screen and (max-width: 320px) {}

@media only screen and (max-width: 375px) {}

@media only screen and (max-width: 425px) {}

@media only screen and (max-width: 768px) {}

@media only screen and (max-width: 1024px) {}

@media only screen and (max-width: 1440px) {}

@media only screen and (max-width: 2560px) {}
</style>
