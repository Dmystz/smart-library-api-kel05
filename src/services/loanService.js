import { pool } from '../config/db.js';

export const returnBook = async (loanId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Ambil data loan
    const loanRes = await client.query(
      'SELECT * FROM loans WHERE id = $1',
      [loanId]
    );

    if (loanRes.rows.length === 0) {
      throw new Error('Loan tidak ditemukan');
    }

    const loan = loanRes.rows[0];

    if (loan.status === 'RETURNED') {
      throw new Error('Buku sudah dikembalikan');
    }

    // 2. Update loan
    await client.query(
      `UPDATE loans 
       SET status = 'RETURNED', return_date = NOW() 
       WHERE id = $1`,
      [loanId]
    );

    // 3. Update stok buku
    await client.query(
      `UPDATE books 
       SET available_copies = available_copies + 1 
       WHERE id = $1`,
      [loan.book_id]
    );

    await client.query('COMMIT');

    return { message: 'Buku berhasil dikembalikan' };

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};