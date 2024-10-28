const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');


exports.authenticate = async (req, res, next) => {
    try {
        console.log("Hello");
        console.log(req.cookies['accessToken'])
       const token = req.cookies['accessToken']
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        if (!decoded) return res.status(401).send("unauthorized");
        console.log('No');

        const organization = await Organization.findOrganizationById(decoded.id);
        if (!organization) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Bye')
        req.user = organization;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Unauthorized by middleware' });
    }
};