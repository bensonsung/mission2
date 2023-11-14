// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();
const PORT = 3000;

const SENSITIVE_WORDS = ["collide", "crash", "scratch", "bump", "smash"];

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to add a claim
app.post("/add_claim", (req, res) => {
  try {
    const claimText = req.body.claim_text;
    const sensitiveWordCount = countSensitiveWords(claimText);

    // Map the sensitive word count to a risk category
    const riskCategory = mapToRiskCategory(sensitiveWordCount);

    // You can save the claim text, sensitive word count, and risk category to your database here

    const response = {
      status: "success",
      message: "Claim added successfully",
      sensitive_word_count: sensitiveWordCount,
      risk_category: riskCategory,
    };

    res.json(response);
  } catch (error) {
    const response = {
      status: "error",
      message: error.message,
    };
    res.status(400).json(response);
  }
});

// Function to count sensitive words
function countSensitiveWords(text) {
  const lowerCaseText = text.toLowerCase();
  return SENSITIVE_WORDS.reduce(
    (count, word) => count + lowerCaseText.split(word).length - 1,
    0
  );
}

// Function to map sensitive word count to a risk category on a scale from 1 to 5
function mapToRiskCategory(count) {
  if (count === 0) {
    return 1;
  } else if (count === 1) {
    return 2;
  } else if (count <= 3) {
    return 3;
  } else if (count <= 5) {
    return 4;
  } else {
    return 5;
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
