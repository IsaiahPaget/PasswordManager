<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import BannerAlert from './components/BannerAlert.vue';
import { useBannerStore } from './stores/Banner';
import autoAnimate from '@formkit/auto-animate';
const { SetBannerFunction } = useBannerStore()
const isShowBanner = ref<boolean>(false)
const bannerMessage = ref<string>("")
const bannerExtendedClass = ref<string>("banner-success")
const bannerDurationMs = ref<number>(2000)

function ToggleShowBanner(message: string, extendedClass: string) {
  bannerMessage.value = message
  bannerExtendedClass.value = extendedClass
  isShowBanner.value = true

  setTimeout(() => {
    ToggleHideBanner()
  }, bannerDurationMs.value);
}
function ToggleHideBanner() {
  bannerMessage.value = ""
  isShowBanner.value = false
}
SetBannerFunction(ToggleShowBanner)
</script>

<template>
  <div class="banner-container">
    <BannerAlert v-if="isShowBanner" :extended-class="bannerExtendedClass" :message="bannerMessage"
      @on-close="ToggleHideBanner" />
  </div>
  <header>
    <div class="wrapper">
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/logindetail">login details</RouterLink>
        <RouterLink to="/account/login">login</RouterLink>
        <RouterLink to="/account/register">register</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.banner-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
