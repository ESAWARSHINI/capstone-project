import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Access = sequelize.define(
  "Access",
  {
    // Model attributes are defined here
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
// true
export { Access };
