<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

const color = useColorMode()

// 默认亮色主题
color.preference = 'light'
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
  font-size: 1px;
}

body {
  font-size: 14rem;
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
