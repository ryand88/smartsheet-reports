const express = require("express");
const router = express.Router();
const client = require("smartsheet");

router.get("/test", (req, res) => res.json({ msg: "sheet test" }));

router.get("/sheet-list", (req, res) => {
  const smartsheet = client.createClient({
    accessToken: req.headers.access_token
  });

  smartsheet.sheets
    .listSheets()
    .then(function(sheetList) {
      res.json(sheetList);
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.get("/:id", (req, res) => {
  const smartsheet = client.createClient({
    accessToken: req.headers.access_token
  });

  console.log(req.params.id);

  const { id } = req.params;
  // Get sheet
  smartsheet.sheets
    .getSheet({ id })
    .then(function(sheetInfo) {
      res.json(sheetInfo);
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
