import { useRef, useEffect, useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

interface MediaPreviewProps {
  type: 'camera' | 'screen' | null;
  onClose: () => void;
}

export function MediaPreview({ type, onClose }: MediaPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupMedia() {
      setError(null);
      try {
        if (!videoRef.current) return;

        if (type === 'screen') {
          try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
              video: true,
              audio: false,
            });
            videoRef.current.srcObject = screenStream;
          } catch (err) {
            if (err.name === 'NotAllowedError') {
              setError('Screen sharing permission denied');
            } else {
              setError('Failed to start screen sharing');
            }
            onClose();
          }
        } else {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false,
            });
            videoRef.current.srcObject = stream;
          } catch (err) {
            if (err.name === 'NotAllowedError') {
              setError('Camera access permission denied');
            } else {
              setError('Failed to access camera');
            }
            onClose();
          }
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        setError('Failed to access media devices');
        onClose();
      }
    }

    if (type) {
      setupMedia();
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [type]);

  if (!type && !error) return null;

  if (error) {
    return (
      <Card className="p-4 bg-red-500/10 border-red-500/20">
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative bg-[#232438] border-[#2A2B3F] overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10"
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </Button>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-[300px] object-cover"
      />
    </Card>
  );
}