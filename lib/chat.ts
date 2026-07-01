export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function sendChatMessage(message: string): Promise<string> {
  // Simulate AI response with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple response generation
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return "Hello! I am AUGI, your Advanced Universal Guidance Interface. How can I assist you today?";
  }
  
  return `I understand your query about "${message}". I'm analyzing that request and will provide a detailed response shortly.`;
}