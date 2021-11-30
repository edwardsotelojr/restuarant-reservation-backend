const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
    
    tableNumber: {
         type: Number,
         required: true
    },
    limit: {
        type: Number,
        required: true
    },
    diners: {
        type: Number,
        required: true
    },
    Reservation: {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    },   
    {
    timestamps: true,
    collection: 'Tables'
});


module.exports = Table = mongoose.model('tables', TableSchema);