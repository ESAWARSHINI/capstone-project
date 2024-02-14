import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Role = sequelize.define(
  "Role",
  {
    // Model attributes are defined here
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
// true
export { Role };
