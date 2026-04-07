import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import "./AIAssistant.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isPlaying?: boolean;
}

type ChatStatus = "idle" | "loading" | "streaming" | "error";

interface ChatState {
  messages: Message[];
  status: ChatStatus;
  error: string | null;
}

type ChatAction =
  | { type: "ADD_USER_MSG"; payload: Message }
  | { type: "ADD_ASSISTANT_MSG"; payload: Message }
  | { type: "APPEND_DELTA"; payload: { id: string; delta: string } }
  | { type: "SET_STATUS"; payload: ChatStatus }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_PLAYING"; payload: { id: string; isPlaying: boolean } };

const SYSTEM_PROMPT = `You are Shrey Jani's personal AI assistant embedded in his portfolio website.
Be concise, friendly, and professional. Only answer questions related to Shrey's skills, projects, experience, education, and career goals. Politely decline unrelated topics.

About Shrey Jani:
• Information Systems Engineering graduate from Sheridan College, Ontario, Canada.
• Passionate about building scalable, full-stack, cloud-native applications.

Skills & Technologies:
JavaScript, TypeScript, React, Angular, Tailwind CSS, Node.js, Spring Boot, REST APIs,
AWS, Azure, MySQL, PostgreSQL, NoSQL (MongoDB), Python, Swift.
Certifications: AWS Certified Cloud Developer (December 2025).

Work Experience:
1. Full-Stack Developer – Hackville (October 2025 – Present)
   • Developed features for Hackville's hackathon portal serving 400+ attendees.
   • Worked in an agile team with designers, organizers, and engineers.

2. Full-Stack Developer Intern – Kodmatrix (June 2025 – September 2023)
   • Built production features with Next.js, React, Node.js, and Supabase.
   • Reduced P95 API latency by 20% through benchmarking and optimisation.
   • Participated in code reviews for clean, maintainable code.

3. Full-Stack Developer Intern – Samskrita Bharati (September 2024 – December 2024)
   • Built interactive quiz web apps with React and Tailwind CSS.
   • Integrated UX features (audio, animations) with optimal performance.
   • Deployed using AWS-based hosting solutions.

Projects:
1. Robo-Speaker – Python text-to-speech app using the OS library.
   GitHub: https://github.com/Shrey-Jani/Python.git

2. iOS Calculator – SwiftUI MVVM calculator with arithmetic operations and continuous chaining.
   GitHub: https://github.com/Shrey-Jani/iOS-Calculator.git

3. Sugar Cubed Creations (Capstone) – Production-ready, mobile-first e-commerce site for a cookie business.
   Stack: Next.js (TypeScript), Supabase/Postgres, Prisma, Square payments.
   Live: https://sugar-cubed-creations.vercel.app
   GitHub: https://github.com/Yagna3903/sugar-cubed-creation.git

Contact & Socials:
• GitHub:   https://github.com/Shrey-Jani
• LinkedIn: https://www.linkedin.com/in/shrey-jani/'`;

const uid = (): string => Math.random().toString(36).slice(2, 9);

const INITIAL_MESSAGE: Message = {
  id: uid(),
  role: "assistant",
  content:
    "Hello! I'm Shrey Jani's personal AI assistant. How can I help you today?",
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_USER_MSG":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        status: "loading",
        error: null,
      };
    case "ADD_ASSISTANT_MSG":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        status: "streaming",
      };
    case "APPEND_DELTA":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.payload.id
            ? { ...m, content: m.content + action.payload.delta }
            : m,
        ),
      };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "SET_PLAYING":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.payload.id
            ? { ...m, isPlaying: action.payload.isPlaying }
            : { ...m, isPlaying: false },
        ),
      };
    default:
      return state;
  }
}

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon
      points="22 2 15 22 11 13 2 9 22 2"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const StopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" />
  </svg>
);

const AvatarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a5 5 0 1 1-10A5 5 0 0 1 12 2zm0 13c5.33 0 8 2.67 8 4v1H4v-1c0-1.33 2.67-4 8-4z" />
  </svg>
);

const TypingIndicator = () => (
  <div className="ai-msg ai-msg--assistant">
    <span className="ai-msg-role">Shrey's Assistant</span>
    <div className="ai-msg-bubble ai-typing">
      <span />
      <span />
      <span />
    </div>
  </div>
);

