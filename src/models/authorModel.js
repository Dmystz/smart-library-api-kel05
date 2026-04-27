import { pool } from '../config/db.js';

export const getAll = (name) => {
  if (name) {
    return pool.query(
      "SELECT * FROM authors WHERE name ILIKE $1",
      [`%${name}%`]
    );
  }
  return pool.query("SELECT * FROM authors");
};

export const getById = (id) =>
  pool.query("SELECT * FROM authors WHERE id=$1", [id]);

export const create = (data) => {
  if (!data.name) {
    throw new Error("Name is required");
  }

  return pool.query(
    "INSERT INTO authors(name) VALUES($1) RETURNING *",
    [data.name]
  );
};

export const update = (id, data) =>
  pool.query(
    "UPDATE authors SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, id]
  );

export const deleteAuthor = (id) =>
  pool.query("DELETE FROM authors WHERE id=$1", [id]);