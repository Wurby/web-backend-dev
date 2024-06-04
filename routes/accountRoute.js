// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/index.js");
const regValidate = require("../utilities/account-validation");

// Route to build account view
router.get("/login", accountController.buildLogin);
router.get("/registration", accountController.buildRegister);
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManageAccount)
);

router.post(
  "/registration",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

module.exports = router;
