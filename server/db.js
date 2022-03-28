import mongoose from 'mongoose';

const url = `mongodb+srv://haeju:sHeGmQDxIGjsr07I@cluster0.fzzlf.mongodb.net/hello?retryWrites=true&w=majority`

const connectionParmas = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParmas)
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. ${err}`)
    })