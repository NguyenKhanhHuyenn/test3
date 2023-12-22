const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.post("/register", authController.registerAccount);

router.post("/login", authController.loginAccount);

// Log out
router.post("/logout", middlewareController.verifyToken, authController.accountLogout);

module.exports = router;
