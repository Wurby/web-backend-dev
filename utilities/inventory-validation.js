const utilities = require(".");
const invModel = require("../models/inventory-model");
const { body, validationResult } = require("express-validator");

const invValidate = {};

invValidate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name."),
  ];
};

invValidate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a make."),
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a model."),
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .withMessage("Please provide a 4-digit year."),
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Server Error, image not found."),
    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Server Error, thumbnail not found."),
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a price."),
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide miles."),
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please select a classification."),
  ];
};

invValidate.checkClassificationExists = async (req, res, next) => {
  const { classification_name } = req.body;
  const nav = await utilities.getNav();

  // verify classification does not already exist
  const data = await invModel.getClassifications();
  const classifications = data.rows;
  let existingClassification = false;

  classifications.forEach((classification) => {
    if (classification.classification_name === classification_name) {
      existingClassification = true;
    }
  });

  if (existingClassification) {
    req.flash(
      "notice",
      `Classification ${classification_name} already exists.`
    );
    res.status(500).render("inventory/add-classification", {
      nav,
      title: "Add Classification",
      errors: null,
    });
    return;
  }
  next();
};

invValidate.classificationField = async (req, res, next) => {
  const { classification_name } = req.body;
  const nav = await utilities.getNav();

  if (!classification_name.match(/^[a-zA-Z]+$/)) {
    console.log("Classification name must contain only letters.");
    req.flash("notice", "Classification name must contain only letters.");
    res.status(500).render("inventory/add-classification", {
      nav,
      title: "Add Classification",
      errors: null,
    });
    return;
  }
  next();
};

invValidate.checkInventoryFields = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  const nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
  let errors = [];

  errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("notice", "Please correct the following errors:");
    res.status(500).render("inventory/add-inventory", {
      errors,
      nav,
      title: "Add Inventory",
      classificationList,
      ...utilities.defaultClassificationFormItems,
    });
    return;
  }

  next();
};

module.exports = invValidate;
