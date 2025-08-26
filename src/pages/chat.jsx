
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Sparkles, Coins, Plus, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/api/entities";
import { ChatHistory } from "@/api/entities"; // NEW IMPORT
import { InvokeLLM } from "@/api/integrations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { logCoinTransaction } from "@/api/functions";
import { motion, AnimatePresence } from "framer-motion";

const advisors = [
  {
    id: 1,
    name: "Madame Aura",
    specialty: "Love & Soulmate Expert",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b2e340460_image.png",
    description: "Specializing in twin flame connections and divine love",
    suggestedMessage: "I'm seeking guidance about love and finding my soulmate. Can you help me understand what's blocking my heart?"
  },
  {
    id: 2,
    name: "Master Celeste",
    specialty: "Spiritual Prosperity Guardian",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    description: "Abundance manifestation and financial spiritual guidance",
    suggestedMessage: "I want to attract more abundance in my life. What spiritual blocks are preventing my prosperity?"
  },
  {
    id: 3,
    name: "Madame Elera",
    specialty: "Intuition & Dreams",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    description: "Dream interpretation and intuitive awakening",
    suggestedMessage: "I've been having recurring dreams and want to strengthen my intuition. What do my dreams mean?"
  },
  {
    id: 4,
    name: "Master Chin",
    specialty: "Life Purpose Connection",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Soul mission discovery and spiritual calling",
    suggestedMessage: "I feel lost about my life purpose. Can you help me discover my soul's mission and spiritual calling?"
  },
  {
    id: 5,
    name: "Shaman Kael",
    specialty: "Spiritual Cleansing & Protection",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Energy clearing and spiritual protection rituals",
    suggestedMessage: "I feel heavy energetically and need spiritual cleansing. How can I protect myself from negative energies?"
  },
  {
    id: 6,
    name: "Luna",
    specialty: "Sacred Feminine Guide",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    description: "Divine feminine awakening and inner goddess work",
    suggestedMessage: "I want to connect with my divine feminine energy and awaken my inner goddess. Where should I start?"
  },
  {
    id: 7,
    name: "Astro Elian",
    specialty: "Astral Master & Horoscope",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    description: "Cosmic alignments and celestial guidance",
    suggestedMessage: "I'd like to understand my astrological chart and how the current planetary alignments affect my life."
  },
  {
    id: 8,
    name: "Celestino",
    specialty: "Tarot & Destiny Messages",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    description: "Ancient cards wisdom and fate interpretation",
    suggestedMessage: "I need a tarot reading about my current situation. What do the cards reveal about my destiny?"
  },
  {
    id: 9,
    name: "Seraphina",
    specialty: "Light Channel & Spiritual Elevation",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    description: "Divine light transmission and consciousness elevation",
    suggestedMessage: "I want to elevate my consciousness and connect with divine light. How can I raise my spiritual vibration?"
  },
  {
    id: 10,
    name: "Oracle Maya",
    specialty: "Ancient Wisdom & Sacred Knowledge",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    description: "Ancestral wisdom and sacred mysteries",
    suggestedMessage: "I seek ancient wisdom and sacred knowledge to guide my spiritual journey. What mysteries should I explore?"
  }
];

const TypingIndicator = ({ advisor }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-end space-x-2 justify-start"
  >
    <img src={advisor.avatar} alt={advisor.name} className="w-8 h-8 rounded-full object-cover" />
    <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
      <div className="flex items-center space-x-1">
        <span className="text-white text-sm mr-2">Typing...</span>
        <span className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  </motion.div>
);

