'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: '◈', href: '/dashboard' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col border-r border-white/[0.04]"
      style={{
        background: 'linear-gradient(180deg, rgba(8,5,25,0.95) 0%, rgba(5,2,18,0.98) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.04]">
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0"
        >
          <span className="text-white font-bold text-sm">E</span>
        </motion.div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/90 font-bold text-lg tracking-tight"
          >
            Earnest
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all ${
                isActive
                  ? 'bg-violet-500/15 text-violet-400 border border-violet-500/20'
                  : 'text-white/40 hover:bg-white/[0.04] hover:text-white/70 border border-transparent'
              }`}
            >
              <span className="text-lg shrink-0 w-6 text-center">{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </motion.a>
          );
        })}
      </nav>

      {/* User info & collapse toggle */}
      <div className="p-3 border-t border-white/[0.04]">
        {!collapsed && user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium text-white/70 truncate">{user.name}</p>
            <p className="text-xs text-white/30 truncate">{user.email}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-white/40 hover:text-white/60 transition-all text-sm border border-white/[0.04]"
          >
            {collapsed ? '→' : '← Collapse'}
          </motion.button>
          {!collapsed && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400/60 hover:text-red-400 transition-all text-sm border border-red-500/10"
            >
              Exit
            </motion.button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
