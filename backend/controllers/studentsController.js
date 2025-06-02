const db = require('../config/db');

const getAllStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch students' });
    res.json(results);
  });
};

const addStudent = (req, res) => {
  const { name, course, age } = req.body;
  if (!name || !course || !age) {
    return res.status(400).json({ error: 'name, course, and age are required' });
  }

  db.query(
    'INSERT INTO students (name, course, age) VALUES (?, ?, ?)',
    [name, course, age],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to add student' });
      res.status(201).json({ message: 'Student added', studentId: result.insertId });
    }
  );
};

const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, course, age } = req.body;

  db.query(
    'UPDATE students SET name = ?, course = ?, age = ? WHERE id = ?',
    [name, course, age, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update student' });
      res.json({ message: 'Student updated' });
    }
  );
};

const deleteStudent = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete student' });
    res.json({ message: 'Student deleted' });
  });
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
