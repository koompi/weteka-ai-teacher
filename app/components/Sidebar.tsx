"use client";

import React from "react";
import Image from "next/image";
import { Plus, MessageSquare, X } from "lucide-react";
import { ChatHistory } from "../types";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  chatHistories: ChatHistory[];
  currentChatId: string | null;
  onClose: () => void;
  onCreateNewChat: () => void;
  onSwitchToChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isMobile,
  chatHistories,
  currentChatId,
  onClose,
  onCreateNewChat,
  onSwitchToChat,
}) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed' : 'relative'} 
        ${isOpen ? (isMobile ? 'w-80' : 'w-80') : 'w-0'} 
        ${isMobile ? 'z-50 h-full' : ''} 
        transition-all duration-300 ease-in-out
        border-r border-gray-200 bg-white shadow-lg
        flex flex-col overflow-hidden
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/weteka-logo.png"
                width={24}
                height={24}
                alt="weteka-logo"
                className="w-6 h-6"
              />
              <span className="font-semibold text-gray-900 text-sm">Weteka AI</span>
            </div>
            {isMobile && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={onCreateNewChat}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {chatHistories.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No conversations yet
            </div>
          ) : (
            chatHistories.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSwitchToChat(chat.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 group hover:shadow-sm ${
                  currentChatId === chat.id
                    ? 'bg-blue-50 border border-blue-200 shadow-sm'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-lg ${
                    currentChatId === chat.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}>
                    <MessageSquare className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate mb-1">
                      {chat.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {chat.updatedAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;