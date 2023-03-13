const express = require("express");
const app = express();
const cors = require("cors");
const WeatherRecord = require("./models");

app.use(cors());
app.use(express.static("public"));

// Define API endpoint
app.get("/station/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const records = await WeatherRecord.findAll({
      where: { station_id: id },
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
