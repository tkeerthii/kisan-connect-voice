import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface VoiceButtonProps {
  onVoiceStart: () => void;
  onVoiceStop: () => void;
  isListening?: boolean;
  isProcessing?: boolean;
}

export const VoiceButton = ({ onVoiceStart, onVoiceStop, isListening = false, isProcessing = false }: VoiceButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onVoiceStart();
  };

  const handleRelease = () => {
    setIsPressed(false);
    onVoiceStop();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.button
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          mic-button w-24 h-24 flex items-center justify-center
          ${isListening || isPressed ? 'mic-pulse' : ''}
          ${isListening ? 'bg-destructive hover:bg-destructive/80' : ''}
          ${isProcessing ? 'opacity-75' : ''}
        `}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <LoadingSpinner size="lg" className="border-primary-foreground/30 border-t-primary-foreground" />
        ) : isListening || isPressed ? (
          <MicOff className="w-8 h-8" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </motion.button>

      <div className="text-center">
        <p className="text-lg font-medium text-foreground">
          {isProcessing ? 'Processing...' : isListening || isPressed ? 'Listening...' : 'Tap to Speak'}
        </p>
        <p className="text-sm text-muted-foreground">
          {isProcessing ? 'Converting speech to text' : isListening || isPressed ? 'Release to stop' : 'Hold and speak your question'}
        </p>
      </div>
    </div>
  );
};