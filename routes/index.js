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
    case "/logout":
    case "/":
      break;
    
    case "/login":
      next();
      break;
    case "/services":
    console.log(req.method)
    if(req.method === "GET" || req.user){
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
  if(req.user){
    res.send(req.user);
  }
})
.post(passport.authenticate('local'), function (req, res) {
  if (req.user) {
    console.log(req.user.email)
    res.send(req.user)
  } else {
    res.redirect("/");
  }
});

router.route("/logout").get(function(req, res){
  req.logOut();
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
          res.send(err);
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
        db.Bookings.bulkCreate(
          req.body.time.map((val, key) => {
            return {
              date: req.body.date,
              time: val
            }
          })
        ).then((dbBooking) => {
          console.log(dbBookings + "success bookings");
          res.send("Successfully created bookings.");
        })
        .catch((err) => {
          res.status(401).send("Error creating bookings.");
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
            res.status(401).send("Error creating booking.");
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
        res.send(dbService);
      })
      .catch((err) => {
        res.send(err)
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
    )
  })

router.route("/services/:name").delete(function (req, res) {
  db.Services.destroy({
    where: {
      service: req.params.name
    }
  }).then(() => {
    res.send("OK");
  })
    .catch((err) => {
      res.send(err);
    })
})


router.get("/appointments/:date", function (req, res) {

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

router.route("/appointments")
.get(function(req,res){
  if(req.user){
    db.Appointment.findAll({}).then((dbAppointments)=>{
      res.send(dbAppointments);
    })
  }else{
    res.redirect("/");
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

// If no API routes are hit, send the React app
router.use(function (req, res) {
  console.log(req.path)
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});

module.exports = router;
