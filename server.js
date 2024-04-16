import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import Highscore from './src/models.js';
import bodyParser from 'body-parser';
import fetchRandomWord from './src/generateWords.js';
import algorithmA from './src/wordleAlgorithm.js';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

config();
mongoose.connect(process.env.DB_URL);

app.engine(
  '.hbs',
  engine({ extname: '.hbs', partialsDir: ['./views/partials'] })
);
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/assets', express.static('./client/dist/assets'));
app.use('/src', express.static('./client/src'));
app.use('/static', express.static('./client/public/assets'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about-us', (req, res) => {
  res.render('aboutUs');
});

app.get('/highscore', (req, res) => {
  res.render('highscore');
});

//api
app.get('/api/randomWord/:length/:allowDuplicates', async (req, res) => {
  const length = parseInt(req.params.length);
  const allowDuplicates = req.params.allowDuplicates === 'true';
  const randomWord = await fetchRandomWord(length, allowDuplicates);
  console.log(randomWord);
  res.json({ word: randomWord });
});

app.post('/api/guess', async (req, res) => {
  const { guessedWord, correctWord } = req.body;
  const feedback = algorithmA(guessedWord, correctWord);
  console.log(guessedWord, correctWord + 'server');
  res.json({ feedback });
  console.log(feedback);
});

app.post('/api/highscore', async (req, res) => {
  const { name, time, score, wordLength, duplicateLetters, guesses } = req.body;
  const highscore = new Highscore({
    name,
    time,
    score,
    wordLength,
    duplicateLetters,
    guesses,
  });
  await highscore.save();
  res.status(201).send();
});

const port = process.env.PORT || 5080;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
