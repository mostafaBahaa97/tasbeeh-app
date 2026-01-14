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

      {/* Theme Toggle */}
      {screen !== 'splash' && (
        <div className="fixed top-20 right-4 z-50 flex gap-2">
          {['dark', 'light', 'classic'].map(th => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                theme === th ? 'scale-110 border-white' : 'border-transparent opacity-60'
              } ${
                th === 'dark' ? 'bg-gray-900' : 
                th === 'light' ? 'bg-white' : 
                'bg-amber-100'
              }`}
            />
          ))}
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
                