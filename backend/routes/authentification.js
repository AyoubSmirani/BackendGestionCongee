const express = require("express");
const authentificationController = require("../Controllers/authentificationController")
const router = express.Router();


router.post('/signin',authentificationController.signin)
router.post('/test', authentificationController.verifytoken ,authentificationController.test)
router.get('/getAllAccount',authentificationController.getAllAccount)
router.post('/addAccount',authentificationController.addAccount)
router.put('/updateCompte',authentificationController.updateUser)



module.exports = router