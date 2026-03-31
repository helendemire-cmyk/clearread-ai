/**
 * Kelimelerin ilk ~%45'ini kalın gösterir; boşluk ve noktalama korunur.
 * @param {string} text
 */
export function renderBionicParts(text) {
  if (!text) return []

  const parts = text.split(/(\s+)/)
  return parts.map((part, i) => {
    if (/^\s+$/.test(part)) {
      return <span key={`s-${i}`}>{part}</span>
    }
    const boldLen = Math.max(1, Math.round(part.length * 0.45))
    const bold = part.slice(0, boldLen)
    const rest = part.slice(boldLen)
    return (
      <span key={`w-${i}`}>
        <strong>{bold}</strong>
        {rest}
      </span>
    )
  })
}
