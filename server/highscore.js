import mongoose from 'mongoose';

const HighscoreSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    playTime: {
        type: Number,
        required: true
    },
    guesses: {
        type: Number,
        required: true
    },
    wordLength: {
        type: Number,
        required: true
    },
    wordType: {
        type: String,
        required: true
    },
    correctWord: {
        type: String,
        required: true
    }
})

const highscore = mongoose.model('Highscore', HighscoreSchema)
export default highscore