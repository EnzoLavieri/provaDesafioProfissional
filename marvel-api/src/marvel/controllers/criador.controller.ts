import { Request, Response } from "express";
import criadorService from "../services/criador.service";

class CriadorController {
  async create(req: Request, res: Response) {
    const createCriador = await criadorService.create(req.body);
    res.status(201);
    return res.json(createCriador);
  }

  async findAll(req: Request, res: Response) {
    const findedCriadores = await criadorService.findAll();
    return res.json(findedCriadores);
  }

  async findById(req: Request, res: Response) {
    const findCriador = await criadorService.findById(req.params.id);
    return res.json(findCriador);
  }

  async update(req: Request, res: Response) {
    const updateCriador = await criadorService.update(req.params.id, req.body);
    return res.json(updateCriador);
  }

  async delete(req: Request, res: Response) {
    const deleteMessage = await criadorService.delete(req.params.id);
    return res.json(deleteMessage);
  }

  async createIntegratedCreators(req: Request, res: Response): Promise<void> {
    await criadorService.integrateCreators();
    res.json({ message: "Criadores buscados e guardados com sucesso." });
  }
}

export default new CriadorController();
