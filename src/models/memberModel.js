import { pool } from '../config/db.js';

export const getAll = () =>
  pool.query("SELECT * FROM members");

export const getById = (id) =>
  pool.query("SELECT * FROM members WHERE id=$1", [id]);

export const create = (data) =>
  pool.query(
    "INSERT INTO members(full_name,email,member_type) VALUES($1,$2,$3) RETURNING *",
    [data.full_name, data.email, data.member_type]
  );

export const update = (id, data) =>
  pool.query(
    "UPDATE members SET full_name=$1, email=$2, member_type=$3 WHERE id=$4 RETURNING *",
    [data.full_name, data.email, data.member_type, id]
  );

export const deleteMember = (id) =>
  pool.query("DELETE FROM members WHERE id=$1", [id]);