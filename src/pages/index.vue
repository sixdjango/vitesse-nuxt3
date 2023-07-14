<script setup lang="ts">
import type { FetchItemsFn } from '~/components/ui/hooks/usePaging'

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
const showMask = ref(false)

const beforeShow = async () => {
  await sleep(2000)
  consola.info('beforeShow')
}
</script>

<template>
  <div>
    <NuxtPage />
    <NButton @click="onFetch">
      fetch outside dat
    </NButton>
    <DcMotion
      :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
      @motion-start="() => consola.info('start')"
      @hover-start="() => consola.info('hover')"
    >
      dcmotion
    </DcMotion>
    <NuxtLink to="/jx1">
      jx1
    </NuxtLink>
    <!-- <DcInfinityScroll v-model:items="items" :fetch-items-fn="itemsFetch" :immediate="true" class="h-50vh" /> -->
    <DcDialog v-model:show="showMask">
      <div>hahaha</div>
    </DcDialog>

    <NButton @click="showMask = !showMask">
      show mask
    </NButton>
  </div>
</template>
