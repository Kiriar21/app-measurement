const {mongoose, Schema} = require('mongoose');

const ScoreSchema = new Schema({
    
});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;