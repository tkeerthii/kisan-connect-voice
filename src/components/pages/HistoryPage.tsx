import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Camera, TrendingUp, FileText } from 'lucide-react';

interface ChatHistory {
  id: string;
  tool: string;
  query: string;
  response: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'image';
}

const mockHistory: ChatHistory[] = [
  {
    id: '1',
    tool: 'Crop Diagnosis',
    query: 'Wheat leaves turning yellow',
    response: 'Detected nitrogen deficiency. Apply urea fertilizer...',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'image'
  },
  {
    id: '2',
    tool: 'Market Advisory',
    query: 'Rice prices in Bangalore mandi',
    response: 'Current rice price: ₹2,450 per quintal. 15% higher than last week...',
    timestamp: new Date('2024-01-15T09:15:00'),
    type: 'voice'
  },
  {
    id: '3',
    tool: 'Subsidy Navigator',
    query: 'PM-KISAN scheme eligibility',
    response: 'You are eligible for PM-KISAN. Next installment due in March...',
    timestamp: new Date('2024-01-14T16:45:00'),
    type: 'text'
  }
];

const getToolIcon = (tool: string) => {
  switch (tool) {
    case 'Crop Diagnosis':
      return <Camera className="w-4 h-4" />;
    case 'Market Advisory':
      return <TrendingUp className="w-4 h-4" />;
    case 'Subsidy Navigator':
      return <FileText className="w-4 h-4" />;
    default:
      return <MessageCircle className="w-4 h-4" />;
  }
};

const getToolColor = (tool: string) => {
  switch (tool) {
    case 'Crop Diagnosis':
      return 'from-green-500 to-emerald-600';
    case 'Market Advisory':
      return 'from-blue-500 to-indigo-600';
    case 'Subsidy Navigator':
      return 'from-purple-500 to-pink-600';
    default:
      return 'from-orange-500 to-red-600';
  }
};

const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

export const HistoryPage = () => {
  const groupedHistory = mockHistory.reduce((groups, item) => {
    const date = formatDate(item.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, ChatHistory[]>);

  return (
    <div className="min-h-screen gradient-earth pb-20">
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Conversation History</h1>
          <p className="text-muted-foreground">Review your past interactions with MyKisanAI</p>
        </motion.div>

        <div className="space-y-6">
          {Object.entries(groupedHistory).map(([date, items], groupIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
            >
              {/* Date Header */}
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{date}</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* Chat Items */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card rounded-2xl p-4 shadow-warm border border-border/50"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getToolColor(item.tool)} flex items-center justify-center text-white shadow-sm`}>
                          {getToolIcon(item.tool)}
                        </div>
                        <span className="font-medium text-foreground text-sm">{item.tool}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Query */}
                    <div className="mb-3">
                      <div className="bg-primary/10 text-primary rounded-lg p-3 text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium">Your Query:</span>
                          {item.type === 'voice' && <span className="text-xs">🎤</span>}
                          {item.type === 'image' && <span className="text-xs">📷</span>}
                        </div>
                        <p>{item.query}</p>
                      </div>
                    </div>

                    {/* Response */}
                    <div className="bg-secondary/50 text-secondary-foreground rounded-lg p-3 text-sm">
                      <div className="text-xs font-medium mb-1 text-muted-foreground">AI Response:</div>
                      <p>{item.response}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {mockHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No conversations yet</h3>
            <p className="text-muted-foreground">Start using MyKisanAI to see your conversation history here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};