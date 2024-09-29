import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const username = ref("")
  const email = ref("")

  function setUsername(value: string) {
    username.value = value
  }

  function setEmail(value: string) {
    email.value = value
  }

  return { username, email, setUsername, setEmail }
})