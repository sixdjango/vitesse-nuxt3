<script setup>
consola.info('Default Layout')
</script>

<template>
  <main class="py-20 px-10 text-center">
    <Header />
    <slot />
    <Footer />
  </main>
</template>
