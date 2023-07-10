<script setup lang="ts">
const online = useOnline()

// consola.info('Default Layout')

const runtimeConfig = useRuntimeConfig()

const onFetch = async () => {
  const { data } = await useFetch('/api/open')
}

consola.log(runtimeConfig.public.envMode)
const ll = ref(0)
</script>

<template>
  <PageLayout>
    <Logos mb-60 mt-100 class="mt-0 flex " />
    <!-- <Suspense>
      <ClientOnly> -->
    <PageView />
    <MotionOne :initial="{ opacity: 0 }" :in-view="{ opacity: 1 }">
      dd {{ ll }}
    </MotionOne>
    <MotionScroll message="addd" />
    <Counter />
    <div>
      {{ $t('button.about') }}
    </div>
    <!-- <Child /> -->
    <NewChild />
    <MotionTest />
    <NButton @click="onFetch">
      fetch outside dat
    </NButton>
    <div class="h-300">
      c
    </div>
    <ScrollSwiper />
    <GsapAnimation />
    <!-- </ClientOnly>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense> -->
    <NuxtLink to="/jx1">
      jx1
    </NuxtLink>
    <InputEntry />
  </PageLayout>
</template>
