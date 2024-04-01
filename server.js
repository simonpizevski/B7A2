import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/assets', express.static('../client/dist/assets'));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(5080);
