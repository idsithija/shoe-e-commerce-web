import { sign } from "jsonwebtoken";

const generateAccessToken = (id) => {
  const accessToken = sign({ id: id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

  return accessToken;
};

const generateRefreshToken = (id) => {
  const refreshToken = sign({ id: id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
