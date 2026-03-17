'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks, Task } from '@/hooks/useTasks';
import { useToast } from '@/components/Toast';
import { Navbar } from '@/components/Navbar';
import { TaskCard } from '@/components/TaskCard';
import { TaskModal } from '@/components/TaskModal';
import { DeleteDialog } from '@/components/DeleteDialog';
import { TaskCardSkeleton } from '@/components/Skeleton';

export default function DashboardPage() {
  const {
    tasks,
    pagination,
    loading,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
  } = useTasks();

  const { showToast } = useToast();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  // Stats
  const totalTasks = pagination?.total || 0;
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED').length;
  // Note: the above completed stat is just for the current page. We can derive a rough estimate or fetch real stats from API.
  // For the sake of the Antigravity UI, let's just show local page stats if full stats aren't available from API.
  const pendingTasks = tasks.filter((t) => t.status === 'PENDING').length;

  const handleCreateTask = async (title: string, description: string) => {
    await createTask(title, description);
    showToast('Task created successfully', 'success');
  };

  const handleUpdateTask = async (title: string, description: string) => {
    if (editingTask) {
      await updateTask(editingTask.id, { title, description });
      showToast('Task updated successfully', 'success');
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async () => {
    if (deletingTask) {
      await deleteTask(deletingTask.id);
      showToast('Task deleted successfully', 'success');
      setDeletingTask(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    await toggleTask(id);
    const task = tasks.find((t) => t.id === id);
    if (task) {
      showToast(`Task marked as ${task.status === 'COMPLETED' ? 'pending' : 'completed'}`, 'info');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full relative">
        {/* Animated Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        {/* Header & Stats Container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold tracking-tight text-white mb-2"
            >
              My Tasks
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/50"
            >
              You have {totalTasks} tasks in total.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-500/20 transition-all shrink-0"
          >
            <span className="text-xl leading-none">+</span> Create Task
          </motion.button>
        </div>

        {/* Task Grid */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <TaskCardSkeleton key={i} />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 rounded-3xl border border-white/[0.04] bg-white/[0.01]"
            >
              <div className="w-24 h-24 mb-6 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/[0.04]">
                <span className="text-4xl opacity-50">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-white/80 mb-2">No tasks found</h3>
              <p className="text-white/40 max-w-sm">
                {search || statusFilter
                  ? "We couldn't find any tasks matching your current filters."
                  : "You're all caught up! Enjoy your free time or create a new task to get started."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onToggle={handleToggleTask}
                    onEdit={(t) => {
                      setEditingTask(t);
                      setIsModalOpen(true);
                    }}
                    onDelete={(t) => {
                      setDeletingTask(t);
                      setIsDeleteDialogOpen(true);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 mb-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 disabled:opacity-30 disabled:hover:bg-white/[0.04] border border-white/[0.06] transition-all"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-white/40">
              Page <span className="text-white/90">{page}</span> of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 disabled:opacity-30 disabled:hover:bg-white/[0.04] border border-white/[0.06] transition-all"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => setEditingTask(null), 300); // delay clear for exit animation
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setTimeout(() => setDeletingTask(null), 300);
        }}
        onConfirm={handleDeleteTask}
        taskTitle={deletingTask?.title || ''}
      />
    </div>
  );
}
