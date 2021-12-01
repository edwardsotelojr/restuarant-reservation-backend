const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    diners: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tables: {
        type: [String],
        required: true
    },
    date: {
        type: String,
        required: true 
    },
    creditCardHold: {
        type: String,
        required: false
    }
    },   
    {
    timestamps: true,
    collection: 'Reservations'
});


module.exports = Reservation = mongoose.model('reservations', reservationSchema);