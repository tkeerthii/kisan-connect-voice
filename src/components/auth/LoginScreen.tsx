import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

export const LoginScreen = ({ onBack, onLogin }: LoginScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen gradient-earth flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-10 h-10 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold ml-4">Welcome to MyKisanAI</h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 mx-auto mb-8 gradient-primary rounded-3xl flex items-center justify-center shadow-glow">
            <span className="text-4xl">🌾</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Join the Future of Farming
          </h1>
          <p className="text-muted-foreground max-w-sm">
            Access AI-powered tools designed specifically for Indian farmers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm space-y-4"
        >
          <Button
            onClick={onLogin}
            className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 font-medium py-4 rounded-2xl shadow-warm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-3"
            size="lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-border hover:bg-secondary font-medium py-4 rounded-2xl transition-all duration-300"
            size="lg"
            disabled
          >
            Phone Number (Coming Soon)
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground max-w-xs">
            By signing up, you agree to our{' '}
            <span className="text-primary underline">Terms of Service</span>{' '}
            and{' '}
            <span className="text-primary underline">Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};