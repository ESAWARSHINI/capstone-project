import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Movie = sequelize.define(
  "Movie",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(Movie === sequelize.models.Movie); // true
export { Movie };
