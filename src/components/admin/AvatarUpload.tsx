import { useState, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Upload, X, Check } from 'lucide-react';
import { useAugiStore } from '../../lib/augiStore';

export function AvatarUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setAvatarUrl } = useAugiStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.glb')) {
      setErrorMessage('Please upload a GLB file');
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    try {
      // Create object URL for the GLB file
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setUploadStatus('success');
    } catch (error) {
      setErrorMessage('Failed to process the file');
      setUploadStatus('error');
    }
  };

  return (
    <Card className="bg-[#232438] border-[#2A2B3F] p-6">
      <h3 className="text-xl font-bold text-[#00E5FF] mb-6">AUGI Avatar Upload</h3>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? 'border-[#00E5FF] bg-[#00E5FF]/5'
            : 'border-[#2A2B3F] hover:border-[#00E5FF]/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".glb"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {uploadStatus === 'uploading' ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-t-[#00E5FF] border-[#2A2B3F] rounded-full animate-spin" />
            <p className="text-gray-400">Uploading avatar...</p>
          </div>
        ) : uploadStatus === 'success' ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00E5FF]/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <p className="text-[#00E5FF]">Avatar updated successfully!</p>
            <Button
              onClick={() => {
                setUploadStatus('idle');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80"
            >
              Upload Another
            </Button>
          </div>
        ) : uploadStatus === 'error' ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-red-400">{errorMessage}</p>
            <Button
              onClick={() => {
                setUploadStatus('idle');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <p className="text-gray-400 mb-2">
                Drag and drop your GLB file here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#00E5FF] hover:underline"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-500">Only GLB files are supported</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}