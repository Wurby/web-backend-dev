const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

Util.buildVehicleDetail = async function (data) {
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const mileFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });

  let vehicle;
  if (data.length > 0) {
    vehicle = '<section id="detailWrapper">';
    vehicle += '<div id="detailImage">';
    vehicle +=
      '<img src="' +
      data[0].inv_image +
      '" alt="Image of ' +
      data[0].inv_make +
      " " +
      data[0].inv_model +
      ' on CSE Motors" />';
    vehicle += '<div id="detailImageSubtitle">';
    vehicle +=
      "<h4>" +
      "A beautiful " +
      data[0].inv_color +
      " " +
      data[0].inv_make +
      " " +
      data[0].inv_model +
      "</h4>";
    vehicle += "</div>";
    vehicle += "</div>";
    vehicle += '<div id="detailInfoPanel">';
    vehicle += '<div id="detailPriceBlock">';
    vehicle += "<h5>";
    vehicle += data[0].classification_name + " - " + data[0].inv_year;
    vehicle += "</h5>";
    vehicle += "<h4>";
    vehicle += data[0].inv_make + " " + data[0].inv_model;
    vehicle += "</h4>";
    vehicle += "<h2>";
    vehicle += moneyFormatter.format(data[0].inv_price);
    vehicle += "</h2>";
    vehicle += "</div>";
    vehicle += '<div id="detailDescriptionBlock">';
    vehicle += "<h3>Description</h3>";
    vehicle += "<p>" + data[0].inv_description + "</p>";
    vehicle += '<ul id="detailSpecs">';
    vehicle += "<li><strong>Color:</strong> " + data[0].inv_color + "</li>";
    vehicle +=
      "<li><strong>Miles:</strong> " +
      mileFormatter.format(data[0].inv_miles) +
      "</li>";
    vehicle += "<li><strong>Year:</strong> " + data[0].inv_year + "</li>";
    vehicle += "</ul>";
    vehicle += "</div>";
    vehicle += "</section>";
  } else {
    vehicle =
      '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return vehicle;
};

// {
//   inv_id: 12,
//   inv_make: 'Ford',
//   inv_model: 'Model T',
//   inv_year: '1921',
//   inv_description: 'The Ford Model T can be a bit tricky to drive. It was the first car to be put into production. You can get it in any color you want as long as it is black.',
//   inv_image: '/images/vehicles/model-t.jpg',
//   inv_thumbnail: '/images/vehicles/model-t-tn.jpg',
//   inv_price: '30000',
//   inv_miles: 26357,
//   inv_color: 'Black',
//   classification_id: 5,
//   classification_name: 'Sedan'
// }

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
