import { pool } from '../config/db.js';

export const getAll = (name) => {
  if (name) {
    return pool.query(
      "SELECT * FROM categories WHERE name ILIKE $1",
      [`%${name}%`]
    );
  }
  return pool.query("SELECT * FROM categories");
};

export const getById = (id) =>
  pool.query("SELECT * FROM categories WHERE id=$1", [id]);

export const create = (data) =>
  pool.query(
    "INSERT INTO categories(name) VALUES($1) RETURNING *",
    [data.name]
  );

export const update = (id, data) =>
  pool.query(
    "UPDATE categories SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, id]
  );

export const deleteCategory = (id) =>
  pool.query("DELETE FROM categories WHERE id=$1", [id]);