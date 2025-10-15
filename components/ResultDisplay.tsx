import React, { useState, useEffect } from 'react';
import { ActionType } from '../types';
import { ACTIONS } from '../constants';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { TwitterIcon } from './icons/TwitterIcon';

interface ResultDisplayProps {
  content: string;
  actionType: ActionType | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, actionType }) => {
  const [copied, setCopied] = useState(false);
  const action = ACTIONS.find(a => a.id === actionType);

  useEffect(() => {
    setCopied(false);
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedContent = content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {action?.platformShareUrl && (
          <a
            href={`${action.platformShareUrl}${encodeURIComponent(content)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
          >
            <TwitterIcon className="h-4 w-4" />
            Post to {action.platformName}
          </a>
        )}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
          }`}
        >
          {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-indigo-400">
        Generated {action?.label || 'Content'}
      </h3>
      <div className="prose prose-invert prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white max-w-none text-gray-300 whitespace-pre-wrap">
        {formattedContent}
      </div>
    </div>
  );
};
