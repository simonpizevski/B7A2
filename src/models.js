import mongoose from 'mongoose';

const HighscoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  score: Number,
  guesses: [{ type: String }],
  selectedLength: Number,
  uniqueLettersCount: Number,
});

const Highscore = mongoose.model('Highscore', HighscoreSchema);

export default Highscore;
