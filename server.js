import "dotenv/config";
import express from "express";
import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";
import universeRouter from "./routes/universe.js";
import characterRouter from "./routes/character.js";
import authRouter from "./routes/auth.js";
import conversationRouter from "./routes/chatbox.js";
import messageRouter from "./routes/message.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend
    credentials: true, // Permet l'envoi des cookies
  })
);

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//middleware pour parser le body des requêtes
app.use(express.json());

//middleware pour parser les cookies
app.use(cookieParser());

// Récupérer le chemin du répertoire où se trouve le fichier courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serveur du dossier 'images' à la racine du projet
app.use("/images", express.static(path.join(__dirname, "images")));

//middlewares pour les routes users
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

//middlewares pour les routes univers et personnages
app.use("/api/universe", universeRouter);
app.use("/api/character", characterRouter);

//middlewares pour les conversations et messages
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
