import { sign } from "jsonwebtoken";

const generateAccessToken = (user) => {
  const accessToken = sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );

  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
