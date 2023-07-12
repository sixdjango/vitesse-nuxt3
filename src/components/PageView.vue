<script setup lang="ts">
const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(() => data.value?.startAt || 0)
</script>

<template>
  <div text-gray:80>
    <span font-500 text-gray>{{ data?.pageview }}</span>
    {{ $t('button.about') }}
    <span text-gray>{{ time }}</span>
    <div class="" />
  </div>
</template>
