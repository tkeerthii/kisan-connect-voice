import { motion } from 'framer-motion';
import { Camera, TrendingUp, FileText, MessageCircle } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  features: string[];
}

const tools: Tool[] = [
  {
    id: 'crop-diagnosis',
    name: 'Crop Diagnosis',
    icon: <Camera className="w-6 h-6" />,
    description: 'AI-powered crop health analysis',
    color: 'from-green-500 to-emerald-600',
    features: [
      'Upload crop photos',
      'Instant disease detection',
      'Treatment recommendations',
      'Preventive measures'
    ]
  },
  {
    id: 'market-advisory',
    name: 'Market Advisory',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Real-time market prices & trends',
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Live mandi prices',
      'Price trend analysis',
      'Best selling locations',
      'Demand forecasts'
    ]
  },
  {
    id: 'subsidy-navigator',
    name: 'Subsidy Navigator',
    icon: <FileText className="w-6 h-6" />,
    description: 'Government schemes & subsidies',
    color: 'from-purple-500 to-pink-600',
    features: [
      'Scheme eligibility check',
      'Application assistance',
      'Document requirements',
      'Status tracking'
    ]
  },
  {
    id: 'voice-assistant',
    name: 'Voice Assistant',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'Multilingual farming assistant',
    color: 'from-orange-500 to-red-600',
    features: [
      'Voice commands',
      'Multiple languages',
      'Natural conversations',
      'Instant responses'
    ]
  }
];

interface QuickToolsProps {
  onToolSelect: (tool: Tool) => void;
}

export const QuickTools = ({ onToolSelect }: QuickToolsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Quick Tools</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onToolSelect(tool)}
            className="tool-card group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
              {tool.icon}
            </div>
            <h3 className="font-medium text-foreground mb-1 text-sm">
              {tool.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {tool.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};