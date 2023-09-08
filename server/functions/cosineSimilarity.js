// Calculate the cosine similarity between two vectors
function cosineSimilarity(vectorA, vectorB) {
  // Create a set of unique words from both vectors
  const uniqueWords = new Set([...vectorA, ...vectorB]);

  // Create vectors with word frequencies
  const vectorAFrequencies = Array.from(uniqueWords).map(
    (word) => vectorA.filter((value) => value === word).length
  );
  const vectorBFrequencies = Array.from(uniqueWords).map(
    (word) => vectorB.filter((value) => value === word).length
  );

  const dotProduct = dot(vectorAFrequencies, vectorBFrequencies);
  const magnitudeA = magnitude(vectorAFrequencies);
  const magnitudeB = magnitude(vectorBFrequencies);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

// Calculate the dot product of two vectors
function dot(vectorA, vectorB) {
  let dotProduct = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
  }

  return dotProduct;
}

// Calculate the magnitude of a vector
function magnitude(vector) {
  let sumOfSquares = 0;

  for (let i = 0; i < vector.length; i++) {
    sumOfSquares += vector[i] * vector[i];
  }

  return Math.sqrt(sumOfSquares);
}

module.exports = cosineSimilarity;
