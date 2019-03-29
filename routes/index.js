const path = require("path");
const router = require("express").Router();
const db = require("../models")

router.get("/appointment/:date", function(req, res){
  let info =  {
    year: req.params.date.split("-")[0],
    month: req.params.date.split("-")[1],
    day: req.params.date.split("-")[2]
  };
  console.log(
   info
  );

  db.Bookings.findAll({
    order:
    db.sequelize.literal('time ASC')

    ,
    where: {
      date: req.params.date
    }
  }).then(function(dbBookings){
    console.log(dbBookings);
      res.send(dbBookings);
  })
})


router.post("/appointment", function(req, res){
  console.log(req.body);
  res.status(200);
  res.send("OK!")
})

// If no API routes are hit, send the React app
router.use(function (req, res) {
    console.log(req.path)
    if (!res.headersSent) {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    }
  });
  
  module.exports = router;
  