import React, { useState } from 'react';
import { LinkIcon } from './icons/LinkIcon';

interface UrlInputProps {
  onSubmit: (url: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
      <label htmlFor="url-input" className="sr-only">
        Enter URL
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LinkIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="url"
          id="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste any article link here..."
          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105"
      >
        Repurpose
      </button>
    </form>
  );
};
