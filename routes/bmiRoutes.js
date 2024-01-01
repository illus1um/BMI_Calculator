const express = require("express");
const router = express.Router();

let bmiHistory = [];

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

router.get("/history", (req, res) => {
  res.sendFile("history.html", { root: "./public" });
});

router
  .route("/bmicalculator")
  .get((req, res) => {
    res.sendFile("index.html", { root: "./public" });
  })
  .post((req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height) / 100;
    const bmi = calculateBMI(weight, height);

    const timestamp = new Date().toLocaleString();
    bmiHistory.push({ bmi, weight, height, timestamp });

    const resultText = interpretBMI(bmi);
    res.send(resultText);
  });

router.get("/gethistory", (req, res) => {
  res.json(bmiHistory);
});

function calculateBMI(weight, height) {
  if (weight <= 0 || height <= 0) {
    return "Invalid input. Weight and height should be positive values.";
  }

  const bmi = weight / Math.pow(height, 2);
  return bmi.toFixed(2);
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return `Your BMI is ${bmi}. You are underweight.`;
  } else if (bmi >= 18.5 && bmi < 25) {
    return `Your BMI is ${bmi}. You have a normal weight.`;
  } else if (bmi >= 25 && bmi < 30) {
    return `Your BMI is ${bmi}. You are overweight.`;
  } else {
    return `Your BMI is ${bmi}. You are obese.`;
  }
}

module.exports = router;
