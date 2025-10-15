import React, { useState, useCallback } from 'react';
import { UrlInput } from './components/UrlInput';
import { ActionSelector } from './components/ActionSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { generateContentFromUrl } from './services/geminiService';
import { ActionType } from './types';
import { ACTIONS } from './constants';

const App: React.FC = () => {
  const [submittedUrl, setSubmittedUrl] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = (url: string) => {
    setSubmittedUrl(url);
    setSelectedAction(null);
    setGeneratedContent('');
    setError(null);
  };

  const handleActionSelect = useCallback(async (actionType: ActionType) => {
    if (!submittedUrl) {
      setError('Please submit a URL first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent('');
    setSelectedAction(actionType);

    try {
      const action = ACTIONS.find(a => a.id === actionType);
      if (!action) {
        throw new Error('Invalid action selected.');
      }
      const content = await generateContentFromUrl(submittedUrl, action.prompt);
      setGeneratedContent(content);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [submittedUrl]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            AI Content Repurposer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Turn any article into ready-to-post social media content.
          </p>
        </header>

        <main className="space-y-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
            <UrlInput onSubmit={handleUrlSubmit} />
          </div>

          {submittedUrl && (
            <div className="transition-all duration-500 ease-in-out">
              <ActionSelector onSelect={handleActionSelect} selectedAction={selectedAction} />
            </div>
          )}

          {isLoading && <Loader />}
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {generatedContent && !isLoading && (
            <div className="transition-all duration-500 ease-in-out">
              <ResultDisplay
                content={generatedContent}
                actionType={selectedAction}
              />
            </div>
          )}
        </main>
         <footer className="text-center mt-12 text-gray-500">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
