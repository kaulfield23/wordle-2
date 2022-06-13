import mongoose from 'mongoose';
import 'dotenv/config';

const url = process.env.DB_URL;


mongoose.connect(
    url,
    () => console.log('MongoDB is connected')
);

const Highscore = mongoose.model('highscores', {
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    playTime: {
        type: String,
        required: true
    },
    timer: {
        type: Number,
        required: true,
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
});

export {
    Highscore
};