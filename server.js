import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/assets', express.static('./client/dist/assets'));
app.use('/src', express.static('./client/src'));

app.get('/', (req, res) => {
  res.render('index');
});

//api
app.get('/api/wordList', async (req, res) => {});

app.getMaxListeners;

app.listen(5080);
