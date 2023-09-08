const mongoose = require("mongoose");

const SimilarityScoreSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  similarity_score: Number,
});

const SimilarityScore = mongoose.model("SimilarityScore", SimilarityScoreSchema);
module.exports = SimilarityScore;
