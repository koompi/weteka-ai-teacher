"use client";

import React from "react";
import Image from "next/image";

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectPrompt }) => {
  const prompts = [
    { 
      text: "ជួយខ្ញុំរៀនគណិតវិទ្យា", 
      gradient: "from-emerald-400 to-cyan-400",
      category: "Education"
    },
    { 
      text: "បង្រៀនខ្ញុំអំពីសិល្បៈ និងការរចនា", 
      gradient: "from-pink-400 to-rose-400",
      category: "Creative"
    },
    { 
      text: "ពន្យល់គំនិតអំពីការសរសេរកម្មវិធី", 
      gradient: "from-blue-400 to-indigo-400",
      category: "Technical"
    },
    { 
      text: "ជួយខ្ញុំសរសេររបាយការណ៍ប្រចាំខែ", 
      gradient: "from-orange-400 to-amber-400",
      category: "Business"
    },
    { 
      text: "ជួយខ្ញុំសរសេរសំណើរស្នើសុំច្បាប់", 
      gradient: "from-purple-400 to-violet-400",
      category: "Administrative"
    },
    { 
      text: "ជួយខ្ញុំបង្កើតបទបង្ហាញ PowerPoint", 
      gradient: "from-teal-400 to-cyan-400",
      category: "Presentation"
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-2 sm:p-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Image
              src="/weteka-logo.png"
              width={32}
              height={32}
              alt="weteka-logo"
              className="w-8 h-8 invert"
            />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Weteka AI ជំនួយការ
          </h1>
          <p className="text-gray-600 font-medium mb-6 sm:mb-8 leading-relaxed max-w-md mx-auto px-4 sm:px-0">
            ខ្ញុំអាចជួយអ្នកក្នុងការសរសេរឯកសារ រាយការណ៍ និងកិច្ចការរដ្ឋបាលផ្សេងៗ
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-2 sm:space-y-3 px-2 sm:px-0">
          {prompts.map((prompt, index) => (
            <div 
              key={index}
              onClick={() => onSelectPrompt(prompt.text)}
              className="group bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm text-gray-800 group-hover:text-gray-900">
                  {prompt.text}
                </p>
                <span className="text-xs font-medium text-gray-500 bg-gray-50 group-hover:bg-blue-50 group-hover:text-blue-600 px-3 py-1 rounded-full border border-gray-200 group-hover:border-blue-200">
                  {prompt.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-xs text-gray-500">
            Click on any option above to start your conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;