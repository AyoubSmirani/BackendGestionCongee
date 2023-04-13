const express = require("express");
const db = require("../DB/database.js")
const router = express.Router();

router.post('/message', (req, res) => {
  console.log(req.body.message)
  
    db.query("SELECT response FROM responses WHERE prompt = ?", [req.body.message], (err, row) => {
      if (err) {
        res.send({message: 'Error retrieving response from database'});
      } else if (row) {
        console.log(row)
        res.send({message: row[0].response});
      } else {
        res.send({message: 'Response not found in database'});
      }
    });



  });

module.exports = router