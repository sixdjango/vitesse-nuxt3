import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { generateNuxtHooks } from './scripts/nuxtHooks'
import { env } from './env'
import { appDescription } from './constants/index'

const VITE_PORT = parseInt(process.env.VITE_PORT || '3000', 10)
export default defineNuxtConfig({
  srcDir: 'src/',
  devServer: {
    port: VITE_PORT,
  },
  runtimeConfig: {
    ...env.server.data,
    public: {
      ...env.client.data,
    },
  },
  modules: [
    'nuxt-lodash',
    'modules/motion',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxtjs/i18n',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-GB',
        file: 'en.yml',
      },
      {
        code: 'ch',
        file: 'ch.yml',
      },
    ],
    langDir: 'locales/',
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@motionone/vue',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
        ignore: ['**/*.ts'],
      },
    ],
  },
  vite: {
    plugins: [
      Components(
        {
          resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
        }),
    ],
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  routeRules: {
    [`${env.client.data.aiApiBase}/**`]: { proxy: env.server.data.proxyAIApiBase },
  },

  hooks: {
    ...generateNuxtHooks(),
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
})
