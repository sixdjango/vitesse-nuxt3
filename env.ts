import path from 'path'
import fs from 'fs'
import { z } from 'zod'
import dotenv from 'dotenv'
import { version } from './package.json'

const envMode = process.env.NODE_ENV || 'development'
const envConfig = ['.env', '.env.local', `.env.${envMode}`, `.env.${envMode}.local`]

const nodeEnv = envConfig.reduce((prev, next) => {
  const filePath = path.resolve(process.cwd(), next)
  if (!fs.existsSync(filePath))
    return prev
  const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), next)))
  return { ...prev, ...env }
}, {} as Record<string, string>)

const server = z.object({
  apiSecret: z.string().optional(),
})

const client = z.object({
  envMode: z.enum(['development', 'test', 'production']),
  aiApiBase: z.string(),
  version: z.string(),
})

const processEnv = {
  envMode,
  version,
  aiApiBase: nodeEnv.VITE_PUBLIC_AI_API_BASE,
}

const parsedServer = server.safeParse(processEnv)
const parsedClient = client.safeParse(processEnv)

if (parsedServer.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsedServer.error.flatten().fieldErrors,
  )
  throw new Error('Invalid environment variables')
}

if (parsedClient.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsedClient.error.flatten().fieldErrors,
  )
  throw new Error('Invalid environment variables')
}

const env = { server: parsedServer, client: parsedClient }

export { env }
