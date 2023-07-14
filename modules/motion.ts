import { addComponent, addImports, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    // Usually  npm package name of your module
    name: '@nuxtjs/motion',
    // The key in `nuxt.config` that holds your module options
    configKey: 'sample',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options for your module
  defaults: {},
  hooks: {},
  async setup(moduleOptions, nuxt) {
    // -- Add your module logic here --

    addImports({
      from: 'motion',
      name: 'scroll',
      as: 'motionScroll',
    })

    addComponent({
      name: 'MotionOnePresence',
      export: 'Presence',
      filePath: '@motionone/vue',
    })

    addComponent({
      name: 'MotionOne',
      export: 'Motion',
      filePath: '@motionone/vue',
    })
  },
})
