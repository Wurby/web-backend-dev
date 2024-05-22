// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/index.js");
const regValidate = require("../utilities/account-validation");

// Route to build account view
router.get("/login", accountController.buildLogin);
router.get("/registration", accountController.buildRegister);
router.post(
  "/registration",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
