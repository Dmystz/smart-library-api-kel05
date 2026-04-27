import express from 'express';
import * as LoanController from '../controllers/loanController.js';

const router = express.Router();

// GET ALL LOANS
router.get('/', LoanController.getAll);

// RETURN BOOK
router.post('/:id/return', LoanController.returnBook);

export default router;