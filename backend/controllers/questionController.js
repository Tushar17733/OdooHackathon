// backend/controllers/questionController.js
import Question from '../models/Question.js';

export const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    const newQuestion = await Question.create({
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      user: req.user.id  // user comes from authMiddleware
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create question', error: err.message });
  }
};
