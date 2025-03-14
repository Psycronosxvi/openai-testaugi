'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Register languages
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

// Import the documentation content
const docContent = `# AUGI Chat Interface Documentation...`; // Full content from AUGI-DOCUMENTATION.md

export default function DocumentationPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    
    // Create blob from markdown content
    const blob = new Blob([docContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AUGI-Documentation.md';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#00E5FF]">Documentation</h1>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download Documentation'}
          </Button>
        </div>
        <Card className="bg-[#232438] border-[#2A2B3F] p-8">
          <ReactMarkdown
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '');
                const codeContent = String(children).replace(/\n$/, '');
                
                if (!match) {
                  return (
                    <code className={className}>
                      {children}
                    </code>
                  );
                }
                
                const language = match[1];
                
                return (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                  >
                    {codeContent}
                  </SyntaxHighlighter>
                );
              }
            }}
            className="prose prose-invert max-w-none prose-pre:bg-[#1A1B2E] prose-pre:border prose-pre:border-[#2A2B3F]"
          >
            {docContent}
          </ReactMarkdown>
        </Card>
      </div>
    </div>
  );
}
