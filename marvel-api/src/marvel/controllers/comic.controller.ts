import { Request, Response } from "express";
import comicService from "../services/comic.service";

class PersonagemController {
  async create(req: Request, res: Response) {
    const createPersonagem = await comicService.create(req.body);
    res.status(201);
    return res.json(createPersonagem);
  }

  async findAll(req: Request, res: Response) {
    const findedPersonagem = await comicService.findAll();
    return res.json(findedPersonagem);
  }

  async findById(req: Request, res: Response) {
    const findedPersonagem = await comicService.findById(req.params.id);
    return res.json(findedPersonagem);
  }

  async update(req: Request, res: Response) {
    const updatePersoagem = await comicService.update(req.params.id, req.body);
    return res.json(updatePersoagem);
  }

  async delete(req: Request, res: Response) {
    const deleteMessage = await comicService.delete(req.params.id);
    return res.json(deleteMessage);
  }

  async fetchComics(req: Request, res: Response) {
    try {
      await comicService.fetchAndStoreComics();
      res.json({ message: "Comics buscadas e guardadas com sucesso." });
    } catch (error) {
      console.error(error);
    }
  }

  //------------------------------------------------------------------------

  async getTotalComics(req: Request, res: Response) {
    const numeroTotalDeComics = await comicService.getTotalComics();
    res.status(200).json({ numeroTotalDeComics });
  }
}

export default new PersonagemController();
