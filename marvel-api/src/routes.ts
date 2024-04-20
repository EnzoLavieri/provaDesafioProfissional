import { Router } from "express";
import personagemController from "./marvel/controllers/personagem.controller";

const routes = Router();

routes.post("/criarPersoagem", personagemController.create);
routes.get("/findPersoagens", personagemController.findAll);
routes.get("/personagem/:id", personagemController.findById);
routes.put("/updatePersonagem/:id", personagemController.update);
routes.delete("/deletePersonagem/:id", personagemController.delete);

export { routes };
