import { useState, useEffect } from "react";
const STYLES = [
  { id: "hemingway",   label: "Hemingway",       emoji: "✍️",  desc: "Short. Punchy. No fluff."       },
  { id: "genz",        label: "Gen-Z",            emoji: "💀",  desc: "no cap fr fr slay"              },
  { id: "shakespeare", label: "Shakespeare",      emoji: "🎭",  desc: "Hark! Poetic drama"             },
  { id: "corporate",   label: "Corporate",        emoji: "💼",  desc: "Per my last email"              },
  { id: "passive",     label: "Passive-Agg.",     emoji: "🙂",  desc: "As I mentioned before..."       },
  { id: "eli5",        label: "ELI5",             emoji: "🧒",  desc: "Explain Like I'm 5"             },
  { id: "linkedin",    label: "LinkedIn",         emoji: "🚀",  desc: "Excited to share this!"         },
  { id: "pirate",      label: "Pirate",           emoji: "🏴‍☠️", desc: "Arr, ye landlubber!"            },
  { id: "yoda",        label: "Yoda",             emoji: "🌿",  desc: "Speak inverted, you will"       },
  { id: "british",     label: "British Dry",      emoji: "🫖",  desc: "Frightfully understated"        },
  { id: "tedtalk",     label: "TED Talk",         emoji: "🎤",  desc: "What if I told you..."          },
  { id: "academic",    label: "Academic",         emoji: "📚",  desc: "As the literature suggests"     },
  { id: "caveman", label: "Caveman", emoji: "🦴", desc: "Ug. Me want food." },
  { id: "motibro",  label: "Motivational Bro", emoji: "💪", desc: "NO EXCUSES. LET'S GO." },
  { id: "ramsay",   label: "Gordon Ramsay",    emoji: "🍳", desc: "This is a disgrace." },
  { id: "therapist",label: "Therapist",        emoji: "🛋️", desc: "And how does that feel?" },
  { id: "jesus",    label: "Jesus",            emoji: "✝️", desc: "Bless you, my child." },
  { id: "devil",    label: "Devil",            emoji: "😈", desc: "Deliciously tempting." },
  { id: "sherlock",   label: "Sherlock Holmes",  emoji: "🔍", desc: "Elementary, my dear." },
  { id: "socrates",   label: "Socrates",         emoji: "🏛️", desc: "But what is truth, really?" },
  { id: "reddit",     label: "Reddit Thread",    emoji: "🤖", desc: "ETA: thanks for the gold" },
  { id: "amazon",     label: "Amazon Review",    emoji: "⭐", desc: "Verified purchase ramble" },
  { id: "horoscope",  label: "Horoscope",        emoji: "🔮", desc: "Vaguely mystical wisdom" },
  { id: "bollywood",  label: "Bollywood",        emoji: "🎬", desc: "Dramatic. Emotional. Rain." },
  { id: "childrens",  label: "Children's Book",  emoji: "📖", desc: "Rhyming moral at the end" },
  { id: "sportscaster", label: "Commentator",   emoji: "🎙️", desc: "And the crowd goes wild!" },
  { id: "valleygirl", label: "Valley Girl",      emoji: "💅", desc: "Oh my god, like, literally" },
];

