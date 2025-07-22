"use client";

import React from "react";
import Image from "next/image";
import { Copy, Share2, Edit } from "lucide-react";
import { ChatMessage as ChatMessageType } from "../types";

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
  isEditing: boolean;
  editedContent: string;
  onStartEditing: (index: number, content: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onContentChange: (value: string) => void;
  onCopy: (content: string) => void;
  onShare: (content: string) => void;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({
  message,
  index,
  isEditing,
  editedContent,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  onContentChange,
  onCopy,
  onShare,
}) => {

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 sm:space-x-3 w-full ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {message.role === "user" ? (
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="white"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Image
                src="/weteka-logo.png"
                width={20}
                height={20}
                alt="weteka-logo"
                className="w-5 h-5"
              />
            </div>
          )}
        </div>
        
        {/* Message Content */}
        <div className="flex flex-col space-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              {message.role === "user" ? "You" : "Weteka AI"}
            </div>
          </div>
          
          {/* Check if this message is being edited */}
          {isEditing ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="mb-3">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <button 
                        type="button"
                        className="hover:bg-gray-200 px-2 py-1 rounded font-bold"
                        onClick={() => document.execCommand('bold')}
                        title="Bold"
                      >
                        B
                      </button>
                      <button 
                        type="button"
                        className="hover:bg-gray-200 px-2 py-1 rounded italic"
                        onClick={() => document.execCommand('italic')}
                        title="Italic"
                      >
                        I
                      </button>
                      <button 
                        type="button"
                        className="hover:bg-gray-200 px-2 py-1 rounded underline"
                        onClick={() => document.execCommand('underline')}
                        title="Underline"
                      >
                        U
                      </button>
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <button 
                        type="button"
                        className="hover:bg-gray-200 px-2 py-1 rounded text-xs"
                        onClick={() => document.execCommand('insertUnorderedList')}
                        title="Bullet List"
                      >
                        • List
                      </button>
                    </div>
                  </div>
                  <div
                    contentEditable
                    className="p-4 min-h-[120px] max-h-[300px] overflow-y-auto outline-none text-sm leading-relaxed bg-white"
                    style={{ whiteSpace: 'pre-wrap' }}
                    suppressContentEditableWarning={true}
                    onInput={(e) => {
                      const target = e.target as HTMLElement;
                      onContentChange(target.innerHTML || "");
                    }}
                    onBlur={(e) => {
                      const target = e.target as HTMLElement;
                      onContentChange(target.innerHTML || "");
                    }}
                    dangerouslySetInnerHTML={{ __html: editedContent.replace(/\n/g, '<br>') }}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={onCancelEdit}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Cancel"
                >
                  ✕
                </button>
                <button
                  onClick={onSaveEdit}
                  className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Save"
                >
                  ✓
                </button>
              </div>
            </div>
          ) : (
            <div className={`
              group relative border border-gray-200 p-4 rounded-2xl transition-all duration-200 hover:shadow-md
              ${message.role === 'user' 
                ? 'bg-gray-700 text-white ml-8' 
                : 'bg-white text-gray-900 mr-8'
              }
            `}>
              {/* Message Content */}
              <div 
                className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }}
              />
              
              {/* Action Buttons - Only show for AI messages */}
              {message.role === 'assistant' && (
                <div className="flex items-center justify-end space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    onClick={() => onCopy(message.content)}
                    className="bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 p-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-all"
                    title="Copy"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onStartEditing(index, message.content)}
                    className="bg-gray-100 hover:bg-purple-50 text-gray-600 hover:text-purple-600 p-2 rounded-lg border border-gray-200 hover:border-purple-200 transition-all"
                    title="Edit"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onShare(message.content)}
                    className="bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-600 p-2 rounded-lg border border-gray-200 hover:border-green-200 transition-all"
                    title="Share to Telegram"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageComponent;