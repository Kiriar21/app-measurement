const {mongoose, Schema} = require('mongoose');

const StatisticSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    number_of_starters: {
        type: Number,
        defaults: 0, 
    },
    number_of_finish: {
        type: Number,
        defaults: 0,
    },
    female_number_of_starters: {
        type: Number,
        defaults: 0,
    },
    female_number_of_finish: {
        type: Number,
        defaults: 0,
    },
    male_number_of_starters: {
        type: Number,
        defaults: 0,
    },
    male_number_of_finish: {
        type: Number,
        defaults: 0,
    },
});

const Statistic = mongoose.model('Statistic', StatisticSchema);

module.exports = Statistic;