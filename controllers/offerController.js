const Offer = require('../models/Offer');
const jwt = require("jsonwebtoken");

// Получение всех офферов
exports.getAllOffers = (req, res) => {
    Offer.getAllOffers()
        .then(results => {
            console.log("Fetched offers:", results);
            res.status(200).json(results);
        })
        .catch(error => {
            console.error("Error fetching offers:", error);
            res.status(500).json({ error: "Failed to fetch offers" });
        });
};

exports.createOffer = (req, res) => {
    const { title, description, requiredSkills, location, date, contactInfo, status } = req.body;
    const { id: createdBy } = req.user;
    Offer.createOffer({ title, description, requiredSkills, location, date, contactInfo, status, createdBy })
        .then(result => {
            console.log("Created offer with ID:", result.id);
            res.status(201).json(result);
        })
        .catch(error => {
            console.error("Error creating offer:", error);
            res.status(500).json({ error: "Failed to create offer" });
        });
};

// Получение всех офферов для конкретного пользователя
exports.getAllOffersByUser = (req, res) => {
    const userId = req.user.id; // Получение ID пользователя из middleware
    Offer.getAllOffersByUser(userId)
        .then(results => {
            console.log("Fetched offers:", results);
            res.status(200).json(results);
        })
        .catch(error => {
            console.error("Error fetching offers:", error);
            res.status(500).json({ error: "Failed to fetch offers" });
        });
};
// Обновление оффера
exports.updateOffer = (req, res) => {
    const { id } = req.params;
    const offerData = req.body;
    Offer.updateOffer(id, offerData)
        .then(result => {
            console.log("Updated offer with ID:", id);
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Error updating offer:", error);
            res.status(500).json({ error: "Failed to update offer" });
        });
};

// Удаление оффера
exports.deleteOffer = (req, res) => {
    const { id } = req.params;
    Offer.deleteOffer(id)
        .then(() => {
            console.log("Deleted offer with ID:", id);
            res.status(204).send();
        })
        .catch(error => {
            console.error("Error deleting offer:", error);
            res.status(500).json({ error: "Failed to delete offer" });
        });
};
