import { verify } from "jsonwebtoken";

const verifyToken = (request, response, next) => {
  const authHeader =
    request.headers["authorization"] || request.body.refreshToken;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (user) {
        request.user = user;
        next();
      } else {
        response.status(403).json("You are not authenticated!");
      }
    });
  } else {
    return response.status(403).json("You are not authenticated!");
  }
};

export default verifyToken;
