import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import RecipeController from "./app/controllers/RecipeController";
import FileController from "./app/controllers/FileController";
import TypeController from "./app/controllers/TypeController";
import RoleController from "./app/controllers/RoleController";
import SessionController from "./app/controllers/SessionController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.indexJustOne);
routes.get("/types", TypeController.index);

routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.put("/users/", UserController.update);
routes.delete("/users/:id", UserController.delete);

routes.post("/roles", RoleController.store);
routes.get("/roles", RoleController.index);
routes.put("/roles/:id", RoleController.update);
routes.delete("/roles/:id", RoleController.delete);

routes.post("/recipes", RecipeController.store);

routes.put("/recipes/:id", RecipeController.update);
routes.delete("/recipes/:id", RecipeController.delete);

routes.post("/types", TypeController.store);
routes.put("/types/:id", TypeController.update);
routes.delete("/types/:id", TypeController.delete);

routes.post("/files", upload.single("file"), FileController.store);
routes.get("/files", FileController.index);
routes.put("/files/:id", upload.single("file"), FileController.update);
routes.delete("/files/:id", FileController.delete);

export default routes;
