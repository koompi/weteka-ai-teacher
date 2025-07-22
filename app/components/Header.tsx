"use client";

import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <Image
                src="/weteka-logo.png"
                width={24}
                height={24}
                alt="weteka-logo"
                className="w-6 h-6 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Weteka AI ជំនួយការ
              </h1>
              <p className="text-sm text-gray-500">
                Your Learning Assistant
              </p>
            </div>
          </div>
          
          {/* Status */}
          <div className="flex items-center space-x-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;