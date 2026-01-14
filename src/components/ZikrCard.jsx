import { motion, AnimatePresence } from "framer-motion";

const ZikrCard = ({ theme, currentZikr, repeatCount, handleRepeat, circumference, strokeOffset }) => {
  const t = theme;

  return (
    <div className="flex-1 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentZikr.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className={`${t.card} border-2 rounded-3xl p-8 max-w-2xl w-full shadow-2xl`}
        >
          <div className="text-center mb-8">
            <p className="text-2xl leading-relaxed mb-6 whitespace-pre-line">
              {currentZikr.text}
            </p>
            <p className={`text-sm ${t.textSub}`}>{currentZikr.source}</p>
          </div>

          {/* Counter Button with Ring */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-300/30"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="70"
                  className={t.ring}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: 0.3 }}
                />
              </svg>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleRepeat}
                className={`absolute inset-0 m-auto w-32 h-32 ${t.button} text-white rounded-full text-4xl font-bold shadow-xl flex items-center justify-center`}
              >
                {repeatCount}
              </motion.button>
            </div>

            <p className={`${t.textSub} text-sm`}>
              {repeatCount > 1 ? 'اضغط للتكرار' : 'اضغط للانتقال'}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ZikrCard;