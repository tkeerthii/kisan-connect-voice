import axios from 'axios';

// API Base Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.mykisanai.com' 
  : 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Endpoints
export const apiService = {
  // Text-to-Speech and Speech-to-Text
  async processVoice(audioData: Blob, language = 'en') {
    const formData = new FormData();
    formData.append('audio', audioData);
    formData.append('language', language);
    
    try {
      const response = await api.post('/tts_stt_tool/speak', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Voice processing error:', error);
      // Return mock response for demo
      return {
        text: 'Mock transcription: How are my wheat crops doing?',
        response: 'Your wheat crops look healthy! Consider checking soil moisture levels.',
        audioUrl: null
      };
    }
  },

  // Crop Diagnosis Tool
  async diagnoseCrop(imageFile: File, description?: string) {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (description) formData.append('description', description);
    
    try {
      const response = await api.post('/crop_diagnosis_tool', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Crop diagnosis error:', error);
      // Return mock response for demo
      return {
        diagnosis: 'Nitrogen Deficiency detected',
        confidence: 85,
        recommendations: [
          'Apply urea fertilizer at 50 kg/acre',
          'Increase watering frequency',
          'Monitor for 7-10 days'
        ],
        severity: 'Moderate',
        treatment_cost: '₹500-800 per acre'
      };
    }
  },

  // Market Advisory Tool
  async getMarketPrices(crop: string, location?: string) {
    try {
      const response = await api.post('/market_advisory_tool', {
        crop,
        location: location || 'Karnataka'
      });
      return response.data;
    } catch (error) {
      console.error('Market advisory error:', error);
      // Return mock response for demo
      return {
        crop,
        current_price: '₹2,450 per quintal',
        price_trend: '+15% from last week',
        best_markets: [
          { name: 'Bangalore APMC', price: '₹2,450', distance: '25 km' },
          { name: 'Mysore Mandi', price: '₹2,380', distance: '45 km' },
          { name: 'Tumkur Market', price: '₹2,420', distance: '35 km' }
        ],
        forecast: 'Prices expected to rise by 8-12% next week',
        demand: 'High demand expected due to festival season'
      };
    }
  },

  // Scheme Navigator Tool
  async getSchemeInfo(query: string, farmerProfile?: any) {
    try {
      const response = await api.post('/scheme_navigator_tool', {
        query,
        farmer_profile: farmerProfile
      });
      return response.data;
    } catch (error) {
      console.error('Scheme navigator error:', error);
      // Return mock response for demo
      return {
        eligible_schemes: [
          {
            name: 'PM-KISAN',
            description: 'Income support to farmer families',
            benefit: '₹6,000 per year',
            eligibility: 'All landholding farmers',
            application_process: 'Online through PM-KISAN portal',
            status: 'Eligible'
          },
          {
            name: 'Pradhan Mantri Fasal Bima Yojana',
            description: 'Crop insurance scheme',
            benefit: 'Up to ₹2 lakh coverage',
            eligibility: 'All farmers',
            application_process: 'Through banks or insurance companies',
            status: 'Apply before sowing season'
          }
        ],
        next_steps: [
          'Gather required documents (Aadhaar, land records)',
          'Visit nearest CSC or apply online',
          'Keep payment receipts for reference'
        ]
      };
    }
  }
};

// Utility functions for offline handling
export const handleOfflineError = (error: any) => {
  if (!navigator.onLine) {
    return {
      error: 'You are currently offline. Please check your internet connection.',
      type: 'offline'
    };
  }
  return {
    error: 'Something went wrong. Please try again.',
    type: 'network'
  };
};

// Local storage helpers for caching
export const cacheService = {
  set(key: string, data: any, ttl = 3600000) { // 1 hour default TTL
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(`mykisan_${key}`, JSON.stringify(item));
  },

  get(key: string) {
    const item = localStorage.getItem(`mykisan_${key}`);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(`mykisan_${key}`);
        return null;
      }
      return parsed.data;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    localStorage.removeItem(`mykisan_${key}`);
  },

  clear() {
    Object.keys(localStorage)
      .filter(key => key.startsWith('mykisan_'))
      .forEach(key => localStorage.removeItem(key));
  }
};