export default function ChatPage() {
  const [currentAdvisor, setCurrentAdvisor] = useState(null);
  const [allChatsHistory, setAllChatsHistory] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInsufficientCreditsPopup, setShowInsufficientCreditsPopup] = useState(false);
  const messagesEndRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Function to save/update chat history in the database
  const saveToDatabase = async (advisorId, conversationHistory, lastMessageContent) => {
    try {
      // Fetch latest user data to ensure we have the most up-to-date user ID
      const currentUser = await User.me(); 
      const advisor = advisors.find(a => a.id === advisorId);
      
      if (!advisor || !currentUser) return;

      // Filter out 'suggestion' messages before saving, as they are UI-only and not part of the core conversation
      const cleanConversationHistory = conversationHistory.filter(msg => msg.role !== 'suggestion');

      const existingChats = await ChatHistory.filter({ user_id: currentUser.id, advisor_id: advisorId });
      
      const chatData = {
        user_id: currentUser.id, // Associate with the current user
        advisor_id: advisorId,
        advisor_name: advisor.name,
        advisor_avatar: advisor.avatar,
        last_message: lastMessageContent,
        last_message_time: new Date().toISOString(),
        conversation_data: cleanConversationHistory, // Save cleaned history
        unread_count: 0 // Reset unread count when user is actively chatting in this conversation
      };

      if (existingChats.length > 0) {
        await ChatHistory.update(existingChats[0].id, chatData);
      } else {
        await ChatHistory.create(chatData);
      }
      
      console.log('Chat history saved successfully');
    } catch (error) {
      console.error('Error saving chat to database:', error);
    }
  };

  // Effect for initial data loading, advisor selection, and chat history setup
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const advisorIdParam = queryParams.get("id");
    const initialQuestionParam = queryParams.get("question");

    const loadChatPageData = async () => {
      setIsLoading(true);

      // CRITICAL FIX: Handle missing or invalid advisor ID
      if (!advisorIdParam || advisorIdParam.trim() === '') {
        console.error("No advisor ID provided, redirecting to consultants page");
        navigate(createPageUrl("chats"));
        setIsLoading(false);
        return;
      }

      const parsedAdvisorId = parseInt(advisorIdParam);
      
      if (isNaN(parsedAdvisorId)) {
        console.error("Invalid advisor ID:", advisorIdParam);
        navigate(createPageUrl("chats"));
        setIsLoading(false);
        return;
      }

      const selectedAdvisor = advisors.find(a => a.id === parsedAdvisorId);

      if (!selectedAdvisor) {
        console.error("Advisor not found for ID:", parsedAdvisorId);
        const fallbackAdvisor = advisors[0];
        if (fallbackAdvisor) {
          const newPath = createPageUrl(`chat?id=${fallbackAdvisor.id}${initialQuestionParam ? `&question=${encodeURIComponent(initialQuestionParam)}` : ''}`);
          navigate(newPath, { replace: true });
          setIsLoading(false);
          return;
        } else {
            console.error("No advisors found in the list, cannot fallback. Redirecting to chats page.");
            navigate(createPageUrl("chats"));
            setIsLoading(false);
            return;
        }
      }

      setCurrentAdvisor(selectedAdvisor);

      let currentUser;
      try {
        currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Load chat history from database or initialize
      let loadedHistory = [];
      try {
        const existingChats = await ChatHistory.filter({ user_id: currentUser.id, advisor_id: selectedAdvisor.id });
        if (existingChats.length > 0) {
          loadedHistory = existingChats[0].conversation_data;
          // Reset unread count since user is now viewing this chat
          await ChatHistory.update(existingChats[0].id, { unread_count: 0 });
        } else {
          // No existing chat, create initial greeting and suggested message
          const initialGreeting = { role: "assistant", content: `Greetings, dear one. I am ${selectedAdvisor.name}, ready to illuminate your path. How may I assist you today?`, created_at: new Date().toISOString() };
          loadedHistory.push(initialGreeting);
          if (selectedAdvisor.suggestedMessage) {
            loadedHistory.push({ role: "suggestion", content: selectedAdvisor.suggestedMessage, created_at: new Date().toISOString() });
          }
          // Save this initial chat to the database immediately
          await saveToDatabase(selectedAdvisor.id, loadedHistory, initialGreeting.content);
        }
      } catch (error) {
        console.error("Error loading chat history from database:", error);
        // Fallback: If DB load fails, still create initial greeting
        const initialGreeting = { role: "assistant", content: `Greetings, dear one. I am ${selectedAdvisor.name}, ready to illuminate your path. How may I assist you today?`, created_at: new Date().toISOString() };
        loadedHistory.push(initialGreeting);
        if (selectedAdvisor.suggestedMessage) {
          loadedHistory.push({ role: "suggestion", content: selectedAdvisor.suggestedMessage, created_at: new Date().toISOString() });
        }
      }

      setAllChatsHistory(prevHistory => ({
        ...prevHistory,
        [selectedAdvisor.id]: loadedHistory
      }));

      // Set initial input message if provided in URL
      if (initialQuestionParam) {
        setInputMessage(decodeURIComponent(initialQuestionParam));
      }

      setIsLoading(false);
    };

    loadChatPageData();
  }, [location.search, navigate]);

  // Effect to synchronize `messages` state with `allChatsHistory` for the `currentAdvisor`
  useEffect(() => {
    if (currentAdvisor && allChatsHistory[currentAdvisor.id]) {
      setMessages(allChatsHistory[currentAdvisor.id]);
    } else if (currentAdvisor && !allChatsHistory[currentAdvisor.id]) {
      setMessages([]);
    } else {
      setMessages([]);
    }
  }, [currentAdvisor, allChatsHistory]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text = inputMessage) => {
    // Prevent sending if message is empty, already typing/sending, or no advisor selected
    if (!text.trim() || isTyping || !currentAdvisor) {
      return;
    }

    // Capture messages before user sends, filtered out suggestions
    const messagesBeforeUserSend = messages.filter(msg => msg.role !== 'suggestion');

    // Optimistically add user message to current view and history
    const userMessage = {
      role: "user",
      content: text.trim(),
      created_at: new Date().toISOString()
    };
    const updatedMessagesForCurrentAdvisor = [...messagesBeforeUserSend, userMessage];

    // Update global chat history immediately for current advisor
    setAllChatsHistory(prevHistory => ({
      ...prevHistory,
      [currentAdvisor.id]: updatedMessagesForCurrentAdvisor
    }));
    // Update local messages for immediate UI render
    setMessages(updatedMessagesForCurrentAdvisor);
    setInputMessage(""); // Clear input immediately
    setIsTyping(true); // Indicate that a process is running (sending/typing)

    let currentUser;
    let deductionSuccessful = false; // Flag to track if coin deduction was successful

    try {
      // 1. Fetch latest user data from DB for robust pre-check
      currentUser = await User.me();

      // 2. Check for sufficient credits BEFORE proceeding with deduction
      if ((currentUser.coins || 0) < 2) {
        setShowInsufficientCreditsPopup(true);
        // Revert optimistic message as no charge will occur
        setMessages(messagesBeforeUserSend);
        setAllChatsHistory(prevHistory => ({
          ...prevHistory,
          [currentAdvisor.id]: messagesBeforeUserSend
        }));
        setIsTyping(false);
        return; // Stop the function execution
      }

      // Clear insufficient credits message if it was shown before
      if (showInsufficientCreditsPopup) {
        setShowInsufficientCreditsPopup(false);
      }

      // 3. Deduct credits from DATABASE immediately for persistence
      const newCoinBalance = Math.max(0, currentUser.coins - 2);
      await User.updateMyUserData({ coins: newCoinBalance });
      setUser(prevUser => ({ ...prevUser, coins: newCoinBalance })); // Update local user state
      deductionSuccessful = true; // Mark deduction as successful

      // 4. Log transaction IMMEDIATELY after successful deduction
      await logCoinTransaction({
        type: 'spend',
        amount: -2,
        description: `Chat with ${currentAdvisor.name}`,
        service: 'chat',
        metadata: { advisorId: currentAdvisor.id, advisorName: currentAdvisor.name, messagePreview: userMessage.content.substring(0, 100) }
      });

      // 5. Save user message to database immediately after successful deduction
      // This ensures the user's message is saved even if the AI response fails
      await saveToDatabase(currentAdvisor.id, updatedMessagesForCurrentAdvisor, userMessage.content);


      // Simulate delay for assistant response (5-15 seconds) before LLM call
      const delay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
      await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the simulated delay

      // 6. Invoke LLM for AI response
      // Use the updated messages *including* the just-sent user message for context
      const conversationContext = updatedMessagesForCurrentAdvisor.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }));

      const prompt = `You are ${currentAdvisor.name}, a spiritual advisor specializing in ${currentAdvisor.specialty}. ${currentAdvisor.description}. 
Respond as this spiritual advisor would, staying in character. Be wise, compassionate, and provide meaningful guidance. Keep responses between 2-4 sentences, making them personal and insightful.

Current conversation context:
${conversationContext.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Respond as ${currentAdvisor.name} to the user's message: "${userMessage.content}"`;

      const result = await InvokeLLM({ prompt });
      const assistantResponseContent = typeof result === 'string' ? result : (result.response || "I sense a disturbance in the cosmic flow. Let's try reconnecting in a moment.");

      const assistantMessage = {
        role: 'assistant',
        content: assistantResponseContent,
        created_at: new Date().toISOString()
      };
      // Append assistant's response to the current messages
      const finalMessagesForCurrentAdvisor = [...updatedMessagesForCurrentAdvisor, assistantMessage];

      // Update global history with the assistant's message
      setAllChatsHistory(prevHistory => ({
        ...prevHistory,
        [currentAdvisor.id]: finalMessagesForCurrentAdvisor
      }));
      // Update displayed messages
      setMessages(finalMessagesForCurrentAdvisor);

      // 7. Save complete conversation with AI response to database
      await saveToDatabase(currentAdvisor.id, finalMessagesForCurrentAdvisor, assistantMessage.content);

    } catch (error) {
      console.error("Error during message sending process:", error);

      let finalMessagesAfterError = [...messagesBeforeUserSend]; // Base state: messages before user's message was optimistically added
      let chatErrorMessageContent = "It seems the cosmic connection is momentarily disrupted. Please try again soon.";

      // If deduction was successful, the user's message is already in updatedMessagesForCurrentAdvisor
      // We need to keep it and then add the error message.
      if (deductionSuccessful) {
        finalMessagesAfterError = [...updatedMessagesForCurrentAdvisor]; // Keep user's sent message
        chatErrorMessageContent += " If you were charged, your credits have been refunded.";
        try {
          const userToRefund = await User.me(); // Fetch latest balance before refunding
          const refundBalance = (userToRefund.coins || 0) + 2;
          await User.updateMyUserData({ coins: refundBalance });
          setUser(prevUser => ({ ...prevUser, coins: refundBalance })); // Update local state with refunded coins

          // Log the refund transaction
          await logCoinTransaction({
            type: "refund",
            amount: 2,
            description: `Refund for failed chat with ${currentAdvisor.name}`,
            service: "refund",
            metadata: { originalMessage: text.substring(0, 100), detailedError: error.message, advisorId: currentAdvisor.id, advisorName: currentAdvisor.name }
          });
          alert("Failed to send message. Your credits have been refunded.");
        } catch (refundError) {
          console.error("Failed to refund credits after an error:", refundError);
          // If refund also fails, display a more critical message
          chatErrorMessageContent = "It seems the cosmic connection is momentarily disrupted. We encountered an issue refunding your credits. Please contact support.";
          alert("A critical error occurred and we couldn't process the message or refund your credits. Please contact support.");
        }
      } else {
        // If deduction was NOT successful (e.g., initial User.me() failed or network error before deduction)
        // In this case, the optimistic user message should be removed from the display.
        setMessages(messagesBeforeUserSend); // Revert displayed messages to state before user's message
        setAllChatsHistory(prevHistory => ({
          ...prevHistory,
          [currentAdvisor.id]: messagesBeforeUserSend // Revert history
        }));
        // No refund needed as no deduction occurred
        chatErrorMessageContent = "There was an issue preparing your message. Please try again.";
      }

      const errorChatUserMessage = {
          role: 'assistant',
          content: chatErrorMessageContent,
          created_at: new Date().toISOString()
      };

      // Add the error message to the chat for the user to see
      const finalDisplayedMessages = [...finalMessagesAfterError, errorChatUserMessage];
      setAllChatsHistory(prevHistory => ({
          ...prevHistory,
          [currentAdvisor.id]: finalDisplayedMessages
      }));
      setMessages(finalDisplayedMessages);

    } finally {
      setIsTyping(false); // Always stop typing indicator
    }
  };

  // Auto-save conversation every time messages change, only if there's a current advisor and actual messages
  useEffect(() => {
    if (currentAdvisor && allChatsHistory[currentAdvisor.id] && allChatsHistory[currentAdvisor.id].length > 1) { // length > 1 because initial greeting is 1 message
      const currentConversation = allChatsHistory[currentAdvisor.id];
      const lastMessage = currentConversation[currentConversation.length - 1];
      // Ensure the last message is not a suggestion and has content before saving
      if (lastMessage && lastMessage.content && lastMessage.role !== 'suggestion') {
        saveToDatabase(currentAdvisor.id, currentConversation, lastMessage.content);
      }
    }
  }, [allChatsHistory, currentAdvisor]);

  if (isLoading || !currentAdvisor || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800">
        <Loader className="w-8 h-8 text-purple-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-white/10 bg-gray-900/50 backdrop-blur-lg z-10">
        <Link to={createPageUrl("chats")}>
          <Button variant="ghost" size="icon" className="text-purple-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        
        <div className="flex items-center space-x-3">
          <img
            src={currentAdvisor.avatar}
            alt={currentAdvisor.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-300/30"
          />
          <div className="text-center">
            <h1 className="text-white font-medium text-sm">{currentAdvisor.name}</h1>
            <p className="text-purple-200 text-xs">{currentAdvisor.specialty}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
          <Coins className="w-4 h-4 text-yellow-300" />
          <span className="text-white text-sm font-bold">{user.coins || 0}</span>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-md mx-auto">
          <AnimatePresence>
            {messages.map((msg, index) => {
              if (msg.role === 'suggestion') {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center my-4"
                  >
                    <button
                      onClick={() => handleSendMessage(msg.content)}
                      disabled={isTyping || (user.coins !== null && user.coins < 2)}
                      className="w-full bg-gray-900/90 backdrop-blur-lg border-2 border-white/20 rounded-2xl p-4 text-left text-white hover:bg-gray-800/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm leading-relaxed"
                    >
                      <Sparkles className="inline-block w-4 h-4 mr-2 text-purple-300" />
                      {msg.content}
                      <div className="flex justify-end mt-2">
                        <Send className="w-4 h-4 text-purple-300" />
                      </div>
                    </button>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-end space-x-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && <img src={currentAdvisor.avatar} alt={currentAdvisor.name} className="w-8 h-8 rounded-full object-cover" />}
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-900/50 text-purple-100 border border-white/10'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              );
            })}
            
            {isTyping && <TypingIndicator advisor={currentAdvisor} />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Message Input Area */}
      <footer className="relative p-4 bg-gray-900/50 backdrop-blur-lg border-t border-white/10">
        {/* Insufficient Credits Popup */}
        {showInsufficientCreditsPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -top-16 left-0 right-0 flex justify-center px-4"
          >
            <div className="max-w-md w-full flex items-center justify-between p-3 bg-red-600/90 rounded-lg text-white text-sm">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>You need 2 credits for this message.</span>
              </div>
              <Link to={createPageUrl("coins")}>
                <Button variant="outline" className="ml-4 text-white border-white hover:bg-white hover:text-red-600 h-8 px-3 text-xs">
                  Get More Credits <Plus className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Message Input */}
        <div className="max-w-md mx-auto flex items-center space-x-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question... (2 credits)"
            className="flex-1 bg-gray-800/50 border-white/10 text-white placeholder-purple-300"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
