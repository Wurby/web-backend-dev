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
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView)
);

router.post(
  "/update",
  invValidate.editInventoryRules(),
  invValidate.checkEditInventoryFields,
  utilities.handleErrors(invController.processEditInventory)
);

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
