import { motion } from "framer-motion";
const CompleteScreen = ({ theme, restart }) => {
  const t = theme;

  return (
    <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-8xl mb-8">✨</div>
                  <h1 className="text-4xl font-bold mb-4">
                    الحَمْدُ لِلَّهِ الَّذِي هَدَانِي لِهَٰذَا
                  </h1>
                  <p className={`text-xl ${t.textSub} mb-12`}>
                    تم إكمال جميع الأذكار
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restart}
                    className={`${t.button} text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl`}
                  >
                    العودة للرئيسية
                  </motion.button>
                </motion.div>
              </motion.div> 
  );
};

export default CompleteScreen;