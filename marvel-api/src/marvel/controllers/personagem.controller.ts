import { Request, Response } from "express";
import persoagemService from "../services/personagem.service";

const API_URL =
  "https://gateway.marvel.com/v1/public/events/227/characters?apikey=ed11dfee7e8bb0ecd0712787cbbc1ddf&hash=287493cf5762baa34a0701791215a618&ts=1";

class PersonagemController {
  async create(req: Request, res: Response) {
    const createPersonagem = await persoagemService.create(req.body);
    res.status(201);
    return res.json(createPersonagem);
  }

  async findAll(req: Request, res: Response) {
    const findedPersonagem = await persoagemService.findAll();
    return res.json(findedPersonagem);
  }

  async findById(req: Request, res: Response) {
    const findedPersonagem = await persoagemService.findById(req.params.id);
    return res.json(findedPersonagem);
  }

  async update(req: Request, res: Response) {
    const updatePersoagem = await persoagemService.update(
      req.params.id,
      req.body
    );
    return res.json(updatePersoagem);
  }

  async delete(req: Request, res: Response) {
    const deleteMessage = await persoagemService.delete(req.params.id);
    return res.json(deleteMessage);
  }

  async fetchCharacters(req: Request, res: Response) {
    try {
      await persoagemService.fetchAndStoreCharacters();
      res.json({ message: "Characters fetched and stored successfully." });
    } catch (error) {
      console.error(error);
    }
  }

  //---------------------------------------------------------------------------

  async listarPersonagens(req: Request, res: Response) {
    const ordemPersonagens = await persoagemService.listarPersogensAfaberica();
    return res.json(ordemPersonagens);
  }

  async getPersonagemComDescricaoMaisLonga(req: Request, res: Response) {
    const personagem =
      await persoagemService.getPersonagemComDescricaoMaisLonga();
    return res.json(personagem);
  }
}

export default new PersonagemController();
