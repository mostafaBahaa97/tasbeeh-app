import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AZKAR_DATA } from './data/azkarData';
import { themes } from './themes/themes';
import SplashScreen from './components/SplashScreen';
import SelectionScreen from './components/SelectionScreen';
import AzkarScreen from './components/AzkarScreen';
import CompleteScreen from './components/CompleteScreen';
import CounterScreen from './components/CounterScreen';



const App = () => {
  const [theme, setTheme] = useState('dark');
  const [screen, setScreen] = useState('splash');
  const [selectedType, setSelectedType] = useState(null);
  const [azkarList, setAzkarList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const beforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', beforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', beforeInstallPrompt);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('tasbeeh-theme') || 'dark';
    setTheme(savedTheme);
    
    setTimeout(() => {
      setScreen('selection');
    }, 3000);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasbeeh-theme', theme);
  }, [theme]);

  
  const t = themes[theme];

  const startAzkar = (type) => {
    const data = type === 'morning' ? AZKAR_DATA.morning : AZKAR_DATA.evening;
    setAzkarList(data);
    setSelectedType(type);
    setCurrentIndex(0);
    setRepeatCount(data[0].repeat);
    setScreen('azkar');
  };

  const handleRepeat = () => {
    if (repeatCount > 1) {
      setRepeatCount(repeatCount - 1);
    } else {
      if (currentIndex < azkarList.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setRepeatCount(azkarList[currentIndex + 1].repeat);
        }, 300);
      } else {
        setScreen('complete');
      }
    }
  };

  const resetApp = () => {
    setScreen('selection');
    setSelectedType(null);
    setAzkarList([]);
    setCurrentIndex(0);
    setRepeatCount(0);
  };

  const startCounter = () => {
    setScreen('counter');
  };

  const progress = azkarList.length > 0 ? ((currentIndex) / azkarList.length) * 100 : 0;
  const currentZikr = azkarList[currentIndex];
  const circumference = 2 * Math.PI * 70;
  const strokeOffset = circumference - (repeatCount / (currentZikr?.repeat || 1)) * circumference;

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} transition-all duration-500 font-sans`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
          * { font-family: 'Cairo', sans-serif; }
          .fade-in { animation: fadeIn 0.5s ease-in; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}
      </style>

      {/* Theme Toggle Button */}
      {screen !== 'splash' && (
        <div className="fixed top-4 right-4 z-50 flex gap-3 items-start">
          {/* Install Button */}
          {deferredPrompt && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={async () => {
                if (deferredPrompt) {
                  deferredPrompt.prompt();
                  const result = await deferredPrompt.userChoice;
                  if (result.outcome === 'accepted') {
                    setDeferredPrompt(null);
                  }
                }
              }}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${t.button} text-white shadow-lg`}
              title="Install App"
            >
              ⬇️
            </motion.button>
          )}

          <div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${t.button} text-white shadow-lg`}
              title="Change Theme"
            >
              🎨
            </motion.button>
            
            {/* Theme Menu */}
            <AnimatePresence>
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className={`absolute top-16 right-0 ${t.card} border-2 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-max`}
                >
                  {['dark', 'light', 'classic'].map(th => (
                    <motion.button
                      key={th}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setTheme(th);
                        setShowThemeMenu(false);
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        theme === th 
                          ? `${t.button} text-white scale-105` 
                          : `${t.bg} ${t.textSub} hover:opacity-80`
                      }`}
                    >
                      {th === 'dark' ? '🌙 Dark' : th === 'light' ? '☀️ Light' : '🌰 Classic'}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <SplashScreen theme={t} />
        )}

        {screen === 'selection' && (
          <SelectionScreen theme={t} startAzkar={startAzkar} startCounter={startCounter} />
        )}

        {screen === 'azkar' && currentZikr && (
          <AzkarScreen
            theme={t}
            azkarList={azkarList}
            currentIndex={currentIndex}
            repeatCount={repeatCount}
            handleRepeat={handleRepeat}
            resetApp={resetApp}
          />
        )}

        {screen === 'complete' && (
          <CompleteScreen theme={t} restart={resetApp} />
        )}

        {screen === 'counter' && (
          <CounterScreen theme={t} onBack={resetApp} />
        )}
      </AnimatePresence>

      {/* Footer */}
      {screen !== 'splash' && (
        <div className="fixed bottom-4 left-0 right-0 text-center">
          <p className={`text-sm ${t.textSub}`}>
            Made with 🤍 by Mostafa Bahaa
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
                