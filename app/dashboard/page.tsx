'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUploadButton } from '@/components/FileUploadButton';
import { AugiVisual } from '@/components/AugiVisual';
import { MediaPreview } from '@/components/MediaPreview';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Camera, Mic, Share, AlertCircle } from 'lucide-react';
import { GhostText } from '@/components/GhostText';
import { generateResponse } from '@/lib/augi';
import type { Message } from '@/lib/augi';
import { addPoints, POINTS_CONFIG } from '@/lib/points';
import { PointsDisplay } from '@/components/PointsDisplay';

export default function DashboardPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaType, setMediaType] = useState<'camera' | 'screen' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isAugiResponding, setIsAugiResponding] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am AUGI, your Advanced Universal Guidance Interface. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsAugiResponding(true);
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
      isProcessing: false
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Award points for chatting
    addPoints(POINTS_CONFIG.CHAT_MESSAGE, 'Sent a message to AUGI');

    // Check for long conversation bonus
    if (messages.length >= 10) {
      addPoints(POINTS_CONFIG.LONG_CONVERSATION, 'Extended conversation with AUGI');
    }

    try {
      // Add processing message
      const processingMessage: Message = {
        role: 'assistant',
        content: 'Processing through neural pathways...',
        timestamp: new Date(),
        isProcessing: true
      };
      setMessages(prev => [...prev, processingMessage]);

      // Generate actual response
      const response = await generateResponse(input);
      
      // Remove processing message and add real response
      setMessages(prev => prev.filter(msg => !msg.isProcessing));
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        isProcessing: false
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AUGI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        isProcessing: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAugiResponding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMediaStart = async (type: 'camera' | 'screen') => {
    setMediaError(null);
    try {
      if (type === 'camera') {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } else {
        await navigator.mediaDevices.getDisplayMedia({ video: true });
      }
      setMediaType(type);
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setMediaError(`${type === 'camera' ? 'Camera' : 'Screen sharing'} permission denied`);
      } else {
        setMediaError(`Failed to start ${type === 'camera' ? 'camera' : 'screen sharing'}`);
      }
      setTimeout(() => setMediaError(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <PointsDisplay />
      <h2 className="text-2xl font-bold text-[#00E5FF]">AUGI Chat Interface</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        <Card className="bg-[#232438] border-[#2A2B3F] p-6" style={{ height: '800px' }}>
          <h3 className="text-xl font-bold mb-4">AUGI Presence</h3>
          <div className="h-[calc(100%-2rem)]">
            <AugiVisual />
          </div>
        </Card>

        <div className="lg:col-span-2 order-first lg:order-none">
          <Card className="bg-[#232438] border-[#2A2B3F] h-[800px] flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      message.role === 'user' ? 'bg-[#FF1B6B]' : 'bg-[#00E5FF]'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`flex-1 ${
                      message.role === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block p-4 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-[#FF1B6B]/20 text-white' 
                          : 'bg-[#2A2B3F] text-gray-100'
                      }`}>
                        {message.isProcessing ? (
                          <GhostText 
                            text={message.content}
                            glowColor={message.role === 'user' ? '#FF1B6B' : '#00E5FF'}
                            className="text-[#00E5FF]"
                          />
                        ) : (
                          message.content
                        )}
                      </div>
                      <div className="text-xs text-gray-200 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-[#2A2B3F] sticky bottom-0 bg-[#232438]">
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMediaStart('camera')}
                  className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80"
                >
                  <Camera className="w-4 h-4 text-[#00E5FF]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsRecording(!isRecording)}
                  className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80"
                >
                  <Mic className="w-4 h-4 text-[#00E5FF]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMediaStart('screen')}
                  className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80"
                >
                  <Share className="w-4 h-4 text-[#00E5FF]" />
                </Button>
                <FileUploadButton
                  onFileSelected={(file) => {
                    // Handle file upload
                    addPoints(POINTS_CONFIG.FILE_UPLOAD, 'Uploaded file');
                  }}
                  className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80"
                />
              </div>
              {mediaError && (
                <div className="text-sm text-red-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {mediaError}
                </div>
              )}
              <div className="flex gap-2 flex-col sm:flex-row">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="bg-[#2A2B3F] border-[#3A3B4F] text-white flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={isAugiResponding}
                  className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80 w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-[#232438] border-[#2A2B3F] p-6 h-[800px]">
          <h3 className="text-xl font-bold mb-4">Chat Information</h3>
          <div className="space-y-4">
            <div className="p-4 bg-[#2A2B3F] rounded-lg">
              <h4 className="font-medium mb-2">Status</h4>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse bg-[#00E5FF]`} />
                <span className="text-sm text-gray-200">
                  System active
                </span>
              </div>
            </div>
            <div className="p-4 bg-[#2A2B3F] rounded-lg">
              <h4 className="font-medium mb-2">Capabilities</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                {mediaType && (
                  <MediaPreview
                    type={mediaType}
                    onClose={() => setMediaType(null)}
                  />
                )}
                <li>• Natural Language Processing</li>
                <li>• Context Awareness</li>
                <li>• Real-time Responses</li>
                <li>• Multi-turn Conversations</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}