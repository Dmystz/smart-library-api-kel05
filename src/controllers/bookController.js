import * as Book from '../models/bookModel.js';

// GET ALL + SEARCH
export const getAll = async (req, res) => {
  try {
    const result = await Book.getAll(req.query.title);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
export const getById = async (req, res) => {
  try {
    const result = await Book.getById(req.params.id);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const create = async (req, res) => {
  try {
    const result = await Book.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    const result = await Book.update(req.params.id, req.body);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteBook = async (req, res) => {
  try {
    const result = await Book.deleteBook(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};