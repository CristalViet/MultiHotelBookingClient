'use client';

import { useState } from 'react';
import { 
  Search, Send, Phone, Video, MoreVertical, 
  Paperclip, Smile, Star, CheckCheck, Check
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  isRead: boolean;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  guestName: string;
  guestAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  bookingId?: string;
  rating?: number;
}

export default function MessagesComponent() {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      guestName: 'Alice Johnson',
      guestAvatar: '/api/placeholder/40/40',
      lastMessage: 'Hi Alice, we can accommodate a late check out for Room 305!',
      lastMessageTime: '09:15 AM',
      unreadCount: 0,
      isOnline: true,
      bookingId: 'LG-B00123',
      rating: 5
    },
    {
      id: '2', 
      guestName: 'Michael Brown',
      guestAvatar: '/api/placeholder/40/40',
      lastMessage: 'The air conditioning in my room isn\'t working...',
      lastMessageTime: '08:45 AM',
      unreadCount: 2,
      isOnline: false,
      bookingId: 'LG-B00124'
    },
    {
      id: '3',
      guestName: 'Emily Davis',
      guestAvatar: '/api/placeholder/40/40',
      lastMessage: 'Thank you for confirming my airport pickup. See you at 6pm!',
      lastMessageTime: '07:30 AM',
      unreadCount: 0,
      isOnline: true,
      bookingId: 'LG-B00125'
    },
    {
      id: '4',
      guestName: 'John Doe',
      guestAvatar: '/api/placeholder/40/40',
      lastMessage: 'I need some extra towels and pillows for Room 201.',
      lastMessageTime: 'Yesterday',
      unreadCount: 1,
      isOnline: false,
      bookingId: 'LG-B00126'
    },
    {
      id: '5',
      guestName: 'Jane Smith',
      guestAvatar: '/api/placeholder/40/40',
      lastMessage: 'Could you please help me book a taxi to the airport?',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
      bookingId: 'LG-B00127'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Alice Johnson',
      content: 'Hi there! I have a question about my Room 305.',
      timestamp: '09:12 AM',
      type: 'text',
      isRead: true,
      isOwn: false
    },
    {
      id: '2',
      senderId: 'staff',
      senderName: 'Hotel Staff',
      content: 'Hello Alice! I\'d be happy to help. What can I assist you with regarding Room 305?',
      timestamp: '09:13 AM',
      type: 'text',
      isRead: true,
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Alice Johnson',
      content: 'Can I request a late check out for Room 305? I have a late flight.',
      timestamp: '09:14 AM',
      type: 'text',
      isRead: true,
      isOwn: false
    },
    {
      id: '4',
      senderId: 'staff',
      senderName: 'Hotel Staff',
      content: 'Hi Alice, we can accommodate a late check out for Room 305!',
      timestamp: '09:15 AM',
      type: 'text',
      isRead: false,
      isOwn: true
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.guestName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-12rem)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex h-full">
        
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search name, chat, etc"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                  selectedConversation === conversation.id ? 'bg-lime-50 border-r-2 border-r-lime-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={conversation.guestAvatar}
                      alt={conversation.guestName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.guestName}</h3>
                      <div className="flex items-center gap-2">
                        {conversation.rating && renderStars(conversation.rating)}
                        <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                    
                    <div className="flex items-center justify-between">
                      {conversation.bookingId && (
                        <span className="text-xs text-gray-500">Booking: {conversation.bookingId}</span>
                      )}
                      {conversation.unreadCount > 0 && (
                        <span className="bg-lime-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activeConversation.guestAvatar}
                      alt={activeConversation.guestName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {activeConversation.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{activeConversation.guestName}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${
                        activeConversation.isOnline ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {activeConversation.isOnline ? 'Online' : 'Offline'}
                      </span>
                      {activeConversation.bookingId && (
                        <span className="text-sm text-gray-500">• {activeConversation.bookingId}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isOwn 
                      ? 'bg-lime-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-between gap-2 mt-1 ${
                      message.isOwn ? 'text-lime-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{message.timestamp}</span>
                      {message.isOwn && (
                        <div className="flex items-center">
                          {message.isRead ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-end gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-lime-500 resize-none"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 bg-lime-500 text-white rounded-xl hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a guest conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 