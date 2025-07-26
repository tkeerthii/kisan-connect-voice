import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from './auth/SplashScreen';
import { LoginScreen } from './auth/LoginScreen';
import { HomePage } from './home/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { TipsPage } from './pages/TipsPage';
import { SettingsPage } from './pages/SettingsPage';
import { BottomNav } from './layout/BottomNav';

type AppState = 'splash' | 'login' | 'home';
type TabState = 'home' | 'tips' | 'history' | 'settings';

export const MyKisanApp = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeTab, setActiveTab] = useState<TabState>('home');
  const [user, setUser] = useState<{ name: string } | null>(null);

  const handleGetStarted = () => {
    setAppState('login');
  };

  const handleBack = () => {
    setAppState('splash');
  };

  const handleLogin = () => {
    // Simulate Firebase login
    setUser({ name: 'Ravi Kumar' });
    setAppState('home');
    setActiveTab('home');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('splash');
    setActiveTab('home');
  };

  const handleTabChange = (tab: TabState) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (appState) {
      case 'splash':
        return <SplashScreen onGetStarted={handleGetStarted} />;
      case 'login':
        return <LoginScreen onBack={handleBack} onLogin={handleLogin} />;
      case 'home':
        switch (activeTab) {
          case 'home':
            return <HomePage user={user} />;
          case 'history':
            return <HistoryPage />;
          case 'tips':
            return <TipsPage />;
          case 'settings':
            return <SettingsPage onLogout={handleLogout} />;
          default:
            return <HomePage user={user} />;
        }
      default:
        return <SplashScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      
      {appState === 'home' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};