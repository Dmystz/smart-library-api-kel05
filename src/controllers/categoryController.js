import * as Category from '../models/categoryModel.js';

// GET ALL + SEARCH
export const getAll = async (req, res) => {
  try {
    const result = await Category.getAll(req.query.name);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
export const getById = async (req, res) => {
  try {
    const result = await Category.getById(req.params.id);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const create = async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    const result = await Category.update(req.params.id, req.body);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const result = await Category.deleteCategory(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};