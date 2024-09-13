"use client";

import React, { ReactNode, useState } from "react";
import Anthropic from "@anthropic-ai/sdk";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

type ContentBlock = {
  type: string;
  text?: string;
  source?: string;
  // Add other possible properties as needed
};

type Message = {
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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] h-[80%] max-w-4xl">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="h-full overflow-hidden px-10">{children}</div>
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setConversation((prev) => [...prev, { role: "user", content: inputValue }]);

    const anthropic = new Anthropic({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    try {
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        system:
          "Answer as if you are a teacher on a learning platform called Weteka, your goal is to help students learn",

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

      // const assistantResponse = msg.content[0].text;
      const assistantResponse = extractTextFromMessage(msg);
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error fetching response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInputValue("");
    }
  };

  const extractTextFromMessage = (message: Message): string => {
    return message.content
      .map((block: ContentBlock) => {
        switch (block.type) {
          case "text":
            return block.text || "";
          case "image":
            return "[Image]"; // Or handle image blocks as needed
          default:
            return "";
        }
      })
      .join("\n");
  };

  return (
    <div className="relative">
      <button
        onClick={openModal}
        className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        សួរគ្រូ Weteka
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col justify-between w-full h-full">
          <div className="mb-4 border-b pb-4">
            <h2 className="text-2xl font-bold mb-2">សួស្តី, Vuthy!</h2>
            <p className="text-gray-600">
              ខ្ញុំជាគ្រូជំនួយនៅលើ វេទេកា​! អ្នកអាចសួរសំណួរដែលអ្នកចង់រៀនមកខ្ញុំ។
            </p>
          </div>

          <div className="text-gray-500">
            <p className="mb-4">Example Questions</p>
            <div className="flex gap-2 flex-col">
              <p className=" py-2 px-4 border rounded-lg w-fit">
                Teach me math!
              </p>
              {/* <p className=" py-2 px-4 border rounded-lg w-fit">
                How to learn video editing?
              </p>
              <p className=" py-2 px-4 border rounded-lg w-fit">
                How to be Batman
              </p> */}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto mb-4 space-y-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex 
                   ${
                     message.role === "user"
                       ? "" //ml-auto
                       : "bg-gray-100"
                   } 
                max-w-[80%] whitespace-pre-wrap break-words`}
              >
                <div className="text-sm font-semibold mb-1">
                  {message.role === "user" ? (
                    <div className="flex flex-row items-center gap-2">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        className="bi bi-person-circle mr-4"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                      {/* <p className="">You</p> */}
                    </div>
                  ) : (
                    <div className="mr-2 w-10 h-10">
                      <Image
                        src="/weteka-logo.png"
                        width={1000}
                        height={1000}
                        alt="weteka-logo"
                        className="w-8 h-8"
                      />
                    </div>
                  )}
                </div>
                <p className="leading-relaxed text-gray-800">
                  {message.content}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              </div>
            )}
          </div>

          <div className="bg-blue-100 mb-6 p-4 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-send-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
