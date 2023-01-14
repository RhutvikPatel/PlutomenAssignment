const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/register", userController.createUser)

router.get("/filter", userController.filterByDepartment)

router.get("/getUserContact/:userId", userController.getUserContact)

router.get("/getContactByFilter", userController.getContactByFilter)

module.exports = router;