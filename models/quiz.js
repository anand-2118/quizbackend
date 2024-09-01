const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [
    {
      text: { type: String, required: true },
      questionType: { type: String, required: true },
      optionType: { type: String, required: true },
      options: [{ text: String, imageUrl: String }],
      selectedOption: { type: Number, default: null },
      timer: { type: String, default: 'off' },
      remainingTime: { type: Number, default: null },
    },
  ],
  isPublished: { type: Boolean, default: false },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
