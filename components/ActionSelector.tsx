import React from 'react';
import { ACTIONS } from '../constants';
import { ActionType } from '../types';

interface ActionSelectorProps {
  onSelect: (action: ActionType) => void;
  selectedAction: ActionType | null;
}

export const ActionSelector: React.FC<ActionSelectorProps> = ({ onSelect, selectedAction }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
      <h2 className="text-lg font-semibold text-center text-gray-300 mb-4">Choose a format</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => onSelect(action.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg text-center transition-all duration-200 transform hover:-translate-y-1 group ${
              selectedAction === action.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            <action.icon className="h-8 w-8 mb-2 transition-colors group-hover:text-white" />
            <span className="font-medium text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
