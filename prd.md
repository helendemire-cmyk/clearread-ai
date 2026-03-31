# PRD: ClearRead AI (MVP Version)

## 1. Product Vision

ClearRead AI aims to remove barriers to digital content for individuals with dyslexia and reading difficulties by combining visual formatting techniques and AI-powered text simplification into a single seamless reading experience.

---

## 2. Core Goal (MVP Scope)

Transform a user-provided complex text into a readable format within seconds by applying:

* Visual optimization (typography and layout)
* Optional AI-powered simplification (language structure)

---

## 3. User Flow (Core Experience)

1. The user pastes a block of text into the input area
2. The system automatically applies a dyslexia-friendly reading format:

   * Font adjustment
   * Bionic Reading
   * Improved spacing and contrast
3. The user can optionally click **"Simplify"** to:

   * Break complex sentences
   * Convert passive voice to active
   * Replace difficult words with simpler alternatives

---

## 4. Core Features (MVP Only)

### 4.1 Visual Reading Engine (Rule-Based - Code)

* **Dyslexia-Friendly Font**
  Automatically converts text into a readable font (e.g., OpenDyslexic or similar)

* **Bionic Reading**
  Algorithmically bolds the first 40–50% of each word to improve scanning

* **Predefined Reading Style**
  Applies:

  * Increased line spacing
  * Soft background color (beige/cream)
  * High contrast text

⚠️ No manual customization required in MVP

---

### 4.2 AI Simplification Engine (AI-Based)

* **Simplify Function**
  When triggered:

  * Splits long sentences
  * Simplifies structure
  * Replaces complex vocabulary
  * Preserves original meaning

---

## 5. Out of Scope (Excluded from MVP)

* ❌ Text summarization
* ❌ Tone/style rewriting
* ❌ File/PDF upload
* ❌ Text-to-speech
* ❌ User authentication
* ❌ Database/storage

---

## 6. UI Structure (Single Page Application)

### Single Screen: Reading Interface

* **Left Panel (Input / Original Text)**

  * User pastes original content

* **Right Panel (Output / ClearRead View)**

  * Displays visually optimized text
  * Updates after simplification

* **Controls**

  * Bionic Reading toggle (on/off)
  * “Simplify” button (AI trigger)

📌 No page transitions
📌 All interactions happen on a single screen

---

## 7. Technical Success Criteria

* Bionic Reading algorithm works consistently
* AI simplification preserves meaning
* Transformation occurs within ~2–3 seconds
* UI remains stable and responsive

---

## 8. Differentiation (Why This Product)

ClearRead AI is not just a text tool — it is a **reading experience layer**.

### Key Differences:

* **ChatGPT**
  → Generates text but does not improve readability visually

* **Grammarly**
  → Fixes grammar but does not address reading difficulty

* **Browser Reader Modes**
  → Generic formatting, not dyslexia-focused

### ClearRead Advantage:

* Combines:

  * Visual readability (font, spacing, Bionic Reading)
  * AI-based simplification
* Focuses on **how text is read**, not just what is written

---

## 9. Product Principle

This MVP is not a full platform.

It is a focused tool that:

* Solves one clear problem
* Demonstrates a working transformation
* Delivers immediate value within seconds

---

## PM Note

This scope is intentionally minimal.

Goal:
Build a stable, working product in 2–3 days that clearly demonstrates:

* Problem understanding
* Technical execution
* AI integration
* User impact

No feature expansion beyond this scope.
