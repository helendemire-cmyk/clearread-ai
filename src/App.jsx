import { useCallback, useId, useState } from 'react'
import { renderBionicParts } from './utils/bionicRead.jsx'
import './App.css'

export default function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [visualReading, setVisualReading] = useState(true)
  const [bionicReading, setBionicReading] = useState(true)
  const [simplifyNote, setSimplifyNote] = useState('')
  const [copyStatus, setCopyStatus] = useState('')

  const inputId = useId()
  const outputHeadingId = useId()

  const handleTransform = useCallback(() => {
    setOutputText(inputText)
    setSimplifyNote('')
  }, [inputText])

  const handleSimplify = useCallback(async () => {
    const text = inputText.trim()
    if (!text) {
      setSimplifyNote('Add some text on the left before simplifying.')
      return
    }
    setCopyStatus('')
    setSimplifyNote('Simplifying…')
    try {
      const response = await fetch('/api/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      let data = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }
      if (!response.ok) {
        setSimplifyNote(
          data.error ||
            'Simplify could not finish. You can still use Transform and reading options.',
        )
        return
      }
      if (typeof data.simplified === 'string' && data.simplified.trim()) {
        setOutputText(data.simplified.trim())
        setSimplifyNote('')
      } else {
        setSimplifyNote(
          'Simplify could not finish. You can still use Transform and reading options.',
        )
      }
    } catch {
      setSimplifyNote(
        'Unable to reach the server. Check your connection and try again.',
      )
    }
  }, [inputText])

  const handleCopy = useCallback(async () => {
    const text = outputText
    if (!text) {
      setCopyStatus('Nothing to copy.')
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus('Copied to clipboard.')
    } catch {
      setCopyStatus('Copy failed. Select text manually.')
    }
  }, [outputText])

  const handleClear = useCallback(() => {
    setInputText('')
    setOutputText('')
    setSimplifyNote('')
    setCopyStatus('')
  }, [])

  const outputVisualClass = visualReading ? 'output output--visual' : 'output'

  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">ClearRead AI</h1>
        <p className="layout__tagline">
          Paste text on the left, then preview a calmer layout on the right—optionally
          simplify with AI when you are ready.
        </p>
      </header>

      <div
        className="toolbar"
        role="group"
        aria-label="Reading and action controls"
      >
        <div className="toolbar__toggles">
          <label className="toggle">
            <input
              type="checkbox"
              className="toggle__input"
              checked={visualReading}
              onChange={(e) => setVisualReading(e.target.checked)}
            />
            <span className="toggle__label">Visual reading mode</span>
          </label>
          <label className="toggle">
            <input
              type="checkbox"
              className="toggle__input"
              checked={bionicReading}
              onChange={(e) => setBionicReading(e.target.checked)}
            />
            <span className="toggle__label">Bionic reading</span>
          </label>
        </div>

        <div className="toolbar__actions">
          <button type="button" className="btn btn--primary" onClick={handleTransform}>
            Transform
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleSimplify}>
            Simplify
          </button>
          <button type="button" className="btn btn--quiet" onClick={handleCopy}>
            Copy
          </button>
          <button type="button" className="btn btn--quiet" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {simplifyNote ? (
        <div className="banner banner--info" role="status" aria-live="polite">
          {simplifyNote}
        </div>
      ) : null}

      {copyStatus ? (
        <div className="banner banner--muted" role="status" aria-live="polite">
          {copyStatus}
        </div>
      ) : null}

      <div className="panels">
        <section className="panel" aria-labelledby={`${inputId}-heading`}>
          <h2 id={`${inputId}-heading`} className="panel__label">
            Original text
          </h2>
          <textarea
            id={inputId}
            className="panel__textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or type the text you want to read more easily…"
            spellCheck="true"
            rows={14}
            aria-label="Original text"
          />
        </section>

        <section className="panel" aria-labelledby={outputHeadingId}>
          <h2 id={outputHeadingId} className="panel__label">
            ClearRead output
          </h2>
          <div
            className={outputVisualClass}
            tabIndex={0}
            role="region"
            aria-label="Transformed reading view"
          >
            {outputText ? (
              bionicReading ? (
                <div className="output__inner">{renderBionicParts(outputText)}</div>
              ) : (
                <div className="output__inner output__inner--plain">{outputText}</div>
              )
            ) : (
              <div className="output__placeholder-wrap">
                <p className="output__placeholder-title">Nothing to show yet</p>
                <p className="output__placeholder">
                  Add text on the left, then press <strong>Transform</strong> to see
                  your ClearRead preview here. Use <strong>Simplify</strong> if you
                  want optional AI simplification.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
