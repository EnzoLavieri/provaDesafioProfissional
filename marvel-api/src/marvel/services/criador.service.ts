import axios from "axios";
import tipocriador from "../schemas/criador.schema";
import { criadorType } from "../types/criador.types";

class CriadorService {
  async create(criador: criadorType) {
    const createCriador = await tipocriador.create(criador);
    return createCriador;
  }

  async findAll() {
    const findedCriadores = await tipocriador.find();
    return findedCriadores;
  }

  async findById(id: string) {
    const findedCriador = await tipocriador.findById(id);
    return findedCriador;
  }

  async update(id: string, criador: criadorType) {
    const updateCriador = await tipocriador.findByIdAndUpdate(
      id,
      {
        nome: criador.nome,
        funcao: criador.funcao,
        contriComic: criador.contriComic,
      },
      { new: true }
    );
    return updateCriador;
  }

  async delete(id: string) {
    try {
      await tipocriador.findByIdAndDelete(id);
      return "Criador removido com exito.";
    } catch (error) {
      throw new Error(`Erro ao remover o criador, erro: ${error}`);
    }
  }
}

export default new CriadorService();
