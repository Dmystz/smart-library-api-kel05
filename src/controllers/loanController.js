import * as Loan from '../models/loanModel.js';
import { pool } from '../config/db.js';

// GET ALL
export const getAll = async (req, res) => {
  try {
    const result = await Loan.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RETURN BOOK
export const returnBook = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const loan = await client.query(
      "SELECT * FROM loans WHERE id=$1",
      [req.params.id]
    );

    if (!loan.rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: "Loan tidak ditemukan" });
    }

    const book_id = loan.rows[0].book_id;

    // update loan
    await client.query(
      "UPDATE loans SET status='RETURNED', return_date=NOW() WHERE id=$1",
      [req.params.id]
    );

    // update book stock
    await client.query(
      "UPDATE books SET available_copies = available_copies + 1 WHERE id=$1",
      [book_id]
    );

    await client.query('COMMIT');

    res.json({ message: "Buku berhasil dikembalikan" });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};