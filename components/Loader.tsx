import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-12 h-12 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin"></div>
      <p className="text-indigo-300">AI is thinking...</p>
    </div>
  );
};
