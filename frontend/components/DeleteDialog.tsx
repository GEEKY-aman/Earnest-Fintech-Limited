'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

export function DeleteDialog({ isOpen, onClose, onConfirm, taskTitle }: DeleteDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] p-6 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(15,10,40,0.95) 0%, rgba(10,5,30,0.98) 100%)',
              boxShadow: '0 25px 80px -12px rgba(239, 68, 68, 0.2)',
            }}
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/15 flex items-center justify-center">
                <span className="text-2xl">🗑️</span>
              </div>
              <h3 className="text-lg font-bold text-white/90 mb-2">Delete Task</h3>
              <p className="text-sm text-white/50 mb-6">
                Are you sure you want to delete{' '}
                <span className="text-white/70 font-medium">&ldquo;{taskTitle}&rdquo;</span>?
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white/80 border border-white/[0.06] transition-all"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-500/25 transition-all"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
