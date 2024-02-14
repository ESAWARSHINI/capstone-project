import { DataTypes } from "sequelize";

import { sequelize } from "../config.js";

const Book = sequelize.define(
  "Book",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    genre: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    rating: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

export { Book };
