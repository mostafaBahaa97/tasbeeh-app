import { motion } from 'framer-motion';

const SplashScreen = ({ theme }) => {
  const t = theme;

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1 
          className="text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          تسبيح
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.5, duration: 1 }}
          className={`h-1 ${t.progress} rounded-full`}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
