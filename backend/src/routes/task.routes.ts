import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

const router = Router();

// All task routes require authentication
router.use(authMiddleware as any);

router.get('/', (req, res, next) => taskController.getTasks(req, res, next));
router.post('/', validate(createTaskSchema), (req, res, next) => taskController.createTask(req, res, next));
router.get('/:id', (req, res, next) => taskController.getTask(req, res, next));
router.patch('/:id', validate(updateTaskSchema), (req, res, next) => taskController.updateTask(req, res, next));
router.delete('/:id', (req, res, next) => taskController.deleteTask(req, res, next));
router.patch('/:id/toggle', (req, res, next) => taskController.toggleTask(req, res, next));

export default router;
