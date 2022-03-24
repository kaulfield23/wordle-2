import express from 'express';
import highscore from './router/highscore.js'
const app = express();

app.use('/highscore', highscore);

const port = process.env.PORT || 5080;

app.listen(port, () => console.log(`app is running on ${port}`))