const express = require("express");
const recommendedProductRoute = express.Router();
const sampleProductController = require("../controllers/sampleProductController");

recommendedProductRoute.get(
  "/api/product/getRecommendedProducts/:id",
  sampleProductController.getSimilarProducts
);
module.exports = recommendedProductRoute;
