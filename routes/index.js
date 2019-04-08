const path = require("path");
const router = require("express").Router();
const db = require("../models");
require("../controller/passport");
const passport = require("passport");
router.use(function(req, res, next) {
  var { path } = req;
  var base = "/" + path.split("/")[1];
  var date;
  if(base === "/appointments"){
    date = path.split("/")[2];
  }
  console.log("gatekeeper : " + base);

  switch (base) {
    case "/":
    case "/login":
    case "/logout":
      next();
      break;
    case "/services":
    case "/info":
    console.log(req.method)
    if(req.method === "GET" || req.isAuthenticated()){
      next();
      break;
    }else{
      break;
    }
    case "/appointments":
      console.log(req.method)
      if(req.method === "POST" || date){
        next();
        break;
      }
    default:
      if (!req.isAuthenticated()) {
        console.log("Gatekeeper says " + req.isAuthenticated());
        res.redirect("/");
        break;
      }else{
        next();
      }
      break;
  }
  
});

router.route("/login")
.get(function(req,res){
  if(req.isAuthenticated()){
    res.send({username: req.user.username});
  }
})
.post(passport.authenticate('local'), function (req, res) {
  if (req.isAuthenticated()) {
    
    res.send({username: req.user.username});
  } else {
    res.redirect("/");
  }
});

router.route("/logout").get(function(req, res){
  req.logout();
  res.end();
})


router.route("/bookings/:date")
  .get(function(req, res){
    db.Bookings.findAll({
      where:{
        date: req.params.date
      }
    }).then((dbBookings)=>{
      res.send(dbBookings);
    })
  })
  .put(function (req, res) {
    if (req.body) {
      db.Bookings.update({
        booked: db.Sequelize.literal('NOT booked')
      },
      {
        where: {
          date: req.params.date,
          time: req.body.time
        }
      }
        ).then((dbBooked) => {
          res.send("Successfully updated booking.");
        })
        .catch((err) => {
          res.send("Error updating booking.");
        })
    }
  })


router.route("/bookings")
  .get(function (req, res) {
    db.Bookings.findAll({})
      .then((dbBookings) => {
        res.send(dbBookings);
      })
      .catch((err) => {
        res.status(404).send(err);
      })
  })
  .post(function (req, res) {
    if (req.body) {
      console.log(req.body)
      if(req.body.time && req.body.time.length > 1){
        db.Bookings.findAll(
          {
          attributes:['time'],
          where:{
            date: req.body.date,
            time: req.body.time
          }
        }).then((dbBookings)=>{
          console.log(dbBookings);
          if(dbBookings.length){  
            var times = dbBookings.filter((val, key)=>{
              return !req.body.time.includes(val.dataValues.time);
            });
            console.log(times);
            db.Bookings.bulkCreate(times.map((val, key)=>{
              return {date: req.body.date, time: val}
            })).then(function(){
              res.send("Successfully created bookings.");
            })
            .catch((err)=>{
              console.log(err);
              res.send("Error creating bookings");
            })
          }else{
            db.Bookings.bulkCreate(req.body.time.map((val, key)=>{
              return {date: req.body.date, time: val}
            })).then(function(){
              res.send("Successfully created booking.");
            })
            .catch((err)=>{
              console.log(err);
              res.send("Error creating bookings");
            })
          }
        
        }).catch((err)=>{
          console.log("Error creating bookings.");
        })
      }else if(req.body.time && req.body.time.length === 1){
        db.Bookings.findOrCreate({
          where: {
            date: req.body.date,
            time: req.body.time
          },
          defaults: {
            date:req.body.date,
            time: req.body.time
          }
        })
          .then((dbBooking) => {
            res.send("Successfully created booking.");
          })
          .catch((err) => {
            res.send("Error creating booking.");
          })
      }
    }
  })
  .put(function(req, res) {
    db.Bookings.destroy({
      where: {
        date: req.body.date,
        time: req.body.time
      }
    }).then((dbBooking) => {
      res.send("Successfully deleted bookings.");
    }).catch((err)=>{
      res.send(err.toString());
    })
  });

 
router.route("/services")
  .get(function (req, res) {
    db.Services.findAll({})
      .then((dbServices) => {
        res.send(dbServices);
      })
      .catch((err) => {
        res.send(err);
      })
  })
  .post(function (req, res) {
    db.Services.findOrCreate({
      where: {
        service: req.body.service,
      },
      defaults: {
        service: req.body.service,
        price: req.body.price
      }
    })
      .then((dbService) => {
        res.send("Successfully created service.");
      })
      .catch((err) => {
        res.send("Error creating service.")
      })
  })
  .put(function (req, res) {
    db.Services.update({
      price: req.body.price
    }, 
    {
      where:{
        service: req.body.service
      }
    }
    ).then((dbService)=>{
      res.send("Successfully updated service.")
    })
    .catch((err)=>{
      res.send("Error updating service.")
    })
  })

