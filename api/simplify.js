import { simplifyTextWithGemini } from '../lib/simplifyGemini.js'

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body
  }
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data)
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(body)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    sendJson(res, 500, {
      error: 'Simplify is not configured on the server (missing API key).',
    })
    return
  }

  try {
    const body = await readJsonBody(req)
    const text = body?.text
    if (typeof text !== 'string' || !text.trim()) {
      sendJson(res, 400, { error: 'Send a non-empty "text" field.' })
      return
    }
    const simplified = await simplifyTextWithGemini(text, apiKey)
    sendJson(res, 200, { simplified })
  } catch (err) {
    const code = err?.message
    if (code === 'empty_text') {
      sendJson(res, 400, { error: 'Text is empty.' })
      return
    }
    sendJson(res, 500, {
      error:
        'Simplify could not finish. You can still use Transform and reading options.',
    })
  }
}
