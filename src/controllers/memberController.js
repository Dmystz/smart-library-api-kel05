import * as Member from '../models/memberModel.js';

// GET ALL
export const getAll = async (req, res) => {
  try {
    const result = await Member.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
export const getById = async (req, res) => {
  try {
    const result = await Member.getById(req.params.id);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const create = async (req, res) => {
  try {
    const result = await Member.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    const result = await Member.update(req.params.id, req.body);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteMember = async (req, res) => {
  try {
    const result = await Member.deleteMember(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};