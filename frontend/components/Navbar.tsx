'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function Navbar({ search, onSearchChange, statusFilter, onStatusFilterChange }: NavbarProps) {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 border-b border-white/[0.04] px-6 py-3"
      style={{
        background: 'rgba(5, 2, 18, 0.8)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/80 placeholder-white/20 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
          />
        </div>

        {/* Filter + User */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-8 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm focus:outline-none focus:border-violet-500/40 transition-all cursor-pointer"
            >
              <option value="" className="bg-gray-900">All Tasks</option>
              <option value="PENDING" className="bg-gray-900">Pending</option>
              <option value="COMPLETED" className="bg-gray-900">Completed</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">▼</span>
          </div>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/80 to-indigo-600/80 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
