const User = require("../models/User");
const Reservation = require("../models/Reservation");

exports.getReservations = async (req, res) => {
    Reservation.find().then(reservations => {
        res.status(200).json({reservations: reservations})
    })
}

exports.setReservation = async (req, res) => {
    const {
        name, diners, tables, time, date
    } = req.body
 
    var r = new Reservation({name: name, diners: diners,
         tables: tables, time: time, date: date})
    r.save(
        function(err, re) {
            console.log(err)
            console.log(res)
        if (err) return res.status(400),json({err: err});
        return res.status(200).json({reservation: re})
    })
}