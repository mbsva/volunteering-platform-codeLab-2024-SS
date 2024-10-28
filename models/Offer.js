const connection = require('../services/database');
const offersTable = "offers";

// get all offers
const getAllOffers = () => new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${offersTable}`;
    console.log('Bye');
    connection.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
});

// New Offer
const createOffer = (offerData) => new Promise((resolve, reject) => {
    const { title, description, requiredSkills, location, date, contactInfo, status, createdBy } = offerData;
    const query = `INSERT INTO ${offersTable} (title, description, requiredSkills, location, date, contactInfo, status, createdBy)
    VALUES (${connection.escape(title)}, ${connection.escape(description)}, ${connection.escape(requiredSkills)}, 
    ${connection.escape(location)}, ${connection.escape(date)}, ${connection.escape(contactInfo)}, ${connection.escape(status)}, ${connection.escape(createdBy)})`;

    console.log('Executing query:', query);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            reject(error);
        } else {
            offerData.id = results.insertId;
            resolve(offerData);
        }
    });
});

// Update offer
const updateOffer = (id, offerData) => new Promise((resolve, reject) => {
    const { title, description, requiredSkills, location, date, contactInfo, status } = offerData;
    const query = `UPDATE ${offersTable} SET title = ${connection.escape(title)}, description = ${connection.escape(description)}, 
    requiredSkills = ${connection.escape(requiredSkills)}, location = ${connection.escape(location)}, date = ${connection.escape(date)}, 
    contactInfo = ${connection.escape(contactInfo)}, status = ${connection.escape(status)} WHERE id = ${connection.escape(id)}`;

    connection.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve({ id, ...offerData });
        }
    });
});


// Функция для получения всех офферов для конкретного пользователя
const getAllOffersByUser = (userId) => new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${offersTable} WHERE createdBy = ${connection.escape(userId)}`;
    connection.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
});
// Функция для удаления оффера
const deleteOffer = (id) => new Promise((resolve, reject) => {
    const query = `DELETE FROM ${offersTable} WHERE id = ${connection.escape(id)}`;

    connection.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
});

module.exports = {
    getAllOffers,
    createOffer,
    updateOffer,
    deleteOffer,
    getAllOffersByUser
};
