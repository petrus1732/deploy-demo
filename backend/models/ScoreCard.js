import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
    Name: String,
    Subject: String,
    Score: Number
});
const ScoreCard = mongoose.model('User', ScoreCardSchema);

export default ScoreCard