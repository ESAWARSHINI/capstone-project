import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Session = sequelize.define(
  "Session",
  {
    // Model attributes are defined here
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
//console.log(SignUp === sequelize.models.SignUp); // true
export { Session };
