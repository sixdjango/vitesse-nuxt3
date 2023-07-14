<script setup lang="ts">
// import { appName } from '../constants'
import './styles/global.scss'

useHead({
  title: 'appName',
})

const color = useColorMode()

// 默认亮色主题
onMounted(() => {
  color.preference = 'light'
})
</script>

<template>
  <!-- <VitePwaManifest /> -->
  <NuxtLayout>
    <NConfigProvider inline-theme-disabled>
      <NMessageProvider>
        <NNotificationProvider>
          <NLoadingBarProvider>
            <NMessageProvider>
              <NDialogProvider>
                <NuxtPage />
              </NDialogProvider>
            </NMessageProvider>
          </NLoadingBarProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NConfigProvider>
  </NuxtLayout>
</template>

<style>
html {
  font-size: 16px;
}

body {
  font-size: 14px;
}

html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
