const express = require("express");
const app = express();
const cors = require("cors");
const WeatherRecord = require("./db.js");

app.use(cors());
app.use(express.static("public"));

// Define API endpoint
app.get("/station/:id", async (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  const element = req.params.element;
  let whereClause = { station_id: id };
  if (date && element) {
    whereClause = { ...whereClause, date: date, element: element };
  } else if (date) {
    whereClause = { ...whereClause, date: date };
  } else if (element) {
    whereClause = { ...whereClause, element: element };
  }
  try {
    const records = await WeatherRecord.findAll({
      where: whereClause,
    });
    res.send(records);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving station data");
  }
});

// Set port, start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
