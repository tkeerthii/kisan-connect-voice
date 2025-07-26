import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mic, Camera, TrendingUp, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: <Camera className="w-12 h-12" />,
    title: "Diagnose Crop Issues",
    description: "Upload photos of your crops for instant AI-powered health analysis and treatment recommendations",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: <TrendingUp className="w-12 h-12" />,
    title: "Real-time Mandi Prices",
    description: "Get live market prices for your crops across different mandis to make informed selling decisions",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: <FileText className="w-12 h-12" />,
    title: "Government Schemes",
    description: "Discover subsidies and schemes you're eligible for with personalized recommendations",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: <Mic className="w-12 h-12" />,
    title: "Voice Assistant",
    description: "Speak naturally in your language - Hindi, Telugu, Kannada, or English for instant help",
    gradient: "from-orange-500 to-red-600"
  }
];

interface SplashScreenProps {
  onGetStarted: () => void;
}

export const SplashScreen = ({ onGetStarted }: SplashScreenProps) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="min-h-screen gradient-earth flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-3xl flex items-center justify-center shadow-glow">
            <span className="text-3xl font-bold text-primary-foreground">🌾</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            My<span className="text-primary">Kisan</span>AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm">
            Your AI-powered farming companion for smarter agriculture
          </p>
        </motion.div>

        {/* Feature Carousel */}
        <div className="w-full max-w-md relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 shadow-warm border border-border/50 min-h-[280px]"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[currentFeature].gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {features[currentFeature].icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {features[currentFeature].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {features[currentFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevFeature}
              className="w-10 h-10 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeature ? 'bg-primary w-8' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextFeature}
              className="w-10 h-10 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            onClick={onGetStarted}
            className="w-full gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-primary hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
            size="lg"
          >
            Get Started 🚀
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            By continuing, you agree to our Terms of Service
          </p>
        </motion.div>
      </div>
    </div>
  );
};