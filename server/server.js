import express from 'express';
import api from './router/api.js'
import {
    engine
} from 'express-handlebars';
import path from "path"
const __dirname = path.resolve();

const app = express();

app.use(express.json())
app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/server/templates/`);
app.use('/api', api);

const port = process.env.PORT || 5080;

app.listen(port, () => console.log(`app is running on ${port}`))