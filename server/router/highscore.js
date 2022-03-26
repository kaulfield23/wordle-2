import express from 'express';
// import fs from 'fs/promises';
// import path from 'path'

const router = express.Router();

router.get('/', (req, res) => {
    // const htmlBuf = await fs.readFile('../../client/src/components/pages/Highscore.jsx');
    // const htmlText = htmlBuf.toString().replace('%body%', 'hello')
    // res.send(htmlText)
    // const indexFile = path.resolve('./client/public/index.html')
    // fs.readFile(indexFile, 'utf8', (err, data) => {
    //         console.log(data, 'index')
    //         if (err) {
    //             console.log('error occur', err);
    //             return res.status(500).send('errorrrr');
    //         }
    //         return res.send(
    //             data.replace('<div id="main"></div>', '<div id="main"><h1>hello</h1></div>')
    //         )
    //     })
    res.send({
        message: "hellooo"
    })
})

export default router