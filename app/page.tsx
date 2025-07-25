"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useChat } from "./hooks/useChat";
import { useUI } from "./hooks/useUI";
import { useNavigation } from "./hooks/useNavigation";
import Header from "./components/Header";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatMessageComponent from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import EnvDebug from "./components/EnvDebug";
import HelpMenu from "./components/HelpMenu";
import ChatStateIndicator from "./components/ChatStateIndicator";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [forceShowChat, setForceShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if we should force show chat view on mount
  useEffect(() => {
    const shouldForceChat = sessionStorage.getItem('weteka-force-chat-view') === 'true';
    if (shouldForceChat) {
      setForceShowChat(true);
      sessionStorage.removeItem('weteka-force-chat-view');
    }
  }, []);

  const {
    conversation,
    isLoading,
    sendMessage,
    updateMessage,
  } = useChat();

  const { navigateWithCache } = useNavigation();

  const {
    editingMessageIndex,
    editedContent,
    startEditing,
    saveEditedMessage,
    cancelEditing,
    copyToClipboard,
    shareToMessenger,
    setEditedContent,
  } = useUI();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentInput = inputValue;
    setInputValue("");
    await sendMessage(currentInput);
  };


  const handleSaveEditedMessage = () => {
    const result = saveEditedMessage();
    if (result.index !== null) {
      updateMessage(result.index, result.content);
    }
    cancelEditing();
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <EnvDebug />
      {/* Paper texture background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0),
          linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%)
        `,
        backgroundSize: '20px 20px'
      }}></div>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Simple branding header for chat page */}
        {(conversation.length > 0 || forceShowChat) && (
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-2 sm:px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <Image
                      src="/weteka-logo.png"
                      width={16}
                      height={16}
                      alt="weteka-logo"
                      className="w-4 h-4 invert"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Weteka AI</span>
                </div>
                <button
                  onClick={() => navigateWithCache('/about', true)}
                  className="text-xs text-gray-600 hover:text-blue-600 transition-colors px-3 py-1 rounded-md hover:bg-gray-50"
                >
                  អំពី
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome message when no conversation */}
        {conversation.length === 0 && !forceShowChat && (
          <WelcomeScreen onSelectPrompt={setInputValue} />
        )}

        {/* Chat Messages */}
        {(conversation.length > 0 || forceShowChat) && (
          <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 sm:py-8">
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-8">
              {conversation.length === 0 && forceShowChat && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-sm">
                    ការសន្ទនារបស់អ្នកបានបន្តពីមុន...
                  </div>
                </div>
              )}
              {conversation.map((message, index) => (
                <ChatMessageComponent
                  key={index}
                  message={message}
                  index={index}
                  isEditing={editingMessageIndex === index}
                  editedContent={editedContent}
                  onStartEditing={startEditing}
                  onSaveEdit={handleSaveEditedMessage}
                  onCancelEdit={cancelEditing}
                  onContentChange={setEditedContent}
                  onCopy={copyToClipboard}
                  onShare={shareToMessenger}
                />
              ))}
              
              {/* Loading Animation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 sm:space-x-3 w-full">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Image
                        src="/weteka-logo.png"
                        width={20}
                        height={20}
                        alt="weteka-logo"
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="text-xs text-gray-500 px-1">Weteka AI</div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-gray-500">កំពុងគិត...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to anchor scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <ChatInput
          inputValue={inputValue}
          isLoading={isLoading}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
        />

        {/* Help Menu */}
        <HelpMenu />
        
        {/* Chat State Indicator */}
        <ChatStateIndicator />
      </div>
    </div>
  );
};

export default App;