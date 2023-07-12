import { commonHttp } from '../../common/axios'
import { consola } from '../utils/consola'

export default defineEventHandler(async () => {
  const res = await commonHttp.get('https://api.github.com/users/antfu')
  // console.info('res.data:', res)

  consola.info('GLOBAL_NUXT_API_URL:', useRuntimeConfig().public.aiApiBase)
  return { res: res.data }
})
