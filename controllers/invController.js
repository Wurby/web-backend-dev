const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

invCont.buildVehicleDetail = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId;
  const data = await invModel.getVehicleDetail(vehicle_id);
  const vehicle = await utilities.buildVehicleDetail(data);
  let nav = await utilities.getNav();
  res.render("./inventory/vehicle", {
    title: data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model,
    nav,
    vehicle,
  });
};

invCont.buildInventoryHome = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  });
};

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
};

invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors: null,
    classificationList,
    ...utilities.defaultClassificationFormItems,
  });
};

invCont.processAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const result = await invModel.addClassification(classification_name);
  if (result) {
    req.flash("notice", "Classification added successfully.");
    res.render("inventory/add-classification", {
      nav: await utilities.getNav(),
      title: "Add Classification",
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, there was an error adding the classification.");
    res.render("inventory/add-classification", {
      nav,
      title: "Add Classification",
      errors: null,
    });
  }
};

invCont.processAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
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

  const result = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );

  if (result) {
    req.flash("notice", "Inventory added successfully.");
    res.render("inventory/management", {
      nav,
      title: "Add Inventory",
      errors: null,
      classificationList: await utilities.buildClassificationList(),
      ...utilities.defaultClassificationFormItems,
    });
  } else {
    req.flash("notice", "Sorry, there was an error adding the inventory.");
    res.render("inventory/add-inventory", {
      nav,
      title: "Add Inventory",
      errors: null,
      classificationList: await utilities.buildClassificationList(),
      ...req.body,
    });
  }
};

module.exports = invCont;
