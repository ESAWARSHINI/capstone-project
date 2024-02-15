import jwt from "jsonwebtoken";
import { Session } from "../models/sessions.js";
const auth = async (request, response, next) => {
  //next -> to call the callback function
  try {
    const token = request.header("x-auth-token");
    jwt.verify(token, process.env.SECRET_KEY);
    const userSession = await Session.findOne({
      where: {
        token: token,
        expiry: "no",
      },
    });
    if (userSession) {
      next();
    } else {
      response.status(401).send({ msg: "login expired" });
    }
  } catch (error) {
    response.status(403).send({ msg: error.message });
  }
};

export { auth };
