const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

async function addClassification(classification_name) {
  try {
    const data = await pool.query(
      "INSERT INTO public.classification (classification_name) VALUES ($1)",
      [classification_name]
    );
    return data.rows;
  } catch (error) {
    console.error("addClassification error " + error);
  }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

async function getVehicleDetail(vehicle_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.inv_id = $1`,
      [vehicle_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getVehicleDetail error " + error);
  }
}

async function addInventory(
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
) {
  try {
    const data = await pool.query(
      `INSERT INTO public.inventory 
      (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
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
      ]
    );
    return data.rows;
  } catch (error) {
    console.error("addInventory error " + error);
  }
}

async function editInventory(
  inv_id,
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
) {
  try {
    const data = await pool.query(
      `UPDATE public.inventory 
      SET inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4, inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_miles = $8, inv_color = $9, classification_id = $10 
      WHERE inv_id = $11
      RETURNING * `,
      [
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
        inv_id,
      ]
    );
    return data.rows;
  } catch (error) {
    console.error("editInventory error " + error);
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleDetail,
  addClassification,
  editInventory,
  addInventory,
};
