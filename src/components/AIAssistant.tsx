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

const SYSTEM_PROMPT =
  "You are Shrey Jani's Personal AI Assistant embedded in his portfolio website.";
("Be concise, friendly, and professional. Only answer questions related to Shrey's skills, projects, and experience, education, and career goals. Politely decline unrelated topics.");
("Absout Shrey Jani:");
