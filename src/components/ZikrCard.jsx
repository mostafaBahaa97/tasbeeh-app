import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SWIPE_THRESHOLD = 60;

const ZikrCard = ({
  theme,
  currentZikr,
  repeatCount,
  handleRepeat,
  circumference,
  strokeOffset,
  onSkip,
  onPrev,
  canGoPrev,
}) => {
  const t = theme;
  const [showVirtue, setShowVirtue] = useState(false);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) {
      // إيماءة يمين -> تخطي
      onSkip && onSkip();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      // إيماءة شمال -> رجوع للسابق
      onPrev && onPrev();
    }
  };

  const hasVirtue = currentZikr.virtue && currentZikr.virtue.trim().length > 0;

  return (
    <div className="flex-1 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentZikr.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`${t.card} border-2 rounded-3xl p-8 max-w-2xl w-full shadow-2xl`}
        >
          <div className="text-center mb-6">
            <p className="text-2xl leading-relaxed mb-6 whitespace-pre-line">
              {currentZikr.text}
            </p>
            <p className={`text-sm ${t.textSub} mb-4`}>{currentZikr.source}</p>

            {/* زرار فضل الذكر */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVirtue(true)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border-2 ${t.textSub} border-current hover:opacity-90 transition-all`}
            >
              📖 فضل الذكر
            </motion.button>
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

            <p className={`${t.textSub} text-sm mb-5`}>
              {repeatCount > 1 ? 'اضغط للتكرار' : 'اضغط للانتقال'}
            </p>

            {/* أزرار السابق والتخطي */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={canGoPrev ? { scale: 1.05 } : {}}
                whileTap={canGoPrev ? { scale: 0.9 } : {}}
                onClick={() => canGoPrev && onPrev && onPrev()}
                disabled={!canGoPrev}
                className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold border-2 border-current transition-all ${
                  canGoPrev ? `${t.textSub} hover:opacity-90` : `${t.textSub} opacity-30 cursor-not-allowed`
                }`}
              >
                ⏮ السابق
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSkip && onSkip()}
                className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-bold border-2 border-current ${t.textSub} hover:opacity-90 transition-all`}
              >
                تخطي ⏭
              </motion.button>
            </div>

            
          </div>
        </motion.div>
      </AnimatePresence>

      {/* مودال فضل الذكر */}
      <AnimatePresence>
        {showVirtue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVirtue(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className={`${t.card} border-2 rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto`}
            >
              <h3 className={`text-2xl font-bold mb-4 ${t.text}`}>📖 فضل الذكر</h3>
              <p className={`text-lg leading-relaxed whitespace-pre-line mb-6 ${t.text}`}>
                {hasVirtue ? currentZikr.virtue : 'ذكر طيب'}
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVirtue(false)}
                className={`${t.button} text-white px-8 py-3 rounded-full font-bold w-full shadow-lg`}
              >
                إغلاق
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZikrCard;