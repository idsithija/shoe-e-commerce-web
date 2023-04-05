import { Router } from "express";
import users from "../models/users";
import CryptoJS from "crypto-js";
import verifyToken from "../utils/verifyToken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

var identityService = Router();

identityService.post("/register", async (request, response, next) => {
  const body = request.body;

  const userExist = await users.findOne({ email: body.email });

  if (userExist) {
    response.status(401).json({ message: "That user already exisits!" });
  } else {
    const newUser = new users({
      name: body.name,
      email: body.email,
      password: CryptoJS.AES.encrypt(
        body.password,
        process.env.CRYPTO_JS_SECRET_KEY
      ).toString(),
      usertype: body.usertype,
    });

    try {
      await newUser.save();
      response.status(200).json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }
});

identityService.post("/login", async (request, response, next) => {
  try {
    const body = request.body;

    const userExist = await users.findOne({ email: body.email });

    if (!userExist) {
      response.status(401).json({ message: "Wrong password or username!" });
    } else {
      const bytes = CryptoJS.AES.decrypt(
        userExist.password,
        process.env.CRYPTO_JS_SECRET_KEY
      );

      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== body.password) {
        response.status(401).json({ message: "Wrong password or username!" });
      } else {
        const accessToken = generateAccessToken(userExist);
        const refreshToken = generateRefreshToken(userExist);

        response
          .status(200)
          .json({ name: userExist.name, accessToken, refreshToken });
      }
    }
  } catch {
    next(error);
  }
});

identityService.get("/test", verifyToken, async (request, response, next) => {
  try {
    response.status(200).json({ message: "Success" });
  } catch (error) {
    next(error);
  }
});

export default identityService;
