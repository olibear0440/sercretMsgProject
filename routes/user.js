const express = require("express");
//creation du router
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

/*
 * creation utilisateur
 * login utilisateur
 * renvoi tout les utilisateurs
 */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getAllUsers);
router.get("/currentUser", auth, userCtrl.getCurrentUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
