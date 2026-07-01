import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, AlertCircle } from 'lucide-react';
import { validateFileUpload, ValidationResult } from '@/lib/upload';
import { useAuth } from '@/lib/auth';

interface FileUploadButtonProps {
  onFileSelected: (file: File) => void;
  className?: string;
}

export function FileUploadButton({ onFileSelected, className }: FileUploadButtonProps) {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation: ValidationResult = validateFileUpload(file, user);
    
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid file');
      setTimeout(() => setError(''), 3000);
      return;
    }

    onFileSelected(file);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
        className={className}
      >
        <Upload className="w-4 h-4 text-[#00E5FF]" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />
      {error !== '' && (
        <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
}