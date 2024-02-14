import bcrypt from "bcrypt";

import { Movie } from "../models/movies.js";

import userService from "../services/users-service.js";
import jwt from "jsonwebtoken";

async function getUsers(request, response) {
  console.log(request.query);
  if (request.query.search) {
    response.send(await userService.searchFunction(request.query.search));
  } else {
    response.send(await userService.getUserFunction());
  }
}

async function genHashPassword(password) {
  const no_of_rounds = 3;
  const salt = await bcrypt.genSalt(no_of_rounds);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}
async function insertUsers(request, response) {
  console.log(request.body);
  const { username, password } = request.body;
  if (password.length < 8) {
    response
      .status(400)
      .send({ msg: "Password length must be greater than 8" });
  } else {
    const hashPassword = await genHashPassword(password);
    response.send(await userService.insertUserFunction(username, hashPassword));
  }
}

async function checkUser(request, response) {
  const { username, password } = request.body;
  const userFromDb = await userService.checkUserFunction(username);
  if (!userFromDb) {
    response.status(401).send({ message: "invalid credentials" });
  } else {
    const storedDbPassword = userFromDb.password;
    const passwordCheck = await bcrypt.compare(password, storedDbPassword);

    if (passwordCheck) {
      const token = jwt.sign({ id: userFromDb.id }, process.env.SECRET_KEY);
      userService.createSessionFunction(userFromDb.id, token);
      response.send({ msg: "successful login", token });
    } else {
      response.send({ msg: "Invalid credentials" });
    }
  }
}

async function updateProfile(request, response) {
  const { token, profile } = request.body;

  response.send(await userService.updateProfileFunction(token, profile));
}

async function logoutProfile(request, response) {
  const token = request.header("x-auth-token");

  response.send(await userService.logoutProfileFunction(token));
}

export default {
  getUsers,
  insertUsers,
  checkUser,
  updateProfile,
  logoutProfile,
};
