import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
  language: string;
}

const langSpeechMap: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
  te: "te-IN",
};

const ChatInput = ({ onSend, loading, language }: Props) => {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const speechSupported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;
    onSend(text);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = langSpeechMap[language] || "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div className="relative">
      <div className="flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-card focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
        {speechSupported && (
          <button
            onClick={toggleListening}
            className={`flex-shrink-0 p-2 rounded-xl transition-all ${
              listening
                ? "bg-destructive/10 text-destructive animate-pulse"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
            title={listening ? "Stop listening" : "Speak"}
          >
            {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        )}

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask about your crops, prices, weather..."
          rows={1}
          className="flex-1 bg-transparent text-foreground text-sm outline-none resize-none placeholder:text-muted-foreground min-h-[24px]"
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex-shrink-0 p-2"
            >
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </motion.div>
          ) : (
            <motion.button
              key="send"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex-shrink-0 p-2 rounded-xl gradient-primary text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {listening && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-destructive font-medium bg-destructive/10 px-3 py-1 rounded-full"
        >
          🎤 Listening...
        </motion.div>
      )}
    </div>
  );
};

export default ChatInput;
