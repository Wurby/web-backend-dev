const pool = require("./../database/index");

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_password
) {
  try {
    const sql =
      "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    return await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    ]);
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 *   Login account
 * *************************** */

async function loginAccount(account_email, account_password) {
  try {
    const sql =
      "SELECT * FROM account WHERE account_email = $1 AND account_password = $2";
    return await pool.query(sql, [account_email, account_password]);
  } catch (error) {
    return error.message;
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 * Update account information
 * ***************************** */
async function updateAccount(
  account_id,
  account_firstname,
  account_lastname,
  account_email
) {
  try {
    const sql =
      "UPDATE account SET account_firstname = $2, account_lastname = $3, account_email = $4 WHERE account_id = $1";
    return await pool.query(sql, [
      account_id,
      account_firstname,
      account_lastname,
      account_email,
    ]);
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 * update account password
 * ***************************** */
async function updatePassword(account_id, account_password) {
  try {
    const sql =
      "UPDATE account SET account_password = $2 WHERE account_id = $1";
    return await pool.query(sql, [account_id, account_password]);
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 * Return account data using email address
 * ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1",
      [account_email]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching email found");
  }
}

module.exports = {
  registerAccount,
  loginAccount,
  updateAccount,
  updatePassword,
  checkExistingEmail,
  getAccountByEmail,
};
