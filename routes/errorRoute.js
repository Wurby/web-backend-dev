const express = require("express");
const errorController = require("../controllers/errorController");
const router = express.Router();

// error route that asks the error controller to deliver the error view
router.get("/404", errorController.build404);
router.get("/500", errorController.build500);

module.exports = router;
