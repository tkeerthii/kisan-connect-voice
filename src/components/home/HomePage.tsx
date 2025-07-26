import { useState } from 'react';
import { motion } from 'framer-motion';
import { VoiceButton } from './VoiceButton';
import { QuickTools } from './QuickTools';
import { BottomPopup } from './BottomPopup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useVoice } from '@/hooks/useVoice';
import { useToast } from '@/hooks/use-toast';
import { Send, Sun, MapPin } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  features: string[];
}

interface HomePageProps {
  user: { name: string } | null;
}

export const HomePage = ({ user }: HomePageProps) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
  
  const { toast } = useToast();
  const { 
    isListening, 
    isProcessing, 
    transcript, 
    error, 
    startListening, 
    stopListening, 
    speakText 
  } = useVoice('en-IN');

  const handleVoiceStart = () => {
    startListening();
  };

  const handleVoiceStop = () => {
    stopListening();
  };

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedTool(null);
  };

  const handlePopupAction = (actionType: string, data?: any) => {
    console.log('Action:', actionType, data);
    
    switch (actionType) {
      case 'upload':
        toast({
          title: "Upload Feature",
          description: "Photo upload functionality will be implemented here",
        });
        break;
      case 'camera':
        toast({
          title: "Camera Feature", 
          description: "Camera capture functionality will be implemented here",
        });
        break;
      case 'voice':
        handleVoiceStart();
        break;
      case 'text':
        if (data) {
          toast({
            title: "Processing Query",
            description: `Processing: "${data}"`,
          });
          // Process the text query here
        }
        break;
    }
    handlePopupClose();
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      toast({
        title: "Processing Query",
        description: `Processing: "${textInput}"`,
      });
      speakText(`Processing your query: ${textInput}`);
      setTextInput('');
    }
  };

  // Show voice transcript result
  if (transcript && !isListening) {
    toast({
      title: "Voice Input Received",
      description: transcript,
    });
    speakText(`I heard: ${transcript}. Let me help you with that.`);
  }

  // Show voice errors
  if (error) {
    toast({
      title: "Voice Error",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen gradient-earth pb-20">
      {/* Header */}
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              👋 Welcome, {user?.name || 'Farmer'}
            </h1>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Sun className="w-4 h-4" />
                <span>28°C Sunny</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Karnataka</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            {user?.name?.[0] || 'F'}
          </div>
        </motion.div>

        {/* Voice Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <VoiceButton
            onVoiceStart={handleVoiceStart}
            onVoiceStop={handleVoiceStop}
            isListening={isListening}
            isProcessing={isProcessing}
          />
        </motion.div>

        {/* Text Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex space-x-2 mb-8"
        >
          <Input
            placeholder="Type your farming question..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="flex-1 bg-card border-border rounded-2xl"
            onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
          />
          <Button
            onClick={handleTextSubmit}
            size="sm"
            className="gradient-primary text-primary-foreground px-4 rounded-2xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Quick Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <QuickTools onToolSelect={handleToolSelect} />
        </motion.div>
      </div>

      {/* Bottom Popup */}
      <BottomPopup
        isOpen={isPopupOpen}
        tool={selectedTool}
        onClose={handlePopupClose}
        onAction={handlePopupAction}
      />
    </div>
  );
};