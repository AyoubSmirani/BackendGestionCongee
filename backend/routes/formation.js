const express = require("express");
const formationController = require("../Controllers/formation_Controller")
const router = express.Router();


router.post('/postFormation',formationController.postFormation)
router.get('/getAllFormation',formationController.getAllFormation)
router.post('/affctedFormationByPoste',formationController.affctedFormationByPoste)
router.get('/getListFormation/:matricule',formationController.getListFormation)
router.get('/getListPoste',formationController.getListPoste)







module.exports = router