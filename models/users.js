import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const SignUp = sequelize.define(
  "SignUp",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
console.log(SignUp === sequelize.models.SignUp); // true
export { SignUp };
