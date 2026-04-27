import { pool } from '../config/db.js';

export const getStats = async (req, res) => {
  try {
    const books = await pool.query("SELECT COUNT(*) FROM books");
    const authors = await pool.query("SELECT COUNT(*) FROM authors");
    const categories = await pool.query("SELECT COUNT(*) FROM categories");
    const borrowed = await pool.query(
      "SELECT COUNT(*) FROM loans WHERE status='BORROWED'"
    );

    res.json({
      total_books: books.rows[0].count,
      total_authors: authors.rows[0].count,
      total_categories: categories.rows[0].count,
      borrowed_active: borrowed.rows[0].count
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};