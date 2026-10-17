import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

const APP_URL = 'https://tasbeeh-app-coral.vercel.app/';

const ShareModal = ({ isOpen, onClose, theme }) => {
  const t = theme;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(APP_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'تطبيق التسبيح',
        text: 'جرّب تطبيق التسبيح الرائع! 📿',
        url: APP_URL,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}
          >
            <div
              className={`${t.card} border-2 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-5 max-w-sm w-full pointer-events-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between">
                <h2 className="text-2xl font-bold">شارك التطبيق 📿</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${t.button} text-white`}
                >
                  ✕
                </motion.button>
              </div>

              {/* QR Code */}
              <div className="bg-white p-5 rounded-2xl shadow-inner">
                <QRCodeSVG
                  value={APP_URL}
                  size={220}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>

              <p className={`text-sm ${t.textSub} text-center`}>
                امسح الكود بكاميرا هاتفك لفتح التطبيق
              </p>

              {/* Link */}
              <div className={`w-full flex items-center gap-2 ${t.bg} border rounded-xl px-3 py-2`}>
                <span className={`flex-1 text-xs truncate ${t.textSub}`}>{APP_URL}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyLink}
                  className={`text-xs px-3 py-1 rounded-lg ${t.button} text-white font-semibold shrink-0`}
                >
                  {copied ? '✓ تم!' : 'نسخ'}
                </motion.button>
              </div>

              {/* Native Share (mobile) */}
              {typeof navigator !== 'undefined' && navigator.share && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNativeShare}
                  className={`w-full py-3 rounded-2xl ${t.button} text-white font-bold text-lg shadow-lg`}
                >
                  مشاركة ↗
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
