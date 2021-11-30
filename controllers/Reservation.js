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

 isNumeric = (num) => {
    return !isNaN(num)
  }
 
exports.getAvailableTables = async (req, res) => {
    //console.log(req)
    console.log("here")
    var timeBefore = ["", "", "", "", ""] // Array of time before selectedTime. interval of 15 minutes
    var { time, date } = req.query
    var lastTwo = time.slice(-2)
    var hour
    var minute
    for(var i = 0; i < 5; i++){
        if(i == 0){ // initial time
            if(isNumeric(time.substring(0,2))){ // hour is 10, 11, or 12.
                hour = parseInt(time.substring(0,2)) 
                minute = parseInt(time.substring(3,5))
            }else{
                hour = parseInt(time.substring(0,1)) 
                minute = parseInt(time.substring(2,4))
            }
            if(parseInt(time.substring(2,4)) < 15 ){ // time is X:14 or less
                hour = hour - 1
                minute = 60 - (15 - minute)
                timeBefore[0] = hour.toString() + ":" + minute.toString()
            }else{
                minute = minute - 15
                timeBefore[0] = hour.toString() + ":" + minute.toString()
            }
        }else{ 
            if(isNumeric(timeBefore[i-1].substring(0,2))){ // hour is 10, 11, or 12.
                hour = parseInt(timeBefore[i-1].substring(0,2)) 
                minute = parseInt(timeBefore[i-1].substring(3,5))
            }else{
                hour = parseInt(timeBefore[i-1].substring(0,1)) 
                minute = parseInt(timeBefore[i-1].substring(2,4))
            }
            if(minute < 15 ){ // 15 before is in the previous hour
                hour = hour - 1
                minute = 60 - (15 - minute)
                timeBefore[i] = (hour).toString() + ":" + minute.toString()
            }else{
                minute = minute - 15
                timeBefore[i] = hour.toString() + ":" + minute.toString()
            }
        }
        if(timeBefore[i].length == 3){
            timeBefore[i] = timeBefore[i] + "0"
        }
        console.log(timeBefore[i])
        timeBefore[i] = timeBefore[i] + " " + lastTwo
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