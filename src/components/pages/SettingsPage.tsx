import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Globe, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Volume2,
  Moon,
  Smartphone
} from 'lucide-react';

interface SettingsPageProps {
  onLogout: () => void;
}

export const SettingsPage = ({ onLogout }: SettingsPageProps) => {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: <User className="w-5 h-5" />,
          label: 'Profile Settings',
          description: 'Manage your personal information',
          action: 'navigate'
        },
        {
          icon: <Globe className="w-5 h-5" />,
          label: 'Language',
          description: 'English',
          action: 'navigate'
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: <Bell className="w-5 h-5" />,
          label: 'Notifications',
          description: 'Push notifications for important updates',
          action: 'toggle',
          enabled: true
        },
        {
          icon: <Volume2 className="w-5 h-5" />,
          label: 'Voice Responses',
          description: 'Enable text-to-speech for AI responses',
          action: 'toggle',
          enabled: true
        },
        {
          icon: <Moon className="w-5 h-5" />,
          label: 'Dark Mode',
          description: 'Switch to dark theme',
          action: 'toggle',
          enabled: false
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle className="w-5 h-5" />,
          label: 'Help Center',
          description: 'Get help and support',
          action: 'navigate'
        },
        {
          icon: <Smartphone className="w-5 h-5" />,
          label: 'Contact Support',
          description: 'Reach out to our team',
          action: 'navigate'
        },
        {
          icon: <Shield className="w-5 h-5" />,
          label: 'Privacy Policy',
          description: 'Read our privacy policy',
          action: 'navigate'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen gradient-earth pb-20">
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your MyKisanAI experience</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-warm border border-border/50 mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold">
              F
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Farmer Name</h3>
              <p className="text-sm text-muted-foreground">farmer@example.com</p>
              <p className="text-xs text-muted-foreground mt-1">Karnataka, India</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </motion.div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (groupIndex + 1) * 0.1 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
                {group.title}
              </h3>
              <div className="bg-card rounded-2xl shadow-warm border border-border/50 overflow-hidden">
                {group.items.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between p-4 ${
                      index !== group.items.length - 1 ? 'border-b border-border/50' : ''
                    } hover:bg-secondary/50 transition-colors duration-200`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-muted-foreground">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    {item.action === 'toggle' ? (
                      <Switch defaultChecked={item.enabled} />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground py-4 rounded-2xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 pt-6"
        >
          <p className="text-xs text-muted-foreground">
            MyKisanAI v1.0.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Made with 🌾 for Indian Farmers
          </p>
        </motion.div>
      </div>
    </div>
  );
};