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

  async integrateCreators(): Promise<void> {
    try {
      const response1 = await axios.get(
        `https://gateway.marvel.com/v1/public/series/6972/creators?apikey=ed11dfee7e8bb0ecd0712787cbbc1ddf&hash=287493cf5762baa34a0701791215a618&ts=1`
      );
      // const response2 = await axios.get(
      //   `https://gateway.marvel.com:443/v1/public/series/6972?apikey=ed11dfee7e8bb0ecd0712787cbbc1ddf&hash=287493cf5762baa34a0701791215a618&ts=1`
      // );
      // nao consegui implementar a contribuicao nas comics
      const creators = response1.data.data.results;
      // const functions = response2.data.data.results;

      for (const creator of creators) {
        const newCreator: criadorType = {
          nome: creator.fullName,
          funcao: creator.funcao,
          contriComic: creator.comics,
        };

        await this.create(newCreator);
      }
      console.log("Criadores buscados e guardados com sucesso.");
    } catch (error) {
      console.error(`Erro ao buscar criadores: ${error}`);
    }
  }
}

export default new CriadorService();
