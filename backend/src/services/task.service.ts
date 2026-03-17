import prisma from '../utils/prisma';
import { ApiError } from '../utils/ApiError';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/task.schema';

export class TaskService {
  async getTasks(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      status?: string;
      search?: string;
    }
  ) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(50, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (options.status && ['PENDING', 'COMPLETED'].includes(options.status.toUpperCase())) {
      where.status = options.status.toUpperCase();
    }

    if (options.search) {
      where.title = { contains: options.search };
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTask(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    if (task.userId !== userId) {
      throw new ApiError(403, 'You do not have permission to access this task');
    }

    return task;
  }

  async createTask(userId: string, data: CreateTaskInput) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description || null,
        userId,
      },
    });
  }

  async updateTask(taskId: string, userId: string, data: UpdateTaskInput) {
    const task = await this.getTask(taskId, userId);

    return prisma.task.update({
      where: { id: task.id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await this.getTask(taskId, userId);

    await prisma.task.delete({
      where: { id: task.id },
    });
  }

  async toggleTask(taskId: string, userId: string) {
    const task = await this.getTask(taskId, userId);

    return prisma.task.update({
      where: { id: task.id },
      data: {
        status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED',
      },
    });
  }
}

export const taskService = new TaskService();
