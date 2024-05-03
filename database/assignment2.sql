-- Write SQL statements to accomplish the following tasks. Each task should be performed using a single query per task:
-- Insert the following new record to the account table Note: The account_id and account_type fields should handle their own values and do not need to be part of this query.:
-- Tony, Stark, tony@starkent.com, Iam1ronM@n
-- Modify the Tony Stark record to change the account_type to "Admin".
-- Delete the Tony Stark record from the database.
-- Modify the description field in the vehicles table to change the text "small interiors" to "a huge interior" for the GM Hummer model.
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Modify the Tony Stark record to change the account_type to "Admin".
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Delete the Tony Stark record from the database.
DELETE FROM account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Modify the description field in the vehicles table to change the text "small interiors" to "a huge interior" for the GM Hummer model.
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- inner join to get the make, model, and classification_name of all vehicles with a classification of "Sport".
SELECT inventory.inv_make,
    inventory.inv_model,
    classification.classification_name
FROM inventory
    INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';
-- replace all instances of "/images/" with "/images/vehicles/" in the inv_image and inv_thumbnail fields of the inventory table.
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');