// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities/index.js");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:vehicleId", invController.buildVehicleDetail);
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

router.get("/add-classification", invController.buildAddClassification);
router.get(
  "/edit/:inv_id",
  utilities.checkUserRights,
  utilities.handleErrors(invController.editInventoryView)
);
router.get(
  "/delete/:inv_id",
  utilities.checkUserRights,
  utilities.handleErrors(invController.buildDeleteInventoryConfirmation)
);

router.post("/delete", utilities.handleErrors(invController.deleteInventory));

router.post(
  "/update",
  utilities.checkUserRights,
  invValidate.editInventoryRules(),
  invValidate.checkEditInventoryFields,
  utilities.handleErrors(invController.processEditInventory)
);

router.post(
  "/add-classification",
  utilities.checkUserRights,
  invValidate.checkClassificationExists,
  invValidate.classificationField,
  utilities.handleErrors(invController.processAddClassification)
);
router.get(
  "/add-inventory",
  utilities.checkUserRights,
  invController.buildAddInventory
);
router.post(
  "/add-inventory",
  utilities.checkUserRights,
  invValidate.inventoryRules(),
  invValidate.checkInventoryFields,
  utilities.handleErrors(invController.processAddInventory)
);

router.get("/", utilities.checkUserRights, invController.buildInventoryHome);

module.exports = router;
