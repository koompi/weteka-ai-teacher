# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Weteka AI Teacher** - A Next.js web application that provides an AI-powered educational chat interface using Claude 3.5 Sonnet. The app features a modal-based chat interface designed for the Weteka learning platform with multilingual support (English/Khmer).

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

The development server runs on http://localhost:3000

## Technology Stack

- **Next.js 14.2.7** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Anthropic AI SDK** for Claude integration
- **Lucide React** for icons

## Architecture

### File Structure
- `app/` - Next.js App Router directory
  - `page.tsx` - Main application with chat interface
  - `layout.tsx` - Root layout with Inter font
  - `globals.css` - Tailwind CSS imports
- `public/` - Static assets including weteka-logo.png

### Key Components
- **Modal Component** - Reusable modal wrapper for chat interface
- **App Component** - Main chat functionality with Claude AI integration
- Chat interface maintains conversation history in React state

### AI Integration
- Uses Claude 3.5 Sonnet model (claude-3-5-sonnet-20240620)
- Configured with educational assistant system prompt
- API key required via `NEXT_PUBLIC_API_KEY` environment variable
- Set to `dangerouslyAllowBrowser: true` for client-side usage

### State Management
- React useState for modal state, user input, and conversation history
- No external state management library

### Styling Approach
- Tailwind CSS utility classes
- Responsive design (95% width mobile, 80% desktop)
- Modal overlay with backdrop blur
- Distinct styling for user vs assistant messages

## Environment Setup

Required environment variable:
```
NEXT_PUBLIC_API_KEY=your_anthropic_api_key
```

## Deployment

Configured for Vercel deployment with standard Next.js setup.