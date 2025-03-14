export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isProcessing?: boolean;
}

// Predefined responses for common queries
const responses = {
  greeting: [
    "Hello! I am AUGI, your Advanced Universal Guidance Interface. How can I assist you today?",
    "Greetings! I'm here to help you navigate the digital frontier.",
    "Welcome! I'm AUGI, your cybernetic companion. What can I do for you?",
  ],
  farewell: [
    "Goodbye! Stay safe in the digital realm.",
    "Until next time, user. May your code compile cleanly.",
    "Farewell! The neural networks will miss you.",
  ],
  unknown: [
    "Processing query through neural pathways...",
    "Analyzing request through quantum algorithms...",
    "Interfacing with synthetic intelligence cores...",
  ]
};

// Response generation with cyberpunk flair
export async function generateResponse(input: string): Promise<string> {
  const userMessage = input.toLowerCase();

  // Add artificial delay for dramatic effect
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Add artificial delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Greeting patterns
  if (userMessage.match(/^(hi|hello|hey|greetings)/i)) {
    const response = randomResponse(responses.greeting);
    speak(response);
    return response;
  }

  // Farewell patterns
  if (userMessage.match(/^(bye|goodbye|see you|farewell)/i)) {
    const response = randomResponse(responses.farewell);
    speak(response);
    return response;
  }

  // System status queries
  if (userMessage.includes('status') || userMessage.includes('system')) {
    const response = "All neural pathways operational. Quantum encryption active. Defense matrices at optimal levels.";
    speak(response);
    return response;
  }

  // Help queries
  if (userMessage.includes('help') || userMessage.includes('assist')) {
    const response = "I can assist with system monitoring, security analysis, and neural processing. What domain shall we explore?";
    speak(response);
    return response;
  }

  // Default response with cyberpunk flair
  const response = `Neural analysis complete. Query "${userMessage}" processed. Formulating optimal response through quantum pathways...`;
  speak(response);
  return response;
}

// Helper to get random response from array
function randomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}