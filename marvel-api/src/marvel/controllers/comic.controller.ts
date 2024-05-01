import { Request, Response } from "express";
import comicService from "../services/comic.service";

class ComicController {
  async create(req: Request, res: Response) {
    const createComic = await comicService.create(req.body);
    res.status(201);
    return res.json(createComic);
  }

  async findAll(req: Request, res: Response) {
    const findedComics = await comicService.findAll();
    return res.json(findedComics);
  }

  async findById(req: Request, res: Response) {
    const findedComics = await comicService.findById(req.params.id);
    return res.json(findedComics);
  }

  async update(req: Request, res: Response) {
    const updateComic = await comicService.update(req.params.id, req.body);
    return res.json(updateComic);
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

export default new ComicController();
