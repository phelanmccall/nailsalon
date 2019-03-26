const path = require("path");
const router = require("express").Router();



// If no API routes are hit, send the React app
router.use(function (req, res) {
    console.log(req.path)
    if (!res.headersSent) {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    }
  });
  
  module.exports = router;
  