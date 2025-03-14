import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Sliders, RotateCcw, ZoomIn, ZoomOut, Grid } from 'lucide-react';

interface ControlsProps {
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
}

export function Controls({ onReset, onZoomIn, onZoomOut, onToggleGrid }: ControlsProps) {
  return (
    <Card className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-lg border-[#00F5D4]/20 p-4">
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="hover:bg-[#00F5D4]/20"
        >
          <RotateCcw className="w-5 h-5 text-[#00F5D4]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="hover:bg-[#00F5D4]/20"
        >
          <ZoomIn className="w-5 h-5 text-[#00F5D4]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="hover:bg-[#00F5D4]/20"
        >
          <ZoomOut className="w-5 h-5 text-[#00F5D4]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleGrid}
          className="hover:bg-[#00F5D4]/20"
        >
          <Grid className="w-5 h-5 text-[#00F5D4]" />
        </Button>
      </div>
    </Card>
  );
}