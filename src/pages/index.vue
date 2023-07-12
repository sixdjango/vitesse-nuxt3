<script setup lang="ts">
import TestTable from './components/TestTable'
import type { FetchItemsFn } from '~/composables/usePaging'

const online = useOnline()

// consola.info('Default Layout')

const runtimeConfig = useRuntimeConfig()

const onFetch = async () => {
  const { data } = await useFetch('/api/open')
}

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

const ll = ref(0)

const itemsFetch: FetchItemsFn<number> = async () => {
  await sleep(1000)
  return {
    items: [1, 2, 3, 4, 5],
    total: 10,
    maxIndex: 10,
  }
}
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
    <TestTable />
    <InfinityScroll v-model:items="items" :fetch-items-fn="itemsFetch" :immediate="true" class="h-50vh" />
  </PageLayout>
</template>
