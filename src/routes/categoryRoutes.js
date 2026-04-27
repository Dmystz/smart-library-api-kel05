import express from 'express';
import * as CategoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.deleteCategory);

export default router;