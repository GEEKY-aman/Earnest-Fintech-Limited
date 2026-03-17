'use client';

import { useState, useCallback, useEffect } from 'react';
import api from '@/lib/api';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UseTasksReturn {
  tasks: Task[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: string, data: { title?: string; description?: string; status?: string }) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  page: number;
  setPage: (p: number) => void;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, string | number> = { page, limit: 10 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;

      const response = await api.get('/tasks', { params });
      setTasks(response.data.data.tasks);
      setPagination(response.data.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (title: string, description?: string) => {
    await api.post('/tasks', { title, description: description || null });
    await fetchTasks();
  }, [fetchTasks]);

  const updateTask = useCallback(async (id: string, data: { title?: string; description?: string; status?: string }) => {
    await api.patch(`/tasks/${id}`, data);
    await fetchTasks();
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id: string) => {
    await api.delete(`/tasks/${id}`);
    await fetchTasks();
  }, [fetchTasks]);

  const toggleTask = useCallback(async (id: string) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } : t
      )
    );
    try {
      await api.patch(`/tasks/${id}/toggle`);
    } catch {
      await fetchTasks(); // Revert on failure
    }
  }, [fetchTasks]);

  return {
    tasks,
    pagination,
    loading,
    error,
    fetchTasks,
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
  };
}
