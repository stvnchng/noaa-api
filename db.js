const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("weather", "user", "password", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 30000,
  },
});

// Define WeatherRecord model
const WeatherRecord = sequelize.define(
  "WeatherRecord",
  {
    station_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false,
    },
    element: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    value1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mflag1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qflag1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sflag1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mflag2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qflag2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sflag2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false, // disable the timestamp behavior
    tableName: "weatherrecords",
  }
);

// set up an event listener for when the database connection is established
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = WeatherRecord;
