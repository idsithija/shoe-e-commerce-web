import users from "../models/users";
import * as logger from "./logger";

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Not Found" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const activityLogger = async (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const body = request.body;

  let activityLogData = {
    userId: "",
    apiEndPoint: request.path,
  };

  if (authHeader) {
  } else {
    const userExist = await users.findOne({ email: body.email });
    activityLogData.userId = userExist._id;
  }

  next();
};

export { requestLogger, unknownEndpoint, errorHandler, activityLogger };
