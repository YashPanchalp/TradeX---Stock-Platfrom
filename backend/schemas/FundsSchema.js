const { Schema } = require('mongoose');

const FundsSchema = new Schema({
    balance: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

module.exports = { FundsSchema };