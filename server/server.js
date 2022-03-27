import express from 'express';
import api from './router/api.js'
const app = express();


app.use('/api', api);

const port = process.env.PORT || 5080;

app.listen(port, () => console.log(`app is running on ${port}`))