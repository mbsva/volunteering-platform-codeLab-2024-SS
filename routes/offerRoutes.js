const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");
const authMiddleware = require('../middleware/authMiddleware');

console.log('Setting up offer routes...');

// Route to get all offers
router.get("/all", offerController.getAllOffers);

// Маршрут для получения всех офферов
router.get("/", authMiddleware.authenticate, offerController.getAllOffersByUser);

// Маршрут для создания нового оффера
router.post("/", authMiddleware.authenticate, offerController.createOffer);

// Маршрут для обновления оффера
router.put("/:id", authMiddleware.authenticate, offerController.updateOffer);

// Маршрут для удаления оффера
router.delete("/:id", authMiddleware.authenticate, offerController.deleteOffer);

module.exports = router;
