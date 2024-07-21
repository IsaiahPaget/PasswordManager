<script setup lang="ts">
  import LoginForm from '@/components/LoginForm.vue'
  import { computed, ref, watch } from 'vue';
  import { DeleteLogin, UpdateLogin } from '@/controllers/LoginController';
  import type { UpdateLoginRequest } from '@/models/logins/UpdateLoginRequest';
  import type { loginDto } from '@/models/logins/loginDto';
  import { nullDateValue } from '@/DateValues';
  const emitsUpdatedLogin = "updatedLogin"
  const emitsDeleteLogin = "deletedLogin"
  const showPassword = ref<boolean>(false)
  const isEditing = ref(false)

  const props = defineProps<{ login: loginDto }>()
  const emit = defineEmits([emitsUpdatedLogin, emitsDeleteLogin])

  const createdOn = computed(() => {
    const date = new Date(props.login.createdOn)
    return date.toLocaleDateString()
  })
  const updatedOn = computed(() => {
    if (Date.parse(props.login.updatedOn) === nullDateValue) {
      return "N/A"
    }
    const date = new Date(props.login.updatedOn)
    return date.toLocaleDateString()
  })

  // props changed
  watch(props, () => {
    showPassword.value = false
  })

  function ToggleShowPassword() {
    showPassword.value = !showPassword.value
  }
  async function HandleDeleteLogin() {
    const result = await DeleteLogin(props.login.id)
    if (result == null) {
      window.alert("failed to delete login")
      return null
    }
    props.login.id = 0 // this is for hiding the old data
    emit(emitsDeleteLogin)
    window.alert("successfully delete login")

  }
  async function HandleSubmit(loginInputs: UpdateLoginRequest) {
    loginInputs.id = props.login.id
    const updatedLogin = await UpdateLogin(loginInputs)
    if (updatedLogin == null) {
      window.alert("failed to update login")
      return null
    }
    isEditing.value = false
    emit(emitsUpdatedLogin)
    window.alert("successfully updated login")
  }
</script>

<template>
  <section v-if="isEditing">
    <LoginForm :login="props.login" @on-submit="HandleSubmit"/>
    <button @click="isEditing = !isEditing">Close</button>
  </section>
  <section v-else>
    <div v-if="login.id > 0" class="login-item">
      <div class="name">
        <div>
          <h1>
            {{ login.name }}
          </h1>
          <p class="url">
            {{ login.url }}
          </p>
        </div>
        <button @click="isEditing = !isEditing">Edit</button>
      </div>
      <p class="box">
        <span>{{ login.username }}</span>
      </p>
      <p class="box">
      <div v-if="showPassword" class="justify-content-space-between">
        <span>{{ login.password }}</span>
        <a @click="ToggleShowPassword" class="password-toggle-button">hide</a>
      </div>
      <div v-else class="justify-content-space-between">
        <span>******</span>
        <a @click="ToggleShowPassword" class="password-toggle-button">view</a>
      </div>
      </p>
      <p>
        {{ login.notes }}
      </p>
      <p>
        Created On: <span class="date-value">{{ createdOn }}</span>
      </p>
      <p>
        Updated On: <span class="date-value">{{ updatedOn }}</span>
      </p>
      <div >
        <button class="btn-red" @click="HandleDeleteLogin">Delete</button>
      </div>
    </div>

  </section>
</template>

<style scoped>
section {
  padding: var(--space-base);
}
.login-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-base);
}

.name {
    border-bottom: var(--border-width) solid var(--color-green);
    padding-bottom: var(--space-base);
    display: flex;
    justify-content: space-between;
}

.url {
  color: var(--color-text-darkest);
}
.password-toggle-button {
  color: var(--color-text-darkest);
}

.box {
  border: var(--border-width) solid var(--color-blue) ;
  border-radius: var(--border-radius);
  padding: var(--space-base);
}

.date-value {
  color: var(--color-text-darkest);
}
</style>