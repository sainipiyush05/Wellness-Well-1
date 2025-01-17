import { motion } from "framer-motion";
import { FaRobot, FaUser } from "react-icons/fa";

interface ChatMessageProps {
  message: {
    text: string;
    isBot: boolean;
    timestamp: Date;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${message.isBot ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.isBot ? "bg-primary/10" : "bg-gray-700"
        }`}
      >
        {message.isBot ? (
          <FaRobot className="w-4 h-4 text-primary" />
        ) : (
          <FaUser className="w-4 h-4 text-gray-300" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.isBot ? "bg-surface-darker" : "bg-primary text-white ml-auto"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs text-gray-400 mt-1 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
