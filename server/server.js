import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import api from "./router/api.js";
import pages from "./router/pages.js";
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
console.log(`filename ${__filename}`);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.engine(
  "handlebars",
  engine({
    helpers: {
      math: function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": lvalue * rvalue,
          "/": lvalue / rvalue,
          "%": lvalue % rvalue,
        }[operator];
      },
      strFunc: function (word) {
        let result = "";
        for (let i = 0; i < word.length; i++) {
          result += `<h3 class="rightWordsBox">${word[i]}</h3>`;
        }
        return result;
      },
    },
  })
);
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "/templates"));

app.use(express.static(`${path.join(__dirname, "/public")}`));

app.use("/api", api);
app.use("/", pages);

const port = process.env.PORT || 5080;

app.listen(port, () => console.log(`app is running on ${port}`));
