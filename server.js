const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
    return res.send(`
      <h2>Invalid input</h2>
      <p>Please enter positive numbers for weight and height.</p>
      <a href="/">Go back</a>
    `);
  }

  const bmi = (weight / (height * height)).toFixed(2);

  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "blue";
  } else if (bmi < 24.9) {
    category = "Normal weight";
    color = "green";
  } else if (bmi < 29.9) {
    category = "Overweight";
    color = "orange";
  } else {
    category = "Obese";
    color = "red";
  }

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h1>BMI Result</h1>
          <p>Your BMI is: <strong>${bmi}</strong></p>
          <p style="color:${color}; font-weight:bold;">Category: ${category}</p>
          <a href="/">Calculate Again</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


