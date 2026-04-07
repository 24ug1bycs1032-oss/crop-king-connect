import { Bot, User, Volume2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

interface Props {
  role: "user" | "assistant";
  content: string;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

const ChatMessage = ({ role, content, onSpeak, isSpeaking }: Props) => {
  if (role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 justify-end"
      >
        <div className="max-w-[75%] bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-br-md text-sm leading-relaxed">
          {content}
        </div>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="prose prose-sm max-w-none text-foreground [&_p]:my-1 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_a]:text-primary">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        {onSpeak && content && (
          <button
            onClick={() => onSpeak(content)}
            className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${
              isSpeaking ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            {isSpeaking ? "Speaking..." : "Listen"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
