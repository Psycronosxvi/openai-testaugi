export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Predefined responses for common queries
const responses = {
  greeting: [
    "Hello! How can I assist you today?",
    "Greetings! I'm here to help.",
    "Welcome! What can I do for you?",
  ],
  farewell: [
    "Goodbye! Have a great day!",
    "Until next time!",
    "Take care!",
  ],
  unknown: [
    "I understand your query. Let me process that for you.",
    "Interesting question. Let me analyze that.",
    "I'm processing your request.",
  ]
};

// Simple response generation based on input patterns
export async function generateResponse(input: string): Promise<string> {
  const userMessage = input.toLowerCase();

  // Greeting patterns
  if (userMessage.match(/^(hi|hello|hey|greetings)/i)) {
    return randomResponse(responses.greeting);
  }

  // Farewell patterns
  if (userMessage.match(/^(bye|goodbye|see you|farewell)/i)) {
    return randomResponse(responses.farewell);
  }

  // Echo with context
  return `I understand you're asking about "${userMessage}". I'm processing that request.`;
}

// Helper to get random response from array
function randomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}