import { GoogleGenerativeAI } from '@google/generative-ai'

const MODEL = 'gemini-2.0-flash'

const SYSTEM = `You help readers who find dense text hard to follow.
Rules:
- Split long sentences into shorter ones.
- Prefer simpler words; keep the same meaning.
- Do NOT summarize, shorten the topic, or change tone for style.
- Output only the simplified text — no title, quotes, or explanation.`

function stripCodeFences(text) {
  let t = text.trim()
  if (t.startsWith('```')) {
    t = t.replace(/^```[\w]*\n?/, '').replace(/\n?```\s*$/, '')
  }
  return t.trim()
}

/**
 * @param {string} text
 * @param {string} apiKey
 */
export async function simplifyTextWithGemini(text, apiKey) {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('missing_key')
  }
  const trimmed = text.trim()
  if (!trimmed) {
    throw new Error('empty_text')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: MODEL })
  const prompt = `${SYSTEM}\n\n---\n\n${trimmed}`
  const result = await model.generateContent(prompt)
  const out = result.response.text()
  return stripCodeFences(out)
}
