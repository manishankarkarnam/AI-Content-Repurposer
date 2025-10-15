import React from 'react';

export enum ActionType {
  SUMMARY = 'summary',
  TWEET = 'tweet',
  INSTAGRAM = 'instagram',
  SCRIPT = 'script',
}

export interface Action {
  id: ActionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  platformName?: string;
  platformShareUrl?: string;
}