const SYSTEM_PROMPTS = {
  hemingway:   "You are a Hemingway-style rewriter. Rewrite the given text in Ernest Hemingway's signature style: short, declarative sentences. Active voice only. No adverbs. No fluff. Concrete nouns. Sparse but powerful. Never explain emotion — show it through action and dialogue. Return only the rewritten text, nothing else.",
  genz:        "You are a Gen-Z rewriter. Rewrite the given text in Gen-Z internet slang: all lowercase, casual, use 'no cap', 'fr fr', 'lowkey', 'slay', 'it's giving', 'rent free', 'not me doing X', 'periodt', 'based', 'bussin', 'hits different'. Use emojis sparingly (💀 😭 ✨). Chaotic but charming energy. Return only the rewritten text, nothing else.",
  shakespeare: "You are a Shakespearean rewriter. Rewrite the given text in Early Modern English: use thee, thou, hath, dost, wherefore, hark, prithee. Make it theatrical and poetic with iambic rhythm where possible. Dramatic flourishes throughout. Return only the rewritten text, nothing else.",
  corporate:   "You are a corporate formal rewriter. Rewrite the given text in polished professional corporate language. Use passive voice, formal vocabulary, and phrases like 'regarding', 'per', 'going forward', 'leverage', 'synergy', 'circle back', 'actionable insights', 'stakeholder alignment'. Bureaucratic and inoffensive. Return only the rewritten text, nothing else.",
  passive:     "You are a passive-aggressive rewriter. Rewrite the given text in a tone that is outwardly polite but subtly cutting. Use 'as I mentioned', 'per my last message', 'just to clarify', 'not sure if you saw my previous note', 'happy to help :)', 'let me know if you need me to explain further'. The politeness is a weapon. Return only the rewritten text, nothing else.",
  eli5:        "You are an ELI5 rewriter. Rewrite the given text so a 5-year-old could understand it. Only simple words, short sentences, fun analogies comparing things to toys, food, or playground experiences. Warm, encouraging tone. Zero jargon. Return only the rewritten text, nothing else.",
  linkedin:    "You are a LinkedIn thought leader rewriter. Rewrite the given text as an over-the-top LinkedIn post by a self-styled visionary. Single-sentence paragraphs for IMPACT. Include 'I'm excited to share', 'This journey has taught me', 'Let that sink in.', humble-bragging, unsolicited life lessons, 2-3 hashtags, and emojis like 🚀🙏💡. End with a call to action. Return only the rewritten text, nothing else.",
  pirate:      "You are a pirate rewriter. Rewrite the given text as a swashbuckling pirate: use 'Arr', 'ye', 'me hearties', 'landlubber', 'Davy Jones', nautical metaphors, and dramatic flair. Keep the core meaning but make it epic. Return only the rewritten text, nothing else.",
  yoda:        "You are a Yoda-style rewriter. Rewrite the given text in Yoda's speech pattern: inverted sentence structure (Object-Subject-Verb), wise and ancient tone, cryptic phrasing, occasional 'Hmm' and 'Yes'. Return only the rewritten text, nothing else.",
  british:     "You are a British dry wit rewriter. Rewrite the given text in the style of understated British humor: understatement, irony, polite condescension, phrases like 'rather', 'quite', 'I suppose', 'frightfully', 'one might argue', 'how terribly unfortunate'. The humor lives in restraint. Return only the rewritten text, nothing else.",
  tedtalk:     "You are a TED Talk rewriter. Rewrite the given text as an inspiring TED Talk passage: compelling hook, 'What if I told you...', storytelling structure, a big idea thesis, punchy one-liners, an uplifting conclusion. Short sentences for impact. Return only the rewritten text, nothing else.",
  academic:    "You are an academic paper rewriter. Rewrite the given text in formal academic style: passive voice, hedging language ('it may be argued', 'evidence suggests'), implied citations like [Author, Year], complex sentence structures, nominalization, and a detached scholarly tone. Return only the rewritten text, nothing else.",
  caveman: "You are a caveman rewriter. Rewrite the given text as a caveman would say it. Use very short words, broken grammar, no articles or conjunctions, grunts like 'Ug' and 'Hrm', third-person self-reference. Keep the core meaning but make it primitive. Return only the rewritten text, nothing else.",
  motibro:   "You are a motivational bro rewriter. Rewrite the given text with extreme gym-bro motivational energy. Use CAPS for emphasis, 'NO EXCUSES', 'LET'S GO', 'GRIND', 'BEAST MODE', 'you vs you', 'no days off', 'discipline over motivation'. Aggressive, loud, intense. Return only the rewritten text, nothing else.",
  ramsay:    "You are Gordon Ramsay rewriting text as a brutal critique. Use cooking metaphors, call things 'RAW', 'disgusting', 'an absolute disgrace'. Be dramatic and harsh but occasionally give a backhanded compliment. Channel the Hell's Kitchen energy fully. Return only the rewritten text, nothing else.",
  therapist: "You are a therapist rewriter. Rewrite the given text in a calm, reflective, therapeutic tone. Use phrases like 'it sounds like you feel', 'I hear that', 'what I'm noticing is', 'let's unpack that', 'that must have been really difficult'. Validate everything. Gentle and non-judgmental. Return only the rewritten text, nothing else.",
  jesus:     "You are rewriting text as Jesus Christ would say it — calm, wise, full of compassion and parables. Use 'my child', 'verily I say unto thee', speak in gentle metaphors involving light, bread, water, sheep, and the kingdom of heaven. Forgiving and loving in tone. Return only the rewritten text, nothing else.",
  devil:     "You are rewriting text as the Devil — charming, seductive, and subtly manipulative. Make everything sound tempting and justify any wrongdoing with smooth, silver-tongued logic. Use dark metaphors, backhanded flattery, and a silky persuasive tone. Delightfully sinister. Return only the rewritten text, nothing else.",
  sherlock:    "You are Sherlock Holmes rewriting text. Use cold, razor-sharp logic and deductive reasoning. Be slightly condescending as if the reader is missing the obvious. Use phrases like 'Elementary', 'The evidence is clear', 'You fail to observe', 'Interesting'. Clinical, brilliant, and a little arrogant. Return only the rewritten text, nothing else.",
  socrates:    "You are Socrates rewriting text. Never make direct statements — instead rewrite everything as a series of probing questions that lead the reader to question their own assumptions. Use phrases like 'But is it not the case that...', 'And what do we mean by...', 'Can we truly say that...'. Philosophical and maddening. Return only the rewritten text, nothing else.",
  reddit:      "You are a Reddit thread rewriter. Rewrite the text as a Reddit post with comments. Include: an OP post, 2-3 top comments with upvotes like '↑ 4.2k', one unrelated tangent, one 'ETA: wow this blew up', and one comment that says 'underrated comment'. Add 'TL;DR' at the end. Return only the rewritten text, nothing else.",
  amazon:      "You are an Amazon review rewriter. Rewrite the given text as a rambling Amazon product review. Start with star rating like '4/5 stars'. Include an unrelated personal backstory about why you bought it, mention shipping, compare it to a product from 2009, go off on a tangent about your cousin, and end with 'would recommend to a friend'. Return only the rewritten text, nothing else.",
  horoscope:   "You are a horoscope rewriter. Rewrite the given text as a mystical horoscope reading. Make it vague enough to apply to anyone, reference celestial bodies like Mercury, Venus, and the moon, use phrases like 'the universe is aligning', 'trust the journey', 'a powerful shift is coming', 'someone from your past'. Mystical and deliberately ambiguous. Return only the rewritten text, nothing else.",
  bollywood:   "You are a Bollywood screenplay rewriter. Rewrite the given text with maximum drama and emotion — think slow-motion revelations, dramatic background music implied through text, tearful monologues, references to family honor, destiny, and undying love. Use poetic Hinglish phrases occasionally. Everything is felt deeply and expressed loudly. Return only the rewritten text, nothing else.",
  childrens:   "You are a children's book rewriter. Rewrite the given text as a cheerful children's picture book. Use simple rhyming couplets or very short sentences, repeat key words for rhythm, make everything sound like an adventure, and end with a gentle moral lesson. Warm, innocent, and whimsical. Return only the rewritten text, nothing else.",
  sportscaster:"You are a sports commentator rewriter. Rewrite the given text as live sports play-by-play commentary. Build tension, use exclamations like 'AND HE GOES FOR IT!', 'INCREDIBLE MOVE!', 'The crowd is on their feet!', refer to the reader as an athlete making bold moves. End with a post-match analysis. High energy throughout. Return only the rewritten text, nothing else.",
  valleygirl:  "You are a Valley Girl rewriter. Rewrite the given text in classic Valley Girl speak. Use 'like' every few words, 'oh my god', 'literally', 'totally', 'so basically', 'I can't even', 'that's so random', 'whatever', 'as if'. Upspeak implied throughout. Bubbly, ditzy, but secretly sharp. Return only the rewritten text, nothing else.",
};

