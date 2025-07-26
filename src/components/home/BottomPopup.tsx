import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Upload, Camera, Mic, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  features: string[];
}

interface BottomPopupProps {
  isOpen: boolean;
  tool: Tool | null;
  onClose: () => void;
  onAction: (actionType: string, data?: any) => void;
}

export const BottomPopup = ({ isOpen, tool, onClose, onAction }: BottomPopupProps) => {
  const [textInput, setTextInput] = useState('');

  if (!tool) return null;

  const handleUpload = () => {
    onAction('upload');
  };

  const handleCamera = () => {
    onAction('camera');
  };

  const handleVoice = () => {
    onAction('voice');
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onAction('text', textInput);
      setTextInput('');
    }
  };

  const renderToolInterface = () => {
    switch (tool.id) {
      case 'crop-diagnosis':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleUpload}
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 border-dashed"
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm">Upload Photo</span>
              </Button>
              <Button
                onClick={handleCamera}
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 border-dashed"
              >
                <Camera className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm">Take Photo</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Upload clear photos of affected crop parts for accurate diagnosis
            </p>
          </div>
        );

      case 'market-advisory':
        return (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter crop name (e.g., wheat, rice)"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              />
              <Button onClick={handleTextSubmit} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleVoice}
              variant="outline"
              className="w-full flex items-center space-x-2"
            >
              <Mic className="w-4 h-4" />
              <span>Ask via Voice</span>
            </Button>
          </div>
        );

      case 'subsidy-navigator':
        return (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Describe your farming situation"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              />
              <Button onClick={handleTextSubmit} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleVoice}
              variant="outline"
              className="w-full flex items-center space-x-2"
            >
              <Mic className="w-4 h-4" />
              <span>Speak Your Query</span>
            </Button>
          </div>
        );

      case 'voice-assistant':
        return (
          <div className="space-y-4">
            <Button
              onClick={handleVoice}
              className="w-full gradient-primary text-primary-foreground py-4 flex items-center justify-center space-x-3"
            >
              <Mic className="w-5 h-5" />
              <span>Start Voice Chat</span>
            </Button>
            <div className="flex space-x-2">
              <Input
                placeholder="Type your farming question..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              />
              <Button onClick={handleTextSubmit} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Popup */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border rounded-t-3xl shadow-2xl z-50"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center text-white shadow-lg`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tool Interface */}
              {renderToolInterface()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};