import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, ArrowLeft, User } from "lucide-react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [targetUser, setTargetUser] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Only scroll to bottom when a new message is added, not on initial load


  const fetchChatMessages = async () => {
    setLoading(true);
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          senderId: senderId?._id,
        };
      });
      setMessages(chatMessages);

      // Get target user info from first message or fetch separately
      if (chatMessages.length > 0) {
        const firstOtherMessage = chatMessages.find(
          (msg) => msg.senderId !== userId
        );
        if (firstOtherMessage) {
          setTargetUser({
            firstName: firstOtherMessage.firstName,
            lastName: firstOtherMessage.lastName,
          });
        }
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, senderId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-[75%] max-w-none mx-auto px-4 py-8 h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden h-full flex flex-col"
      >
        {/* Animated gradient border */}
        <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />

        {/* Header */}
        <div className="p-4 border-b border-primary/20 bg-base-300/50">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/connections")}
              className="btn btn-ghost btn-circle btn-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {targetUser
                    ? `${targetUser.firstName} ${targetUser.lastName}`
                    : "Chat"}
                </h2>
                <p className="text-xs text-base-content/60">
                  {messages.length} message{messages.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="flex gap-2 justify-center mb-4">
                  <span className="loading loading-dots loading-lg text-primary"></span>
                </div>
                <p className="text-base-content/60">Loading messages...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center">
                <div className="p-4 bg-base-300/50 rounded-full inline-block mb-4">
                  <MessageCircle className="h-12 w-12 text-base-content/30" />
                </div>
                <p className="text-base-content/60 mb-2">No messages yet</p>
                <p className="text-sm text-base-content/40">
                  Start the conversation!
                </p>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => {
                const isOwnMessage = user.firstName === msg.firstName;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${isOwnMessage ? "items-end" : "items-start"
                        } flex flex-col gap-1`}
                    >
                      <div className="flex items-center gap-2 px-2">
                        {!isOwnMessage && (
                          <User className="h-3 w-3 text-base-content/60" />
                        )}
                        <span className="text-xs text-base-content/60">
                          {msg.firstName} {msg.lastName}
                        </span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`px-4 py-3 rounded-2xl ${isOwnMessage
                          ? "bg-primary text-primary-content rounded-br-sm"
                          : "bg-base-300 text-base-content rounded-bl-sm"
                          } shadow-lg`}
                      >
                        <p className="text-sm break-words">{msg.text}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-primary/20 bg-base-300/50">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <motion.textarea
                ref={inputRef}
                whileFocus={{ scale: 1.01 }}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="textarea textarea-bordered w-full focus:textarea-primary transition-all duration-300 resize-none"
                rows="1"
                style={{
                  minHeight: "44px",
                  maxHeight: "120px",
                }}
                onInput={(e) => {
                  e.target.style.height = "44px";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="btn btn-primary gap-2"
            >
              <Send className="h-4 w-4" />
              Send
            </motion.button>
          </div>
          <p className="text-xs text-base-content/40 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </motion.div>

      {/* Animations */}
      <style jsx>{`
        .animate-energy-flow {
          animation: energy-flow 4s linear infinite;
          background-size: 200% 100%;
        }
        @keyframes energy-flow {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Chat;
