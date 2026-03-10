import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import "./AIAssisstant.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
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
  | { type: "SET_ERROR"; payload: string };

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
    default:
      return state;
  }
}
