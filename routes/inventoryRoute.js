// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities/index.js");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:vehicleId", invController.buildVehicleDetail);
router.get("/add-classification", invController.buildAddClassification);
router.post(
  "/add-classification",
  invValidate.checkClassificationExists,
  invValidate.classificationField,
  utilities.handleErrors(invController.processAddClassification)
);
router.get("/add-inventory", invController.buildAddInventory);
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryFields,
  utilities.handleErrors(invController.processAddInventory)
);

router.get("/", invController.buildInventoryHome);

module.exports = router;
