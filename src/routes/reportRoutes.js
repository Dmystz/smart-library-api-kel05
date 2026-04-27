import express from 'express';
import * as ReportController from '../controllers/reportController.js';

const router = express.Router();

router.get('/stats', ReportController.getStats);

export default router;