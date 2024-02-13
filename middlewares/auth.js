import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
  //next -> to call the callback function
  try {
    const token = request.header("x-auth-token");
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    response.status(401).send({ msg: error.message });
  }
};

export { auth };
