import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { taskService } from '../services/task.service';

export class TaskController {
  async getTasks(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { page, limit, status, search } = req.query;
      const result = await taskService.getTasks(req.userId!, {
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        status: status as string | undefined,
        search: search as string | undefined,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const task = await taskService.getTask(req.params.id, req.userId!);
      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const task = await taskService.createTask(req.userId!, req.body);
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const task = await taskService.updateTask(req.params.id, req.userId!, req.body);
      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await taskService.deleteTask(req.params.id, req.userId!);
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const task = await taskService.toggleTask(req.params.id, req.userId!);
      res.status(200).json({
        success: true,
        message: 'Task status toggled successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const taskController = new TaskController();
