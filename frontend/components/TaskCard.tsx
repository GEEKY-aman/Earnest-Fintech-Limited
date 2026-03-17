'use client';

import { motion } from 'framer-motion';
import { Task } from '@/hooks/useTasks';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggle: (id: string) => void;
  index: number;
}

export function TaskCard({ task, onEdit, onDelete, onToggle, index }: TaskCardProps) {
  const isCompleted = task.status === 'COMPLETED';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 20px 60px -15px rgba(139, 92, 246, 0.3)' }}
      className="group relative p-5 rounded-2xl border transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        borderColor: isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.06), transparent 40%)',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <h3 className={`text-base font-semibold leading-tight flex-1 ${isCompleted ? 'line-through text-white/40' : 'text-white/90'}`}>
            {task.title}
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(task.id)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
                : 'bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/25'
            }`}
          >
            {isCompleted ? '✓ Done' : '◷ Pending'}
          </motion.button>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-white/40 mb-4 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/25">
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>

          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(task)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white/90 border border-white/[0.06] transition-all"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400/70 hover:text-red-400 border border-red-500/10 transition-all"
            >
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
