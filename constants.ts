import type { Action } from './types';
import { ActionType } from './types';
import { SummaryIcon } from './components/icons/SummaryIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { InstagramIcon } from './components/icons/InstagramIcon';
import { ScriptIcon } from './components/icons/ScriptIcon';

export const ACTIONS: Action[] = [
  {
    id: ActionType.SUMMARY,
    label: 'Summarize',
    icon: SummaryIcon,
    prompt: 'Provide a concise, easy-to-read summary of the key points from the content at this URL: {URL}. Use bullet points for clarity.',
  },
  {
    id: ActionType.TWEET,
    label: 'Make a Tweet',
    icon: TwitterIcon,
    prompt: 'Generate a concise and compelling tweet (under 280 characters) that summarizes the main point of the content at this URL: {URL}. Include 2-3 relevant hashtags.',
    platformName: 'X',
    platformShareUrl: 'https://twitter.com/intent/tweet?text='
  },
  {
    id: ActionType.INSTAGRAM,
    label: 'Instagram Post',
    icon: InstagramIcon,
    prompt: 'Create an engaging Instagram post based on the content at this URL: {URL}. The post should have a catchy caption and 5-7 relevant hashtags. Also suggest an idea for a compelling visual (e.g., photo, graphic, reel).',
    platformName: 'Instagram'
  },
  {
    id: ActionType.SCRIPT,
    label: 'Make a Script',
    icon: ScriptIcon,
    prompt: 'Write a short video script (around 1 minute) for a platform like TikTok or YouTube Shorts, based on the content at this URL: {URL}. The script should have a hook, main points, and a call to action. Format it with scene descriptions and dialogue/narration.',
    platformName: 'Video Script'
  },
];
