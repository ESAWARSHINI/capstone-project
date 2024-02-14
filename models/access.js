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
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
// true
export { Access };
