// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const {
  createQuiz,
  getQuizzes,
  updateQuiz,
  deleteQuiz,
  publishQuiz,
} = require('../controllers/quizController');

router.post('/quizzes', createQuiz);
router.get('/quizzes', getQuizzes);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);
router.post('/quizzes/:id/publish', publishQuiz);

module.exports = router;
