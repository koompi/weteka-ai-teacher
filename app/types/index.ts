export type ContentBlock = {
  type: string;
  text?: string;
  source?: string;
};

export type Message = {
  id: string;
  type: string;
  role: string;
  content: ContentBlock[];
  model: string;
  stop_reason: string | null;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
};

export type ChatMessage = {
  role: string;
  content: string;
};

export type ChatHistory = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
};