router.route("/services/:name").delete(function (req, res) {
  db.Services.destroy({
    where: {
      service: req.params.name
    }
  }).then(() => {
    res.send("Successfully deleted service.");
  })
    .catch((err) => {
      res.send("Error deleting service.");
    })
})


router.route("/appointments/:date").get(function (req, res) {

  db.Bookings.findAll({
    order:
      db.sequelize.literal('time ASC')
    ,
    where: {
      date: req.params.date,
      booked: false
    }
  }).then(function (dbBookings) {
    if(dbBookings){
      res.send(dbBookings);
    }else{
      res.send([])
    }
  })
})

router.route("/appointments")
.get(function(req,res){
    db.Appointment.findAll({}).then((dbAppointments)=>{
      res.send(dbAppointments);
    })
})
.put(function(req, res){
  console.log(req.body)
  if (req.body && req.body.delete !== true) {
    db.Appointment.update({
      booked: db.Sequelize.literal('NOT booked')
    },
    {
      where: {
        name: req.body.name,
        phone: req.body.phone,
        date: req.body.date,
        time: req.body.time
      }
    }
      ).then((dbAppointments) => {
        db.Bookings.update({
          booked: db.Sequelize.literal('NOT booked')
        },{
          where:{
            date: req.body.date,
            time: req.body.time
          }
        }).then((dbBooking) => {
          res.send("Successfully confirmed appointment");
        })
      })
      .catch((err) => {
        res.send("Error confirming appointment.");
      })
  }else{
    db.Appointment.destroy({
      where: {
        name: req.body.name,
        phone: req.body.phone,
        date: req.body.date,
        time: req.body.time
      }
    }
      ).then((dbAppointments) => {
        db.Bookings.update({
          booked: false
        },{
          where:{
            date: req.body.date,
            time: req.body.time
          }
        }).then((dbBooking) => {
          res.send("Successfully deleted appointment");
        })
      })
      .catch((err) => {
        res.send("Error deleted appointment");
      })
  }
})
.post(function (req, res) {
  console.log(req.body);
  db.Appointment
    .create(req.body)
    .then(() => {
      res.status(200);
      res.send("Appointment created successfully.")
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send({
        error: "Error creating appointment."
      });
    });
});

router.route("/info")
  .get(function(req, res){
    db.Business.findOne({})
      .then((dbBusiness)=>{
        
        if(dbBusiness){
          res.send(dbBusiness.dataValues);
        }
      })
      .catch((err)=>{
        console.log("ASDASDASDASDASDASDASDAS " + err);
        res.send({})
      })
  })
  .put(function(req, res){
    db.Business.findOne({
      where: {
        AuthId: req.user.id
      }
    }).then((dbBusiness)=>{
      console.log(req.body)
      let newInfo = {
        authId: req.user.id
      };
        const { address, phone, button1, button2, button3, api } = req.body;
        if(address){
          newInfo.address = address;
        }
        if(phone){
          newInfo.phone = phone;
        }
        if(button1){
          newInfo.button1 = button1;
        }
        if(button2){
          newInfo.button2 = button2;
        }
        if(button3){
          newInfo.button3 = button3;
        }
        if(api){
          newInfo.api = api;
        }
      if(dbBusiness){
        db.Business.update(newInfo,
          {
          where: {
            AuthId: req.user.id
          }
        })
        .then((dbBusiness)=>{
          res.send("Business successfully updated!")
        })
        .catch((err)=>{
          console.log("XDXDXXXXDXDXDXDXDDXDXX " + err);
          res.send("Error updating business.");
        })
      }else{
        db.Business.create(newInfo)
        .then((dbBusiness)=>{
          res.send("Business successfully updated.")
        })
        .catch((err)=>{
          console.log("XDXDXXXXDXDXDXDXDDXDXX " + err);
          res.send("Error updating business.");
        })
      }
    }).catch((err)=>{
      console.log("cscdassaxascascascascsaca " + err);
      res.send("Error updating business.");
    })
  })

// If no API routes are hit, send the React app
router.use(function (req, res) {
  console.log(req.path)
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});

module.exports = router;
