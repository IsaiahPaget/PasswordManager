<script setup lang="ts">
import TopBar from './TopBar.vue';
import { UserUsername } from '@/LocalStorage';
import router from '@/router';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
const username = ref(localStorage.getItem(UserUsername))
const SideBar = ref<HTMLElement>()
function Logout() {
  localStorage.clear()
  router.push("/account/login")
}
const showMenuBackButton = ref()
function OnOpenDrawer() {
  SideBar.value?.classList.add("show-sidebar")
}
function OnCloseDrawer() {
  SideBar.value?.classList.remove("show-sidebar")
}
</script>
<template>
  <div class="container">
    <div ref="SideBar" class="topbar-main">
      <div class="foo">
        {{ username }}
        <button @click="OnCloseDrawer" class="btn-transparent close-sidebar">
          <FontAwesomeIcon :icon="faX" />
        </button>
      </div>
      <button @click="Logout" class="btn-bg">
        Log out
      </button>
    </div>
    <div class="main">
      <TopBar :show-back-button="showMenuBackButton" @open-drawer="OnOpenDrawer" />
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style scoped>
.topbar-main {
  padding: var(--space-base);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(25deg, var(--color-bg-light) 20%, var(--color-bg-lighter) 100%);
  flex: 25%;
}

.close-sidebar {
  display: none;
}

.foo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  display: flex;
  height: 100%;
  position: relative;
}

.main {
  flex: 75%;
}

@media only screen and (max-width: 426px) {
  .topbar-main {
    position: absolute;
    transform: translateX(-1000px);
    height: calc(100% - var(--space-base) - var(--space-base));
    width: 66%;
  }

  .close-sidebar {
    display: block;
  }

  .show-sidebar {
    transform: translateX(0px);
  }
}
</style>
