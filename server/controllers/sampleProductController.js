const Product = require("../models/Product");
const mongoose = require("mongoose");
const cosineSimilarity = require("../functions/cosineSimilarity.js");
const SimilarityScore = require("../models/SimilarityScore");

const sampleProductController = {
  getSimilarProducts: async (req, res) => {
    const targetProductId = req.params.id;

    try {
      // Create Feature Vectors
      const products = await Product.find({}, "side category")
        .populate("category")
        .lean();
      
      const featureVectors = products.map((product) => [
        product.side,
        product.category.name,
      ]);
      // Find the index of the target product
      const targetProductIndex = products.findIndex(
        (product) => product._id.toString() === targetProductId
      );

      // Check if the target product index is valid
      if (targetProductIndex === -1) {
        return res.status(404).json({ message: "Target product not found" });
      }

      // Get the target product's feature vector
      const targetFeatureVector = featureVectors[targetProductIndex];

      // Perform Similarity Calculations
      const similarityScores = [];
      for (let i = 0; i < featureVectors.length; i++) {
        const similarity = cosineSimilarity(
          featureVectors[i],
          targetFeatureVector
        );
        console.log("🚀 ~ file: sampleProductController.js:41 ~ getSimilarProducts: ~ similarity:", similarity)
        // Check if the similarity score is a valid number
        if (!isNaN(similarity)) {
          similarityScores.push({
            product_id: products[i]._id,
            similarity_score: similarity,
          });
        }
      }

      // Store Similarity Scores in MongoDB
      await SimilarityScore.insertMany(similarityScores);

      // Retrieve Similar Products
      const similarScores = await SimilarityScore.find({
        product_id: { $ne: targetProductId },
        similarity_score: { $gt: 0.7 },
      })
        .sort({ similarity_score: -1 })
        .populate("product_id");

      const similarProductIds = similarScores.map(
        (score) => score.product_id._id
      );
      const similarProducts = await Product.find({
        _id: { $in: similarProductIds },
      });

      res.json({ message: "Similar Products:", data: similarProducts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = sampleProductController;
