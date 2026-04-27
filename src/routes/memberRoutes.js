import express from 'express';
import * as MemberController from '../controllers/memberController.js';

const router = express.Router();

router.get('/', MemberController.getAll);
router.get('/:id', MemberController.getById);
router.post('/', MemberController.create);
router.put('/:id', MemberController.update);
router.delete('/:id', MemberController.deleteMember);

export default router;