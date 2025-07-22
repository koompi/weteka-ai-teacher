"use client";

import React, { useEffect } from 'react';

const EnvDebug: React.FC = () => {
  useEffect(() => {
    console.log('=== Environment Debug ===');
    console.log('NEXT_PUBLIC_API_KEY present:', !!process.env.NEXT_PUBLIC_API_KEY);
    console.log('NEXT_PUBLIC_API_KEY length:', process.env.NEXT_PUBLIC_API_KEY?.length);
    console.log('NEXT_PUBLIC_API_KEY starts correctly:', process.env.NEXT_PUBLIC_API_KEY?.startsWith('sk-ant'));
    console.log('All NEXT_PUBLIC vars:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')));
  }, []);

  return null;
};

export default EnvDebug;