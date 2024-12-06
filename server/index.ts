import prisma from "./lib/prisma";
import { ErrorHandler, errorHandler, notFound } from "./middlewares/errors";
import express from "express";
import bcrypt from "bcrypt";
import cookieParse from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import cors from "cors";
import { auth, rolesMiddleware } from "./middlewares/auth";
import { ROLE } from "@prisma/client";
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(
  cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true })
);
app.use(cookieParse());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post("/register", async (req, res, next): Promise<any> => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      throw new ErrorHandler(400, "Missing required fields");
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new ErrorHandler(400, "User already exists");
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    next(error);
  }
});

app.post("/login", async (req, res, next): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorHandler(400, "Missing required fields");
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new ErrorHandler(401, "Invalid password");
    }

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        role: user.role,
      },
      "secret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true,sameSite:"strict",secure:true });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(error);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

app.get("/profile", auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: Number(req.user.id) } });
  res.status(200).json({ message: "Profile", user });
});

app.get("/admin", auth, rolesMiddleware(ROLE.ADMIN), async (req, res, next) => {
  const user = await prisma.user.findUnique({ where: { id: Number(req.user.id) } });
  res.status(200).json({ message: "Admin", user });
});

//Error RequestHandler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
