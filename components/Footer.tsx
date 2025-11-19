
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export const Footer: React.FC = () => {
  const [dbStatus, setDbStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkConnection = async () => {
      if (!supabase) {
        setDbStatus('offline');
        return;
      }
      // Try to fetch 1 row (it might be empty, but if it doesn't error, we are good)
      const { error } = await supabase.from('match_analysis').select('id').limit(1);
      
      // If error code is "PGRST116" (no rows) or null, we are connected.
      // If error is "404" or network error, we are offline.
      if (error && error.code !== 'PGRST116') { 
        console.error("DB Check Failed:", error);
        setDbStatus('offline');
      } else {
        setDbStatus('online');
      }
    };

    checkConnection();
  }, []);

  return (
    <footer className="py-6 mt-12 bg-dark-surface border-t border-gray-700/50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-dark-text-secondary">
          © {new Date().getFullYear()} Sports Analysis Pro. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-2 max-w-2xl mx-auto mb-4">
          Disclaimer: This platform provides analysis based on historical data and proprietary algorithmic modeling for informational and entertainment purposes only. It is not intended as, and should not be used for, betting or financial advice. We do not guarantee the accuracy or outcome of any analysis. Please gamble responsibly.
        </p>
        
        {/* System Status Indicator */}
        <div className="flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
                dbStatus === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 
                dbStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 
                'bg-red-500'
            }`}></div>
            <span className="text-[10px] uppercase tracking-widest text-gray-600 font-mono">
                {dbStatus === 'online' ? 'System Online' : dbStatus === 'checking' ? 'Connecting...' : 'System Offline'}
            </span>
        </div>
      </div>
    </footer>
  );
};
