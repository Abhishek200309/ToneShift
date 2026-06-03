# ToneShift

A text rewriting tool that transforms any input into 20+ distinct voices and styles using large language models via the Groq API.

## Overview

ToneShift takes a piece of text and rewrites it in a chosen style — ranging from formal registers like Academic and Corporate, to character voices like Sherlock Holmes and Gordon Ramsay, to internet styles like Reddit and Gen-Z. The model and API key are configurable directly in the UI.

## Styles

**Tone / Register**
- Corporate, Passive-Aggressive, Motivational Bro, British Dry, Valley Girl, Therapist, TED Talk

**Famous Voices**
- Hemingway, Shakespeare, Sherlock Holmes, Socrates, Gordon Ramsay, Jesus, Devil

**Internet / Pop Culture**
- Gen-Z, LinkedIn, Reddit Thread, Amazon Review, Horoscope

**Formal / Educational**
- Academic, ELI5

**Other**
- Bollywood, Pirate, Yoda, Children's Book, Sports Commentator

## Tech Stack

- React
- Vite
- Groq API (OpenAI-compatible)
- Default model: Llama 3.3 70B

## Getting Started

### Prerequisites

- Node.js 18+
- A Groq API key from [console.groq.com](https://console.groq.com)

### Installation

```bash
git clone https://github.com/Abhishek200309/toneshift.git
cd toneshift
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### API Key

Paste your Groq API key into the key field at the top of the app. The key is held in memory only and is never stored or transmitted anywhere other than directly to the Groq API.

## Project Structure

```
src/
└── App.jsx       # Styles, system prompts, UI components
```

## Adding a New Style

Three additions are required in `App.jsx`:

**1. STYLES array** — defines the UI card
```js
{ id: "styleid", label: "Style Name", emoji: "X", desc: "Short description" }
```

**2. SYSTEM_PROMPTS object** — the instruction sent to the model
```js
styleid: "You are a ... rewriter. Rewrite the given text as ... Return only the rewritten text, nothing else."
```

**3. ACCENT object** — the hex color used when the card is selected
```js
styleid: "#123456"
```

## Available Models

Selectable from the UI dropdown:

- Llama 3.3 70B (default)
- Llama 3 70B
- Mixtral 8x7B
- Gemma 2 9B

## License

MIT
