"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useNavigation = () => {
  const router = useRouter();

  const navigateWithCache = (path: string, preserveState = false) => {
    // Store the current page state before navigation
    const currentPath = window.location.pathname;
    const currentScrollY = window.scrollY;
    
    // Check if we have an active conversation
    const currentConversation = localStorage.getItem('weteka-current-conversation');
    const hasActiveChat = currentConversation && JSON.parse(currentConversation).length > 0;
    
    // Store in sessionStorage for temporary navigation memory
    sessionStorage.setItem('weteka-previous-path', currentPath);
    sessionStorage.setItem('weteka-previous-scroll', currentScrollY.toString());
    sessionStorage.setItem('weteka-has-active-chat', hasActiveChat ? 'true' : 'false');
    
    // If preserving state, store additional context
    if (preserveState) {
      sessionStorage.setItem('weteka-preserve-state', 'true');
      sessionStorage.setItem('weteka-navigation-timestamp', Date.now().toString());
    }
    
    router.push(path);
  };

  const navigateBack = () => {
    const previousPath = sessionStorage.getItem('weteka-previous-path');
    const previousScroll = sessionStorage.getItem('weteka-previous-scroll');
    const preserveState = sessionStorage.getItem('weteka-preserve-state');
    const hasActiveChat = sessionStorage.getItem('weteka-has-active-chat') === 'true';
    
    // Always go to home, but the page will show chat if there's an active conversation
    router.push('/');
    
    // Restore scroll position after navigation
    if (previousScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(previousScroll));
      }, 100);
    }
    
    // Force the page to show the chat instead of welcome screen
    if (hasActiveChat) {
      sessionStorage.setItem('weteka-force-chat-view', 'true');
    }
    
    // Clean up session storage (but keep preserve-state flag briefly)
    sessionStorage.removeItem('weteka-previous-path');
    sessionStorage.removeItem('weteka-previous-scroll');
    sessionStorage.removeItem('weteka-has-active-chat');
    
    // Clean preserve state after a brief delay to allow component to read it
    if (preserveState) {
      setTimeout(() => {
        sessionStorage.removeItem('weteka-preserve-state');
        sessionStorage.removeItem('weteka-navigation-timestamp');
        sessionStorage.removeItem('weteka-force-chat-view');
      }, 500);
    }
  };

  const isReturningFromNavigation = () => {
    return sessionStorage.getItem('weteka-preserve-state') === 'true';
  };

  const clearNavigationState = () => {
    sessionStorage.removeItem('weteka-preserve-state');
    sessionStorage.removeItem('weteka-navigation-timestamp');
  };

  return {
    navigateWithCache,
    navigateBack,
    isReturningFromNavigation,
    clearNavigationState,
  };
};