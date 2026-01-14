import { motion } from "framer-motion";
import ZikrCard from "./ZikrCard";

const AzkarScreen = ({ theme, azkarList, currentIndex, repeatCount, handleRepeat, resetApp }) => {
  const t = theme;
  const currentZikr = azkarList[currentIndex];
  const progress = azkarList.length > 0 ? (currentIndex / azkarList.length) * 100 : 0;
  const circumference = 2 * Math.PI * 70;
  const strokeOffset = circumference - (repeatCount / (currentZikr?.repeat || 1)) * circumference;

  return (
    <motion.div
      key="azkar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col p-6"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm">
          <span>{currentIndex + 1} / {azkarList.length}</span>
          <button onClick={resetApp} className={`${t.textSub} hover:underline`}>
            العودة
          </button>
        </div>
        <div className="w-full bg-gray-300/30 rounded-full h-2">
          <motion.div
            className={`h-full ${t.progress} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Zikr Card */}
      {currentZikr && (
        <ZikrCard
          theme={t}
          currentZikr={currentZikr}
          repeatCount={repeatCount}
          handleRepeat={handleRepeat}
          circumference={circumference}
          strokeOffset={strokeOffset}
        />
      )}
    </motion.div>
  );
};

export default AzkarScreen;