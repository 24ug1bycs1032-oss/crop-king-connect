import { useState, useCallback, useRef } from "react";

const langVoiceMap: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
  te: "te-IN",
};

export const useSpeechSynthesis = (language: string) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Strip markdown
    const clean = text
      .replace(/[#*_`~\[\]()>]/g, "")
      .replace(/\n{2,}/g, ". ")
      .replace(/\n/g, " ");

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = langVoiceMap[language] || "en-IN";
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [language]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
};
