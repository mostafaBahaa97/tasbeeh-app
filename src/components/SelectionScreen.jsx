import { motion } from 'framer-motion';

const SelectionScreen = ({ theme, startAzkar, startCounter }) => {
  const t = theme;

  return (
    <motion.div
      key="selection"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <h1 className="text-5xl font-bold mb-16">اختر نوع الأذكار</h1>
      <div className="grid gap-8 w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => startAzkar('morning')}
          className={`${t.card} border-2 p-12 rounded-3xl shadow-2xl transition-all`}
        >
          <div className="text-7xl mb-4">☀️</div>
          <h2 className="text-3xl font-bold">أذكار الصباح</h2>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => startAzkar('evening')}
          className={`${t.card} border-2 p-12 rounded-3xl shadow-2xl transition-all`}
        >
          <div className="text-7xl mb-4">🌙</div>
          <h2 className="text-3xl font-bold">أذكار المساء</h2>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startCounter}
          className={`${t.card} border-2 p-12 rounded-3xl shadow-2xl transition-all`}
        >
          <div className="text-7xl mb-4">📿</div>
          <h2 className="text-3xl font-bold">سبحة</h2>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SelectionScreen;