/**Memorized message bubble - only re-renders when content changes*/
const MessageBubble = React.memo(
  ({
    msg,
    onPlayAudio,
  }: {
    msg: Message;
    onPlayAudio: (id: string) => void;
  }) => (
    <div className={`ai-msg ai-msg--${msg.role}`}>
      <span className="ai-msg-role">
        {msg.role === "user" ? "You" : "Shrey's Assistant"}
      </span>
      <div
        className={`ai-msg-bubble ${msg.isPlaying ? "ai-msg-bubble--playing" : ""}`}
      >
        {msg.content}
        {msg.role === "assistant" && (
          <button
            className="ai-audio-btn"
            onClick={() => onPlayAudio(msg.id)}
            title={msg.isPlaying ? "Stop audio" : "Play audio response"}
            aria-label={
              msg.isPlaying ? "Stop audio response" : "Play audio response"
            }
          >
            {msg.isPlaying ? <StopIcon /> : <PlayIcon />}
          </button>
        )}
      </div>
    </div>
  ),
);
MessageBubble.displayName = "MessageBubble";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [input, setInput] = useState("");

  const [chatState, dispatch] = useReducer(chatReducer, {
    messages: [INITIAL_MESSAGE],
    status: "idle",
    error: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const speakingRef = useRef<string | null>(null);
  // Keep a ref to latest messages to avoid stale closures in sendMessage
  const messagesRef = useRef(chatState.messages);
  useEffect(() => {
    messagesRef.current = chatState.messages;
  }, [chatState.messages]);

  // ── Scroll: use RAF to throttle during streaming ──────────────────────────
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [chatState.messages, chatState.status]);

  // Hide notifications dot on first open
  useEffect(() => {
    if (isOpen) setShowDot(false);
  }, [isOpen]);

  // Auto-resize textarea
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      const ta = e.target;
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 100)}px`;
    },
    [],
  );

  // Send Message
  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (
      !trimmed ||
      chatState.status === "loading" ||
      chatState.status === "streaming"
    )
      return;

    const apikey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apikey) {
      dispatch({
        type: "SET_ERROR",
        payload: "API key not configured. set API Key in env file",
      });
      return;
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const userMsg: Message = { id: uid(), role: "user", content: trimmed };
    dispatch({ type: "ADD_USER_MSG", payload: userMsg });
    setInput("");

    //Cancel any in-flight request before starting a new one
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    // Build messages in OpenAI format (Groq is OpenAI-compatible)
    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messagesRef.current.map((m) => ({ role: m.role, content: m.content })),
      { role: userMsg.role, content: userMsg.content },
    ];

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: groqMessages,
            max_tokens: 300,
            temperature: 0.7,
            stream: true,
          }),
          signal: abortRef.current.signal,
        },
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
          (errData as any)?.error?.message || `API error ${response.status}`,
        );
      }

      // Register the assistant placeholder and switch to streaming
      const assistantMsgId = uid();
      dispatch({
        type: "ADD_ASSISTANT_MSG",
        payload: { id: assistantMsgId, role: "assistant", content: "" },
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value, { stream: true }).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break outer;
          try {
            // OpenAI-compatible SSE delta
            const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
            if (delta)
              dispatch({
                type: "APPEND_DELTA",
                payload: { id: assistantMsgId, delta },
              });
          } catch {}
        }
      }
      dispatch({ type: "SET_STATUS", payload: "idle" });
    } catch (err: any) {
      if (err.name === "AbortError") return;
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Something went wrong. Please try again.",
      });
    }
  }, [input, chatState.status]);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  // ── Audio Playback ─────────────────────────────────────────────────────────
  const playAudio = useCallback(
    (messageId: string) => {
      const msg = chatState.messages.find((m) => m.id === messageId);
      if (!msg || msg.role !== "assistant") return;

      const synth = window.speechSynthesis;

      // Stop any currently playing audio if clicking on a new message
      if (speakingRef.current && speakingRef.current !== messageId) {
        synth.cancel();
        dispatch({
          type: "SET_PLAYING",
          payload: { id: speakingRef.current, isPlaying: false },
        });
      }

      // If the same message is playing, stop it
      if (speakingRef.current === messageId) {
        synth.cancel();
        speakingRef.current = null;
        dispatch({
          type: "SET_PLAYING",
          payload: { id: messageId, isPlaying: false },
        });
        return;
      }

      // Start new playback
      const utterance = new SpeechSynthesisUtterance(msg.content);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        speakingRef.current = messageId;
        dispatch({
          type: "SET_PLAYING",
          payload: { id: messageId, isPlaying: true },
        });
      };

      utterance.onend = () => {
        if (speakingRef.current === messageId) {
          speakingRef.current = null;
          dispatch({
            type: "SET_PLAYING",
            payload: { id: messageId, isPlaying: false },
          });
        }
      };

      utterance.onerror = () => {
        if (speakingRef.current === messageId) {
          speakingRef.current = null;
          dispatch({
            type: "SET_PLAYING",
            payload: { id: messageId, isPlaying: false },
          });
        }
      };

      synth.speak(utterance);
    },
    [chatState.messages],
  );

  const isDisabled =
    chatState.status === "loading" || chatState.status === "streaming";

  return (
    <div className="ai-assistant-wrapper">
      {/* Avatar button */}
      <button
        className="ai-fab"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        title="Chat with Shrey's AI"
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/ai-avatar.png`}
            alt="AI Assistant"
          />
        )}
        {showDot && !isOpen && (
          <span className="ai-fab-dot" aria-hidden="true" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="ai-panel"
          role="dialog"
          aria-modal="true"
          aria-label="AI Assistant chat"
        >
          {/* Header */}
          <div className="ai-panel-header">
            <div className="ai-panel-header-avatar" aria-hidden="true">
              <img
                src={`${process.env.PUBLIC_URL}/ai-avatar.png`}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="ai-panel-header-info">
              <strong>Shrey's Assistant</strong>
              <span>Powered by LLaMA 3.3 (Groq)</span>
            </div>
            <button
              className="ai-panel-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div
            className="ai-messages"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {chatState.messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} onPlayAudio={playAudio} />
            ))}
            {chatState.status === "loading" && <TypingIndicator />}
            {chatState.status === "error" && chatState.error && (
              <div className="ai-error" role="alert">
                {chatState.error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="ai-input-area">
            <textarea
              ref={textareaRef}
              className="ai-input"
              rows={1}
              placeholder="Ask me about Shrey…"
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isDisabled}
              aria-label="Message input"
              aria-multiline="true"
            />
            <button
              className="ai-send"
              onClick={sendMessage}
              disabled={!input.trim() || isDisabled}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>

          <p className="ai-panel-footer">
            Ask about projects, skills, experience &amp; more
          </p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
