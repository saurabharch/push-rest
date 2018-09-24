const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
    endpoint: String,
    keys: Schema.Types.Mixed,
    createDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('subscribers', SubscriberSchema, 'subscribers');