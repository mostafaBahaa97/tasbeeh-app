import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CounterScreen = ({ theme, onBack }) => {
  const t = theme;
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <motion.div
      key="counter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      {/* Back Button */}
      <div className="fixed top-20 left-4 z-50">
        <button onClick={onBack} className={`${t.textSub} hover:underline text-lg`}>
          العودة
        </button>
      </div>

      {/* Counter Display */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-5xl font-bold mb-12">سبحة</h1>

        {/* Main Counter Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={`${t.card} border-4 rounded-full w-64 h-64 flex items-center justify-center shadow-2xl transition-all hover:scale-105`}
        >
          <span className={`text-8xl font-bold ${t.text}`}>{count}</span>
        </motion.button>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetCounter}
          className={`${t.button} text-white px-12 py-4 rounded-full text-lg font-bold shadow-xl mt-12`}
        >
          إعادة تعيين
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CounterScreen;
