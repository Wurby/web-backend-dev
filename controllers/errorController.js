const utilities = require("../utilities/index.js");

const errorController = {};

errorController.build404 = async function (req, res) {
  const nav = await utilities.getNav();
  const message = "You've found the 404 page, something wasn't found.";
  res.render("errors/error", { title: "Error!", nav, message });
};

errorController.build500 = async function (req, res) {
  const nav = await utilities.getNav();
  const message = "You've found the 500 page, something went wrong.";
  res.render("errors/error", { title: "Error!", nav, message });
};

module.exports = errorController;
