const User = require("../models/User");
const Reservation = require("../models/Reservation");

exports.getReservations = async (req, res) => {
    Reservation.find().then(reservations => {
        res.status(200).json({reservations: reservations})
    })
}

validateReservationRequest = (r) => {
    if(r.name.length < 3){
        return {error: true, msg: "name too short"}
    }
}

exports.setReservation = async (req, res) => {
    const {
        name, diners, tables, time, date
    } = req.body
 
    var r = new Reservation({name: name, diners: diners,
         tables: tables, time: time, date: date})
    let ready = validateReservationRequest(r);
    if(ready.error == true) {
        return res.status(404).json({msg: error.msg})
    }
    r.save(
        function(err, re) {
            console.log(err)
            console.log(res)
        if (err) return res.status(400),json({err: err});
        return res.status(200).json({reservation: re})
    })
}

exports.getAvailableTables = async (req, res) => {
    const { time, date } = req.body
    Reservation.find({$and: [{time: time}, {date: date}]})
    .then(r => {
        var tables = []
        r.map(rr => rr.tables.map(t => tables.push(t)))
        let tabless = tables.filter((t, index) => {
            return tables.indexOf(t) === index
        })
        console.log(tabless)
        return res.status(200).json({msg: ""})
    })
    
}