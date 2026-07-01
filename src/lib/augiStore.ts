import { create } from 'zustand';
import { Message } from './augi';

interface AugiState {
  avatarUrl: string | null;
  messages: Message[];
  isResponding: boolean;
  setAvatarUrl: (url: string) => void;
  addMessage: (message: Message) => void;
  setIsResponding: (value: boolean) => void;
  clearMessages: () => void;
}

export const useAugiStore = create<AugiState>((set) => ({
  avatarUrl: null,
  messages: [{
    role: 'assistant',
    content: 'Hello! I am AUGI, your Advanced Universal Guidance Interface. How can I assist you today?',
    timestamp: new Date()
  }],
  isResponding: false,
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setIsResponding: (value) => set({ isResponding: value }),
  clearMessages: () => set({ 
    messages: [{
      role: 'assistant',
      content: 'Hello! I am AUGI, your Advanced Universal Guidance Interface. How can I assist you today?',
      timestamp: new Date()
    }] 
  })
}));