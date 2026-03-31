import dotenv from 'dotenv'
dotenv.config()

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { simplifyTextWithGemini } from './lib/simplifyGemini.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''

  return {
    plugins: [
      react(),
      {
        name: 'dev-api-simplify',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url?.split('?')[0]

            if (url !== '/api/simplify' || req.method !== 'POST') {
              next()
              return
            }

            const readBody = () =>
              new Promise((resolve, reject) => {
                const chunks = []
                req.on('data', (c) => chunks.push(c))
                req.on('end', () => {
                  resolve(Buffer.concat(chunks).toString('utf8'))
                })
                req.on('error', reject)
              })

            res.setHeader('Content-Type', 'application/json')

            try {
              const raw = await readBody()
              let body = {}

              if (raw) {
                try {
                  body = JSON.parse(raw)
                } catch {
                  res.statusCode = 400
                  res.end(JSON.stringify({ error: 'Invalid JSON body.' }))
                  return
                }
              }

              if (!geminiKey) {
                res.statusCode = 500
                res.end(
                  JSON.stringify({
                    error:
                      'Simplify is not configured on the server (missing API key).',
                  }),
                )
                return
              }

              const text = body?.text

              if (typeof text !== 'string' || !text.trim()) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Send a non-empty "text" field.' }))
                return
              }

              const simplified = await simplifyTextWithGemini(text, geminiKey)

              res.statusCode = 200
              res.end(JSON.stringify({ simplified }))
            } catch (error) {
              console.error('SIMPLIFY ERROR:', error)

              res.statusCode = 500
              res.end(
                JSON.stringify({
                  error: error?.message || String(error),
                }),
              )
            }
          })
        },
      },
    ],
  }
})