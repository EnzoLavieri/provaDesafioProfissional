import { Router } from "express";
import personagemController from "./marvel/controllers/personagem.controller";
import criadorController from "./marvel/controllers/criador.controller";
import comicController from "./marvel/controllers/comic.controller";

const routes = Router();

routes.get("/numeroDeComics", comicController.getTotalComics); //9
routes.get("/importar-comics", comicController.fetchComics);

routes.post("/criarComic", comicController.create);
routes.get("/findComics", comicController.findAll); //1
routes.get("/comic/:id", comicController.findById); //6
routes.put("/updateComic/:id", comicController.update);
routes.delete("/deleteComic/:id", comicController.delete);
//

routes.get("/importar-criadores", criadorController.createIntegratedCreators);

routes.post("/criarCriador", criadorController.create);
routes.get("/findCriador", criadorController.findAll); //2
routes.get("/criador/:id", criadorController.findById); //5
routes.put("/updateCriador/:id", criadorController.update);
routes.delete("/deleteCriador/:id", criadorController.delete);
//

routes.get(
  "/personagemOrdemDescLonga",
  personagemController.getPersonagemComDescricaoMaisLonga
); //8
routes.get("/personagemOrdemAfabetica", personagemController.listarPersonagens); //7
routes.get("/importar-personagens", personagemController.fetchCharacters);

routes.post("/criarPersoagem", personagemController.create);
routes.get("/findPersoagens", personagemController.findAll); //3
routes.get("/personagem/:id", personagemController.findById); //4
routes.put("/updatePersonagem/:id", personagemController.update);
routes.delete("/deletePersonagem/:id", personagemController.delete);

export { routes };
