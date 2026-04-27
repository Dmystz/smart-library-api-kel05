import { pool } from '../config/db.js';

export const getAll = () =>
  pool.query("SELECT * FROM loans");