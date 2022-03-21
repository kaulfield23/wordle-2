import express from 'express';
import test from './router/test.js'
const app = express();

app.use('/api', test);

const port = process.env.PORT || 5080;

app.listen(port, () => console.log(`app is running on ${port}`))