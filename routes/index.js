const path = require("path");
const router = require("express").Router();
const db = require("../models")

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
