import express from 'express';
import * as AuthorController from '../controllers/authorController.js';

const router = express.Router();

router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getById);
router.post('/', AuthorController.create);
router.put('/:id', AuthorController.update);
router.delete('/:id', AuthorController.deleteAuthor);

export default router;