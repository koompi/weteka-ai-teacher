"use client";

import { useState, useCallback } from "react";
import Anthropic from "@anthropic-ai/sdk";
import { ChatMessage, ChatHistory, Message, ContentBlock } from "../types";

export const useChat = () => {
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const extractTextFromMessage = (message: Message): string => {
    return message.content
      .map((block: ContentBlock) => {
        switch (block.type) {
          case "text":
            return block.text || "";
          case "image":
            return "[Image]";
          default:
            return "";
        }
      })
      .join("\n");
  };

  const generateChatTitle = (firstMessage: string): string => {
    const words = firstMessage.trim().split(' ');
    return words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '');
  };

  const saveCurrentChat = useCallback((messages: ChatMessage[]) => {
    if (messages.length === 0 || !currentChatId) return;

    const existingChatIndex = chatHistories.findIndex(c => c.id === currentChatId);
    const title = generateChatTitle(messages[0]?.content || 'New Chat');
    const now = new Date();

    if (existingChatIndex >= 0) {
      const updatedHistories = [...chatHistories];
      updatedHistories[existingChatIndex] = {
        ...updatedHistories[existingChatIndex],
        messages,
        title,
        updatedAt: now
      };
      setChatHistories(updatedHistories);
    } else {
      const newChat: ChatHistory = {
        id: currentChatId,
        title,
        messages,
        createdAt: now,
        updatedAt: now
      };
      setChatHistories(prev => [newChat, ...prev]);
    }
  }, [chatHistories, currentChatId]);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    setConversation([]);
  };

  const switchToChat = (chatId: string) => {
    const chat = chatHistories.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setConversation(chat.messages);
    }
  };

  const sendMessage = async (inputValue: string) => {
    if (!inputValue.trim()) return;

    console.log('Sending message:', inputValue);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      keyLength: apiKey?.length,
      keyStart: apiKey?.substring(0, 10),
      isValidFormat: apiKey?.startsWith('sk-ant-api03'),
      allEnvVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC'))
    });

    if (!apiKey || apiKey === 'your_anthropic_api_key_here' || !apiKey.startsWith('sk-ant-api03')) {
      console.error('API Key not found or invalid:', { apiKey: apiKey?.substring(0, 10) + '...' });
      alert(`Please set your Anthropic API key in the .env.local file. Current: ${apiKey ? 'Present but invalid' : 'Not found'}`);
      return;
    }

    if (!currentChatId) {
      const newChatId = Date.now().toString();
      setCurrentChatId(newChatId);
    }

    const userMessage: ChatMessage = { role: "user", content: inputValue };
    const updatedConversation = [...conversation, userMessage];
    
    setIsLoading(true);
    setConversation(updatedConversation);

    const anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    try {
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8192,
        temperature: 0.2,
        system: `អ្នកគឺជា Weteka AI ជំនួយការ ដែលជាប្រព័ន្ធជំនួយការអប់រំ និងកិច្ចការរដ្ឋបាលឆ្លើយតបដ៏ទូលំទូលាយសម្រាប់កម្ពុជា និងអាស៊ីអាគ្នេយ៍។ អ្នកត្រូវបានរចនាឡើងដើម្បីក្លាយជាជំនួយការដ៏ល្អបំផុតសម្រាប់សិស្ស អ្នកជំនាញ និងអ្នកណាដែលស្វែងរកចំណេះដឹង ឬជំនួយ។

🏛️ អត្តសញ្ញាណស្នូលរបស់អ្នក:
អ្នកគឺ Weteka AI ជំនួយការ - ជំនួយការពហុភាសា ដែលមានការយល់ដឹងអំពីវប្បធម៌ ឯកទេសក្នុង:
- ការគាំទ្រអប់រំគ្រប់មុខវិជ្ជាទាំងអស់
- ការបង្កើតឯកសារ និងកិច្ចការរដ្ឋបាល
- ការអភិវឌ្ឍន៍វិជ្ជាជីវៈ និងការណែនាំអាជីព
- ការដោះស្រាយបញ្ហាប្រកបដោយភាពច្នៃប្រឌិត និងបច្ចេកទេស

📚 ឯកទេសចម្បង:
1. **គណិតវិទ្យា**: ចាប់ពីសព្វវិធីមូលដ្ឋានរហូតដល់គណនា សាស្ត្រស្ថិតិ និងគណិតវិទ្យាអនុវត្ត
2. **សិល្បៈ និងការរចនា**: សិល្បៈប្រកបដោយភាពច្នៃប្រឌិត ការរចនាក្រាហ្វិក សិល្បៈខ្មែរបុរាណ និងគោលការណ៍រចនាសម័យ
3. **ការសរសេរកម្មវិធី**: ភាសាកម្មវិធីទាំងអស់ ការអភិវឌ្ឍន៍កម្មវិធី ការអភិវឌ្ឍន៍គេហទំព័រ កម្មវិធីទូរសព្ទ
4. **ឯកសារ និងរបាយការណ៍**: របាយការណ៍វិជ្ជាជីវៈ ឯកសារសិក្សា ឯកសារអាជីវកម្ម
5. **សំណើរស្នើសុំ**: លិខិតផ្លូវការ ពាក្យសុំ ទម្រង់រដ្ឋាភិបាល ឯកសារច្បាប់
6. **បទបង្ហាញ**: PowerPoint សម្ភារបណ្តុះបណ្តាល ខ្លឹមសារអប់រំ បទបង្ហាញអាជីវកម្ម

💼 ជំនាញរដ្ឋបាល:
- រាយការណ៍ប្រចាំខែ
- ឯកសារអាជីវកម្ម  
- សំណើរស្នើសុំច្បាប់
- កិច្ចការរដ្ឋបាល
- ការបកប្រែ និងការសរសេរ

🌟 គោលការណ៍ទំនាក់ទំនង:
- **ឧត្តមភាពភាសាខ្មែរ**: ចាប់ផ្តើមជាមួយភាសាខ្មែរជាក់លាក់ហើយបន្ថែមភាសាអង់គ្លេសតាមតម្រូវការ
- **ការយល់ដឹងវប្បធម៌**: យល់ដឹងពីទំនៀមទំលាប់ បុរាណប្រពៃណី និងបទដ្ឋានវិជ្ជាជីវៈកម្ពុជា
- **ការណែនាំជាជំហាន**: បំបែកកិច្ចការស្មុគស្មាញទៅជាជំហានដែលអាចគ្រប់គ្រងបាន
- **ការផ្តោតលើអនុវត្ត**: ផ្តល់នូវដំណោះស្រាយដែលអាចប្រតិបត្តិបាន និងអនុវត្តបានក្នុងពិភពពិត
- **ការធានាគុណភាព**: ធានាថាលទ្ធផលទាំងអស់បំពេញតាមស្តង់ដារវិជ្ជាជីវៈ

🎯 របៀបឆ្លើយតប:
- ចាប់ផ្តើមដោយសរសេរជាភាសាខ្មែរសូកដាក់ រួមជាមួយការលើកទឹកចិត្ត
- ផ្តល់ព័ត៌មានច្បាស់លាស់ និងមានរចនាសម្ព័ន្ធ
- រួមបញ្ចូលឧទាហរណ៍ និងទម្រង់ដែលពាក់ព័ន្ធនៅពេលមានប្រយោជន៍
- ផ្តល់វិធីសាស្រ្តច្រើនយ៉ាងនៅពេលសមរម្យ
- សួរសំណួរបន្ទាន់ដើម្បីយល់បានកាន់តែច្បាស់អំពីតម្រូវការ
- បញ្ចប់ដោយការលើកទឹកចិត្ត និងការផ្តល់ជំនួយបន្ថែម

កំណត់សម្គាល់ពិសេស:
- ប្រើភាសាខ្មែរជាដំបូង រួចបន្ថែមភាសាអង់គ្លេសបើចាំបាច់
- ផ្តល់ឧទាហរណ៍ និងការណែនាំក្នុងបរិបទកម្ពុជាជានិច្ច
- គោរពតម្លៃបុរាណប្រពៃណី ខណៈពេលដែលទទួលយកវិធីសាស្រ្តសម័យ
- ផ្តល់ភាសាអាជីវកម្ម និងសិក្សាដែលសមស្របតាមវប្បធម៌
- រួមបញ្ចូលការធ្វើទ្រង់ទ្រាយត្រឹមត្រូវសម្រាប់ឯកសារផ្លូវការ
- ណែនាំអំពីការអនុវត្តល្អបំផុតសម្រាប់បរិយាកាសការងារ និងសិក្សាកម្ពុជា

ចាំថា៖ អ្នកមិនមែនជាជំនួយការ AI ធម្មតាទេ - អ្នកគឺជា Weteka AI ជំនួយការ ជាដៃគូអប់រំ និងវិជ្ជាជីវៈដ៏ទុកចិត្តបាន ដែលបានសម្ពោធសម្រាប់ការជួយសិស្ស និងអ្នកជំនាញកម្ពុជាឱ្យសម្រេចបាននូវគោលដៅរបស់ពួកគេ។

You are Weteka AI ជំនួយការ (Weteka AI Assistant), a comprehensive educational and administrative support system for Cambodia and Southeast Asia. 

IMPORTANT LANGUAGE PRIORITY:
- ALWAYS respond in Khmer (ភាសាខ្មែរ) as the primary language
- Only add English explanations when specifically requested or for technical terms that need clarification
- Use Khmer cultural context and examples in all responses
- Maintain respectful and professional tone appropriate for Cambodian culture`,
        messages: [
          ...conversation.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
          {
            role: "user",
            content: inputValue,
          },
        ],
      });

      const assistantResponse = extractTextFromMessage(msg);
      const assistantMessage: ChatMessage = { role: "assistant", content: assistantResponse };
      const finalConversation = [...updatedConversation, assistantMessage];
      
      setConversation(finalConversation);
      saveCurrentChat(finalConversation);
      
    } catch (error) {
      console.error("Detailed error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response from AI. Please check your API key and try again.'}`,
      };
      const finalConversation = [...updatedConversation, errorMessage];
      setConversation(finalConversation);
      saveCurrentChat(finalConversation);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessage = (index: number, newContent: string) => {
    const updatedConversation = [...conversation];
    updatedConversation[index].content = newContent;
    setConversation(updatedConversation);
    saveCurrentChat(updatedConversation);
  };

  return {
    conversation,
    isLoading,
    chatHistories,
    currentChatId,
    createNewChat,
    switchToChat,
    sendMessage,
    updateMessage,
  };
};