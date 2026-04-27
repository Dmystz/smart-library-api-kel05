import { pool } from '../config/db.js';

export const getAll = () =>
  pool.query("SELECT * FROM members");

export const getById = (id) =>
  pool.query("SELECT * FROM members WHERE id=$1", [id]);

export const create = (data) =>
  pool.query(
    "INSERT INTO members(name,email) VALUES($1,$2) RETURNING *",
    [data.name, data.email]
  );

export const update = (id, data) =>
  pool.query(
    "UPDATE members SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [data.name, data.email, id]
  );

export const deleteMember = (id) =>
  pool.query("DELETE FROM members WHERE id=$1", [id]);