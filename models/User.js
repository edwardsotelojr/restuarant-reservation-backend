const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
         type: String,
         required: true
    },
    preferredPaymentMethod: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true
    },
    mailingAddress: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    preferredAmountOfDiners: {
        type: Number,
        required: true
    },
    },   {
    timestamps: true,
    collection: 'Users'
});


module.exports = User = mongoose.model('users', userSchema);