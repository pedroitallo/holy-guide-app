import React, { useState, useEffect } from 'react';
import { ChatHistory } from '@/api/entities';
import { MessageCircle, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function MyChatsList() {
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadChatHistory();
        
        // Reload chat history every 30 seconds to check for new messages
        const interval = setInterval(loadChatHistory, 30000);
        
        return () => clearInterval(interval);
    }, []);

    const loadChatHistory = async () => {
        try {
            const history = await ChatHistory.list('-last_message_time');
            setChatHistory(history);
            console.log('Chat history loaded:', history);
        } catch (error) {
            console.error('Error loading chat history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.abs(now - date) / 36e5;
        
        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        }
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const markAsRead = async (chatId) => {
        try {
            await ChatHistory.update(chatId, { unread_count: 0 });
            loadChatHistory(); // Refresh the list
        } catch (error) {
            console.error('Error marking chat as read:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1,2,3].map(i => (
                    <div key={i} className="bg-gray-900/50 border border-white/10 rounded-2xl p-4 animate-pulse">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (chatHistory.length === 0) {
        return (
            <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">No conversations yet</h3>
                <p className="text-purple-200 mb-6">
                    Start your first spiritual conversation with one of our advisors.
                </p>
                <Link to={createPageUrl('chats')}>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors">
                        Find an Advisor
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {chatHistory.map((chat) => (
                <Link 
                    key={chat.id} 
                    to={createPageUrl(`chat?id=${chat.advisor_id}`)}
                    className="block"
                    onClick={() => chat.unread_count > 0 && markAsRead(chat.id)}
                >
                    <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 hover:bg-white/5 transition-colors duration-300 cosmic-glow">
                        <div className="flex items-start space-x-4">
                            <div className="relative flex-shrink-0">
                                <img 
                                    src={chat.advisor_avatar} 
                                    alt={chat.advisor_name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/30"
                                />
                                {/* Online indicator - simulate online status */}
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-white font-semibold truncate">{chat.advisor_name}</h3>
                                    <div className="flex items-center space-x-2">
                                        {chat.unread_count > 0 && (
                                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-bold">
                                                {chat.unread_count}
                                            </span>
                                        )}
                                        <span className="text-purple-300 text-xs">
                                            {chat.last_message_time ? formatTime(chat.last_message_time) : 'Now'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-purple-200 text-sm truncate">
                                    {chat.last_message || "New conversation started"}
                                </p>
                                {chat.conversation_data && chat.conversation_data.length > 0 && (
                                    <p className="text-purple-300 text-xs mt-1">
                                        {chat.conversation_data.length} messages
                                    </p>
                                )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-purple-300 flex-shrink-0" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}