"use client";

import { useState, useEffect } from "react";

export const useUI = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [editingMessageIndex, setEditingMessageIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const startEditing = (index: number, content: string) => {
    setEditingMessageIndex(index);
    setEditedContent(content);
  };

  const saveEditedMessage = () => {
    return {
      index: editingMessageIndex,
      content: editedContent,
    };
  };

  const cancelEditing = () => {
    setEditingMessageIndex(null);
    setEditedContent("");
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareToMessenger = (content: string) => {
    const text = encodeURIComponent(content);
    const telegramUrl = `https://t.me/share/url?text=${text}`;
    window.open(telegramUrl, '_blank');
  };

  return {
    isSidebarOpen,
    isMobile,
    editingMessageIndex,
    editedContent,
    toggleSidebar,
    closeSidebar,
    startEditing,
    saveEditedMessage,
    cancelEditing,
    copyToClipboard,
    shareToMessenger,
    setEditedContent,
  };
};