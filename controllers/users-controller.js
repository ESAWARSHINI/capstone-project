import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

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
  const { username, password, roleid } = request.body;
  if (password.length < 8) {
    response
      .status(400)
      .send({ msg: "Password length must be greater than 8" });
  } else {
    const hashPassword = await genHashPassword(password);
    response.send(
      await userService.insertUserFunction(username, hashPassword, roleid)
    );
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

async function userPic(req, res) {
  cloudinary.config({
    secure: true,
  });

  console.log(process.env.CLOUDINARY_URL);
  // CLOUDINARY_URL=cloudinary://592113388331896:pZacpSZWFzH7oi-ILHcwGozyiSY@dngylxf2d
  // Log the configuration
  console.log(cloudinary.config());

  /////////////////////////
  // Uploads an image file
  /////////////////////////
  const uploadImage = async (imagePath) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  (async () => {
    // Set the image to upload
    const imagePath = req.file.path;

    // Upload the image
    const publicId = await uploadImage(imagePath);
    console.log("publicid : " + publicId);
    res.send({ msg: "uploaded", secure_url: publicId.secure_url });
  })();
}

async function deleteProfile(request, response) {
  const token = request.header("x-auth-token");
  const { id } = request.params;

  const rolename = await userService.deleteProfileFunction(token);
  if (rolename == "super-user") {
    console.log(id);
    const obj = await userService.deleteFunction(id);
    obj ? response.send("deleted") : response.status(404).send(NOT_FOUND_MSG);
  } else {
    response.send({ msg: "you do not have access" });
  }
}

export default {
  getUsers,
  insertUsers,
  checkUser,
  updateProfile,
  logoutProfile,
  userPic,
  deleteProfile,
};
