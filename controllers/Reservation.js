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
    //console.log(req)
    console.log("here")
    var timeBefore = ["", "", "", "", ""] // Array of time before selectedTime. interval of 15 minutes
    const { time, date } = req.query
    console.log(typeof(time))
    var hour
    var minute
    for(var i = 0; i < 5; i++){
        if(i == 0){
            if(parseInt(time.substring(2)) < 15 ){ // time is X:14 or less
                hour = parseInt(time.substring(0,1)) - 1
                minute = 60 - (15 - parseInt(time.substring(2)))
                timeBefore[0] = (hour).toString() + ":" + minute.toString()
            }else{
                timeBefore[0] = hour.toString() + ":" + (parseInt(time.substring(2))-15).toString()
            }
        }else{ 
            if(parseInt(timeBefore[i-1].substring(2)) < 15 ){ // 15 before is in the previous hour
                hour = parseInt(timeBefore[i-1].substring(0,1)) - 1
                minute = 60 - (15 - parseInt(timeBefore[i-1].substring(2)))
                timeBefore[i] = (hour).toString() + ":" + minute.toString()
            }else{
                timeBefore[i] = hour.toString() + ":" + (parseInt(timeBefore[i-1].substring(2))-15).toString()
            }
        }
        if(timeBefore[i].length == 3){
            timeBefore[i] = timeBefore[i] + "0"
        }
        console.log(timeBefore[i])
    }
    console.log("time: ", time)
    console.log("date: ", date)

    timeBefore.forEach(element => {
        console.log(element)
    });
    Reservation.find({$and: [{time: [time, timeBefore[0], timeBefore[1],
        timeBefore[2], timeBefore[3], timeBefore[4]]}, {date: date}]})
    .then(r => {
        console.log(r)
        var tables = []
        r.map(rr => rr.tables.map(t => tables.push(t)))
        let tabless = tables.filter((t, index) => {
            return tables.indexOf(t) === index
        })
        console.log(tables)
        return res.status(200).json({reservation: tables})
    })
    
}