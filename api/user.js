const express = require("express");
const router = express.Router();
const client = require("smartsheet");

router.get("/test", (req, res) => res.json({ msg: "user test" }));

router.get("/current-user", (req, res) => {
  const smartsheet = client.createClient({
    accessToken: req.headers.access_token
  });

  smartsheet.users
    .getCurrentUser()
    .then(function(userProfile) {
      res.json(userProfile);
    })
    .catch(function(error) {
      res.json(error);
      console.log(error);
    });
});

module.exports = router;
