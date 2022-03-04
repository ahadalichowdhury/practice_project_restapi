const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

router.post("/CreateProfile", ProfileController.CreateProfile);
router.post("/UserLogin", ProfileController.UserLogin);
router.post(
  "/SelectProfile",
  AuthVerifyMiddleware.ProfileController.SelectProfile
);

module.exports = router;
