const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');

// Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, contactInfo, description } = req.body;
        console.log('Register request received:', { name, email });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed');

        // Create a new organization
        const result = await Organization.createOrganization({ name, email, password: hashedPassword, contactInfo, description });
        console.log('Organization created:', result);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating organization:', error);
        res.status(500).json({ error: 'Failed to create organization' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request received:', { email, password });

        // Find organization by email
        const organization = await Organization.findOrganizationByEmail(email);

        if (!organization) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, organization.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ id: organization.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('accessToken', token); // Setting the token as a cookie in the response
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

// Fetch user info
exports.getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) {
            throw new Error('Invalid token: ID is missing');
        }
        const user = await Organization.findOrganizationById(decoded.id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
};

// Authentication middleware
exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) res.status(401).send("unauthorised")

        const organization = await Organization.findOrganizationById(decoded.id);
        if (!organization) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = organization;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized by middleware' });
    }
};

// Function for updating user
exports.updateUser = async (req, res) => {
    const { name, email, password, contactInfo, description } = req.body;

    if(!name || !email || !password) res.status(400).json({error: "bad request"})

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await Organization.updateOrganization(req.headers.authorization.split(' ')[1], { name, email, password: hashedPassword, contactInfo, description });
        console.log('Organization updated:', result);
        res.status(200).json(result)
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Function for deleting user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    Organization.deleteOrganization(id)
        .then(() => {
            console.log("Deleted organization with ID:", id);
            res.status(204).send();
        })
        .catch(error => {
            console.error("Error deleting organization:", error);
            res.status(500).json({ error: "Failed to delete organization" });
        });
};
