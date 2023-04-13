const express = require("express");
const notificationController = require("../Controllers/notifications_Controller")
const router = express.Router();



router.post('/sendNotification',notificationController.sendNotification)
router.get('/GetNotification/:matricule',notificationController.GetNotification)
router.put('/putNotifications',notificationController.putNotifications)




module.exports = router