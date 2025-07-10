import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import session from "express-session";
import MongoStore from "connect-mongo";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors({
  origin: "https://rtc-app-xeoq.onrender.com",
  credentials: true
}));

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

// {
//   origin: "http://localhost:3000", // or your frontend domain
//   credentials: true
// }

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ Mongo connection error:", err.message);
});

// // Session setup
// app.use(
//   session({
//     secret: "supersecretkey123", // replace in production
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 2, // 2 day
//       secure: false, // true if using HTTPS
//     },
//   })
// );

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected at: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`🚀 Server listening on port ${app.get("port")}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit so Render shows crash
  }
};

start();
