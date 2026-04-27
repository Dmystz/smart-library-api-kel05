import { pool } from '../config/db.js';

// GET ALL + SEARCH
export const getAll = (title) => {
  if (title) {
    return pool.query(
      "SELECT * FROM books WHERE title ILIKE $1",
      [`%${title}%`]
    );
  }
  return pool.query("SELECT * FROM books");
};

// GET BY ID
export const getById = (id) =>
  pool.query("SELECT * FROM books WHERE id=$1", [id]);

// CREATE
export const create = (data) =>
  pool.query(
    `INSERT INTO books(title, isbn, author_id, category_id, available_copies)
     VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      data.title,
      data.isbn,
      data.author_id,
      data.category_id,
      data.available_copies
    ]
  );

// UPDATE
export const update = (id, data) =>
  pool.query(
    `UPDATE books 
     SET title=$1, isbn=$2, author_id=$3, category_id=$4, available_copies=$5 
     WHERE id=$6 RETURNING *`,
    [
      data.title,
      data.isbn,
      data.author_id,
      data.category_id,
      data.available_copies,
      id
    ]
  );

// DELETE
export const deleteBook = (id) =>
  pool.query("DELETE FROM books WHERE id=$1", [id]);