import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ChatMessage from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import SuggestedQuestions from "./chat/SuggestedQuestions";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  context: string;
  language: string;
  crop: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/farm-chat`;

const ChatBot = ({ context, language, crop }: Props) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useSpeechSynthesis(language);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const allMessages = [...messages, userMsg];

    const apiMessages = messages.length === 0
      ? [{ role: "user" as const, content: `Context about my farm:\n${context}` }, userMsg]
      : [...messages, userMsg];

    setMessages(allMessages);
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages, language }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({}));
        toast.error(err.error || "Failed to get response");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantText += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantText } : m);
                }
                return [...prev, { role: "assistant", content: assistantText }];
              });
            }
          } catch {
            // partial JSON
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Connection error. Please try again.");
    }
    setLoading(false);
  }, [messages, loading, context, language]);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-elevated hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[440px] md:h-[600px] z-50 bg-background rounded-2xl shadow-elevated border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground">KrishiMitra AI</h3>
                  <p className="text-xs text-muted-foreground">Your farming assistant</p>
                </div>
              </div>
              <button
                onClick={() => { setOpen(false); stop(); }}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                      <Bot className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="font-display font-bold text-lg text-foreground text-center">
                      How can I help you today?
                    </h2>
                    <p className="text-sm text-muted-foreground text-center max-w-[280px]">
                      Ask me anything about your crops, market prices, or farming advice 🌾
                    </p>
                  </motion.div>
                  <SuggestedQuestions onSelect={send} crop={crop} />
                </div>
              )}

              {messages.map((m, i) => (
                <ChatMessage
                  key={i}
                  role={m.role}
                  content={m.content}
                  onSpeak={m.role === "assistant" ? handleSpeak : undefined}
                  isSpeaking={isSpeaking}
                />
              ))}

              {loading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex gap-1.5 py-3">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <ChatInput onSend={send} loading={loading} language={language} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
