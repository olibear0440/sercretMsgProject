const express = require("express");
//creation du router
const router = express.Router();
const userCtrl = require("../controllers/user");

/*
    * creation utilisateur
    * login utilisateur
*/
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
