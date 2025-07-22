"use client";

import React, { useRef, useEffect } from "react";
import { Loader2, Send } from "lucide-react";

interface ChatInputProps {
  inputValue: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as any);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto p-2 sm:p-6">
        <form onSubmit={onSubmit}>
          <div className="flex items-center space-x-2">
            {/* Text input area */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                className="w-full resize-none border border-gray-300 rounded-lg bg-gray-50 p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                placeholder="Type your message here..."
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{ height: '40px', maxHeight: '120px' }}
              />
            </div>
            
            {/* Send Button */}
            <button
              type="submit"
              className={`
                flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                ${inputValue.trim() && !isLoading
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
              disabled={!inputValue.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default ChatInput;