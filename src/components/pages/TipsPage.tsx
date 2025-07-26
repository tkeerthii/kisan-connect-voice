import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, CloudRain, DollarSign, Wheat, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  thumbnail: string;
  content: string;
}

const categories = [
  { id: 'all', name: 'All', icon: Filter },
  { id: 'soil', name: 'Soil', icon: Sprout },
  { id: 'weather', name: 'Weather', icon: CloudRain },
  { id: 'crops', name: 'Crops', icon: Wheat },
  { id: 'finance', name: 'Finance', icon: DollarSign },
];

const mockTips: Tip[] = [
  {
    id: '1',
    title: 'Optimal Soil pH for Better Crop Yield',
    description: 'Learn how to test and maintain the right soil pH for maximum productivity',
    category: 'soil',
    readTime: '5 min read',
    thumbnail: '🌱',
    content: 'Detailed content about soil pH management...'
  },
  {
    id: '2',
    title: 'Weather-Based Irrigation Planning',
    description: 'Smart irrigation techniques based on weather forecasts and soil moisture',
    category: 'weather',
    readTime: '7 min read',
    thumbnail: '🌧️',
    content: 'Detailed content about irrigation planning...'
  },
  {
    id: '3',
    title: 'Maximizing Profit from Wheat Cultivation',
    description: 'Best practices for wheat farming from sowing to market',
    category: 'crops',
    readTime: '10 min read',
    thumbnail: '🌾',
    content: 'Detailed content about wheat cultivation...'
  },
  {
    id: '4',
    title: 'Understanding Government Loan Schemes',
    description: 'Complete guide to agricultural loans and subsidies available',
    category: 'finance',
    readTime: '8 min read',
    thumbnail: '💰',
    content: 'Detailed content about loan schemes...'
  },
  {
    id: '5',
    title: 'Organic Pest Control Methods',
    description: 'Natural ways to protect your crops without harmful chemicals',
    category: 'crops',
    readTime: '6 min read',
    thumbnail: '🐛',
    content: 'Detailed content about pest control...'
  },
  {
    id: '6',
    title: 'Monsoon Preparation Checklist',
    description: 'Essential steps to prepare your farm for the monsoon season',
    category: 'weather',
    readTime: '4 min read',
    thumbnail: '☔',
    content: 'Detailed content about monsoon preparation...'
  }
];

export const TipsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  const filteredTips = selectedCategory === 'all' 
    ? mockTips 
    : mockTips.filter(tip => tip.category === selectedCategory);

  const handleTipSelect = (tip: Tip) => {
    setSelectedTip(tip);
  };

  if (selectedTip) {
    return (
      <div className="min-h-screen gradient-earth pb-20">
        <div className="p-6 pt-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              onClick={() => setSelectedTip(null)}
              className="mb-4 p-0 h-auto text-primary hover:text-primary/80"
            >
              ← Back to Tips
            </Button>
            
            <div className="bg-card rounded-2xl p-6 shadow-warm border border-border/50">
              <div className="text-4xl mb-4">{selectedTip.thumbnail}</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{selectedTip.title}</h1>
              <p className="text-muted-foreground mb-4">{selectedTip.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                <span>{selectedTip.readTime}</span>
                <span>•</span>
                <span className="capitalize">{selectedTip.category}</span>
              </div>
              <div className="prose prose-gray max-w-none">
                <p>{selectedTip.content}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-earth pb-20">
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Farming Tips</h1>
          <p className="text-muted-foreground">Expert advice to improve your farming practices</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 whitespace-nowrap ${
                    isActive ? 'gradient-primary text-primary-foreground' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>
        </motion.div>

        {/* Tips Grid */}
        <div className="space-y-4">
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleTipSelect(tip)}
              className="bg-card rounded-2xl p-4 shadow-warm border border-border/50 cursor-pointer hover:shadow-primary hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{tip.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{tip.readTime}</span>
                      <span>•</span>
                      <span className="capitalize">{tip.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Sprout className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No tips found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};