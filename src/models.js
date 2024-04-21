import mongoose from 'mongoose';

const HighscoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  duplicateLetters: Boolean,
  selectedLength: Number,
  guesses: Number,
});

const Highscore = mongoose.model('Highscore', HighscoreSchema);

export default Highscore;
