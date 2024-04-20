import { Request, Response } from "express";
import persoagemService from "../services/personagem.service";

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
}

export default new PersonagemController();
