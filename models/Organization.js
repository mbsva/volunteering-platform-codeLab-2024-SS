const connection = require('../services/database');
const organizationsTable = "organisations";
const jwt = require('jsonwebtoken');

const createOrganization = (organizationData) => new Promise((resolve, reject) => {
    const { name, email, password, contactInfo, description } = organizationData;
    const query = `INSERT INTO organisations (name, email, password, contactInfo, description) 
                   VALUES (${connection.escape(name)}, ${connection.escape(email)}, ${connection.escape(password)}, ${connection.escape(contactInfo)}, ${connection.escape(description)})`;

    console.log('Executing query:', query);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            reject(error);
        } else {
            console.log('Query results:', results);
            resolve({ id: results.insertId, ...organizationData });
        }
    });
});


const findOrganizationByEmail = (email) => new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${organizationsTable} WHERE email = ${connection.escape(email)}`;

    connection.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
});
// Функция для поиска организации по ID
const findOrganizationById = (id) => new Promise((resolve, reject) => {
    const query = `SELECT id, name, email, contactInfo, description FROM organisations WHERE id = ${connection.escape(id)}`;
    connection.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
});

const updateOrganization = (token, organizationData) => new Promise((resolve, reject) => {
    const { name, email, password, contactInfo, description } = organizationData;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const id = decoded.id
    const query = `UPDATE ${organizationsTable} SET name = ${connection.escape(name)}, email = ${connection.escape(email)}, password = ${connection.escape(password)}, contactInfo = ${connection.escape(contactInfo)}, description = ${connection.escape(description)} WHERE id = ${connection.escape(id)}`;




    console.log('Executing query:', query);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            reject(error);
        } else {
            console.log('Query results:', results);
            resolve({ id, ...organizationData });
        }
    });
});

// Функция для удаления организации
const deleteOrganization = (id) => new Promise((resolve, reject) => {
    const query = `DELETE FROM ${organizationsTable} WHERE id = ${connection.escape(id)}`;

    console.log('Executing query:', query);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            reject(error);
        } else {
            console.log('Query results:', results);
            resolve(results);
        }
    });
});
module.exports = {
    createOrganization,
    findOrganizationByEmail,
    findOrganizationById,
    updateOrganization,
    deleteOrganization
};
