/**
 * the hooks attribute of nuxt.config.ts
 */
import type { NuxtHooks, NuxtPage } from 'nuxt/schema'

export const generateNuxtHooks = (): Partial<NuxtHooks> => {
  return {
    'pages:extend': function (pages) {
    // add a route
      // pages.push({
      //   name: 'profile',
      //   path: '/profile',
      //   file: '~/extra-pages/profile.vue',
      // })

      // remove routes
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (page.file && pattern.test(page.file))
            pagesToRemove.push(page)

          else
            removePagesMatching(pattern, page.children)
        }
        for (const page of pagesToRemove)
          pages.splice(pages.indexOf(page), 1)
      }
      removePagesMatching(/\.ts$/, pages)
      removePagesMatching(/\*\/components\/*$/, pages)
      removePagesMatching(/\*\/logic\/*$/, pages)
    },
  }
}
