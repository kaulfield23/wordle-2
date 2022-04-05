import express from 'express';
import api from './router/api.js'
import {
    engine
} from 'express-handlebars';

import path from "path"

const __dirname = path.resolve();

const app = express();

app.use(express.json())
app.engine('handlebars', engine({
    helpers: {
        math: function(lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        },
        strFunc: function(word) {
            let result = '';
            for (let i = 0; i < word.length; i++) {
                result += `<h3 class="rightWordsBox">${word[i]}</h3>`
            }
            return result
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/server/templates/`);
app.use('/api', api);

const port = process.env.PORT || 5080;

app.listen(port, () => console.log(`app is running on ${port}`))