const path = require("path");
const router = require("express").Router();
const db = require("../models");
const passport = require("passport");

router.route("/login")
  .post(passport.authenticate("local"),function(req, res){
    console.log("LOGIN")
    if(req.user){
      console.log(req.user);
      res.send(req.user);
    }else{
      console.log("NO USER");
      res.send("ERROR")
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
  .post(function(req, res) {
    if(req.body){
      db.Bookings.findOrCreate({
        where: {
          date: req.body.date,
          time: req.body.time
        }
      })
        .then((dbBooking) => {
          res.send("Successfully created booking.");
        })
        .catch((err) => {
          res.status(401).send("Error creating booking.");
        })
    }
  })
  .put(function(req, res){
    if(req.body){
      db.Bookings.update({
        where: {
          date: req.body.date,
          time: req.body.time
        }
      },
      {
        booked: true
      }).then((dbBooked) => {
        res.send("Successfully updated booking.");
      })
      .catch((err)=>{
        res.send(err);
      })
    }
  })

  router.route("/services")
    .get(function(req, res){
      db.Services.findAll({})
      .then((dbServices) => {
        res.send(dbServices);
      })
      .catch((err) => {
        res.send(err);
      })
    })
    .post(function(req, res){
      db.Services.create({
        service: req.body.service,
        price: req.body.price
      })
      .then((dbService)=>{
        res.send(dbService);
      })
      .catch((err) => {
        res.send(err)
      })
    })
    .put(function(req, res){
      db.Services.update({
        where:{
          service: req.body.service
        }
      },
      {
        price: req.body.price
      })
    })


  router.get("/appointment/:date", function (req, res) {

    db.Bookings.findAll({
      order:
        db.sequelize.literal('time ASC')

      ,
      where: {
        date: req.params.date,
        booked: 0
      }
    }).then(function (dbBookings) {
      res.send(dbBookings);
    })
  })

router.get("/admin", function (req, res) {
  console.log(req.user);
  if (req.user) {
    res.send("<html>");
  } else {
    res.redirect("/");
  }
});


router.post("/appointment", function (req, res) {
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

// If no API routes are hit, send the React app
router.use(function (req, res) {
  console.log(req.path)
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});

module.exports = router;