const ACCENT = {
  hemingway: "#b45309", genz: "#7c3aed", shakespeare: "#be185d",
  corporate: "#1d4ed8", passive: "#065f46", eli5: "#c2410c",
  linkedin: "#0369a1", pirate: "#a16207", yoda: "#166534",
  british: "#9d174d",  tedtalk: "#b91c1c", academic: "#374151",
  caveman: "#92400e", motibro:   "#dc2626", ramsay:    "#ea580c",
  therapist: "#0891b2", jesus:     "#ca8a04", devil:     "#7f1d1d",
  sherlock:     "#1e3a5f", socrates:     "#78350f", reddit:       "#c2410c",
  amazon:       "#b45309", horoscope:    "#6d28d9", bollywood:    "#be185d",
  childrens:    "#0369a1", sportscaster: "#166534", valleygirl:   "#db2777",
};

const GROQ_MODELS = [
  { id: "llama-3.3-70b-versatile",   label: "Llama 3.3 70B"    },
  { id: "llama3-70b-8192",           label: "Llama 3 70B"      },
  { id: "mixtral-8x7b-32768",        label: "Mixtral 8x7B"     },
  { id: "gemma2-9b-it",              label: "Gemma 2 9B"       },
];

export default function ToneShift() {
  const [apiKey, setApiKey]     = useState("");
  const [showKey, setShowKey]   = useState(false);
  const [model, setModel]       = useState(GROQ_MODELS[0].id);
  const [input, setInput]       = useState("");
  const [selected, setSelected] = useState(null);
  const [output, setOutput]     = useState("");
  const [loading, setLoading]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const selectedStyle = STYLES.find((s) => s.id === selected);
  const accent = selected ? ACCENT[selected] : "#78716c";
  const canRun = input.trim().length > 0 && selected && !loading && apiKey.trim().length > 0;

  const handleRewrite = async () => {
    if (!canRun) return;
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 1000,
          messages: [
            { role: "system", content: SYSTEM_PROMPTS[selected] },
            { role: "user",   content: input },
          ],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.choices?.[0]?.message?.content || "";
      setOutput(text);
    } catch (e) {
      setError(e.message || "Something went wrong. Check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const s = {
    wrap: {
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      background: "#fafaf8",
      padding: "32px 28px 48px",
      boxSizing: "border-box",
    },
    header: { marginBottom: "24px" },
    title: {
      fontFamily: "'Instrument Serif', serif",
      fontSize: "32px",
      fontWeight: 400,
      color: "#1c1917",
      margin: "0 0 4px",
      letterSpacing: "-0.5px",
    },
    titleAccent: { color: accent, transition: "color 0.3s" },
    sub: { fontSize: "14px", color: "#78716c", margin: 0 },
    sectionLabel: {
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "0.08em",
      color: "#a8a29e",
      textTransform: "uppercase",
      marginBottom: "8px",
    },
    apiRow: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: "8px",
      marginBottom: "24px",
      alignItems: "start",
    },
    apiInputWrap: { position: "relative" },
    apiInput: {
      width: "100%",
      fontFamily: "'DM Mono', monospace",
      fontSize: "12px",
      padding: "9px 36px 9px 12px",
      boxSizing: "border-box",
      border: apiKey ? "1px solid #d6d3d1" : "1px solid #fca5a5",
      borderRadius: "8px",
      background: "#fff",
      color: "#1c1917",
      outline: "none",
    },
    eyeBtn: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#a8a29e",
      fontSize: "13px",
      padding: 0,
    },
    modelSelect: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13px",
      padding: "8px 12px",
      border: "1px solid #d6d3d1",
      borderRadius: "8px",
      background: "#fff",
      color: "#1c1917",
      cursor: "pointer",
      outline: "none",
      whiteSpace: "nowrap",
    },
    apiHint: {
      fontSize: "11px",
      color: apiKey ? "#a8a29e" : "#ef4444",
      marginTop: "4px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(118px, 1fr))",
      gap: "8px",
      marginBottom: "28px",
    },
    styleBtn: (id) => ({
      background: selected === id ? "#fff" : "#f5f5f3",
      border: selected === id ? `1.5px solid ${ACCENT[id]}` : "1px solid #e7e5e4",
      borderRadius: "10px",
      padding: "10px 10px 8px",
      cursor: "pointer",
      textAlign: "left",
      transition: "all 0.15s ease",
      outline: "none",
    }),
    styleEmoji: { fontSize: "20px", display: "block", marginBottom: "4px" },
    styleLabel: (id) => ({
      fontSize: "12px",
      fontWeight: 500,
      color: selected === id ? ACCENT[id] : "#1c1917",
      display: "block",
      marginBottom: "2px",
      transition: "color 0.15s",
    }),
    styleDesc: { fontSize: "10px", color: "#a8a29e", lineHeight: 1.3 },
    columns: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "16px",
    },
    panelLabel: {
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "0.08em",
      color: "#a8a29e",
      textTransform: "uppercase",
      marginBottom: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textarea: {
      width: "100%",
      height: "220px",
      resize: "none",
      fontFamily: "'DM Mono', monospace",
      fontSize: "13px",
      lineHeight: 1.7,
      padding: "14px",
      boxSizing: "border-box",
      border: "1px solid #e7e5e4",
      borderRadius: "12px",
      background: "#fff",
      color: "#1c1917",
      outline: "none",
    },
    outputBox: {
      height: "220px",
      borderRadius: "12px",
      border: selected ? `1px solid ${accent}22` : "1px solid #e7e5e4",
      background: selected ? `${accent}06` : "#f5f5f3",
      padding: "14px",
      fontFamily: "'DM Mono', monospace",
      fontSize: "13px",
      lineHeight: 1.7,
      color: "#1c1917",
      overflowY: "auto",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      transition: "border-color 0.3s, background 0.3s",
    },
    charCount: { fontSize: "11px", color: "#c4bfba", marginTop: "5px" },
    copyBtn: {
      background: "none",
      border: "none",
      cursor: output ? "pointer" : "default",
      fontSize: "11px",
      fontWeight: 500,
      color: copied ? "#16a34a" : "#a8a29e",
      padding: 0,
      display: "flex",
      alignItems: "center",
      gap: "4px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontFamily: "'DM Sans', sans-serif",
    },
    btnRow: { display: "flex", alignItems: "center", gap: "12px" },
    mainBtn: {
      padding: "11px 28px",
      fontSize: "14px",
      fontWeight: 500,
      borderRadius: "10px",
      border: "none",
      background: canRun ? accent : "#e7e5e4",
      color: canRun ? "#fff" : "#a8a29e",
      cursor: canRun ? "pointer" : "not-allowed",
      transition: "all 0.2s ease",
      fontFamily: "'DM Sans', sans-serif",
      letterSpacing: "0.01em",
    },
    hint: { fontSize: "13px", color: "#a8a29e" },
    errorMsg: { fontSize: "13px", color: "#b91c1c", marginTop: "6px" },
    outputPlaceholder: { color: "#c4bfba", fontStyle: "italic" },
    groqBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "11px",
      color: "#f97316",
      fontWeight: 500,
      background: "#fff7ed",
      border: "1px solid #fed7aa",
      borderRadius: "6px",
      padding: "3px 8px",
      marginLeft: "10px",
      verticalAlign: "middle",
    },
  };

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <h1 style={s.title}>
          Tone<span style={s.titleAccent}>Shift</span>
          <span style={s.groqBadge}>⚡ Groq</span>
        </h1>
        <p style={s.sub}>Pick a voice. Paste your text. Watch it transform.</p>
      </div>

      <div style={s.sectionLabel}>Groq API key + model</div>
      <div style={s.apiRow}>
        <div>
          <div style={s.apiInputWrap}>
            <input
              type={showKey ? "text" : "password"}
              style={s.apiInput}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              spellCheck={false}
            />
            <button style={s.eyeBtn} onClick={() => setShowKey(!showKey)}>
              {showKey ? "🙈" : "👁️"}
            </button>
          </div>
          <div style={s.apiHint}>
            {apiKey ? "Key saved in memory only — never stored." : "Paste your Groq API key to get started."}
          </div>
        </div>
        <select
          style={s.modelSelect}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {GROQ_MODELS.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>

      <div style={s.sectionLabel}>Choose a style</div>
      <div style={s.grid}>
        {STYLES.map((style) => (
          <button
            key={style.id}
            style={s.styleBtn(style.id)}
            onClick={() => setSelected(style.id)}
          >
            <span style={s.styleEmoji}>{style.emoji}</span>
            <span style={s.styleLabel(style.id)}>{style.label}</span>
            <span style={s.styleDesc}>{style.desc}</span>
          </button>
        ))}
      </div>

      <div style={s.sectionLabel}>Your text</div>
      <div style={s.columns}>
        <div>
          <div style={s.panelLabel}><span>Input</span></div>
          <textarea
            style={s.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type any text here..."
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleRewrite();
            }}
          />
          <div style={s.charCount}>{input.length} chars</div>
        </div>

        <div>
          <div style={s.panelLabel}>
            <span>
              {selectedStyle ? `${selectedStyle.emoji} ${selectedStyle.label}` : "Output"}
            </span>
            {output && (
              <button style={s.copyBtn} onClick={handleCopy}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            )}
          </div>
          <div style={s.outputBox}>
            {loading ? (
              <span style={s.outputPlaceholder}>Rewriting…</span>
            ) : output ? (
              output
            ) : (
              <span style={s.outputPlaceholder}>
                {selected
                  ? `Your text rewritten as ${selectedStyle?.label} will appear here.`
                  : "Select a style above, then click Rewrite."}
              </span>
            )}
          </div>
          <div style={s.charCount}>{output.length > 0 ? `${output.length} chars` : ""}</div>
        </div>
      </div>

      <div style={s.btnRow}>
        <button style={s.mainBtn} onClick={handleRewrite} disabled={!canRun}>
          {loading
            ? "Rewriting…"
            : selectedStyle
            ? `Rewrite as ${selectedStyle.label}`
            : "Rewrite"}
        </button>
        {!apiKey && <span style={s.hint}>← add your Groq key first</span>}
        {apiKey && !selected && <span style={s.hint}>← pick a style first</span>}
        {apiKey && selected && !input.trim() && <span style={s.hint}>← add some text</span>}
        {canRun && <span style={s.hint}>or ⌘ + Enter</span>}
      </div>
      {error && <div style={s.errorMsg}>⚠ {error}</div>}
    </div>
  );
}