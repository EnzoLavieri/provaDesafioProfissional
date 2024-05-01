import axios from "axios";
import tipoPersonagem from "../schemas/personagem.schema";
import { personagemType } from "../types/personagem.type";

class PersonagemService {
  async create(personagem: personagemType) {
    const createdPersonagem = await tipoPersonagem.create(personagem);
    return createdPersonagem;
  }

  async findAll() {
    const findedPersonages = await tipoPersonagem.find();
    return findedPersonages;
  }

  async findById(id: string) {
    const findedPersonagem = await tipoPersonagem.findById(id);
    return findedPersonagem;
  }

  async update(id: string, personagem: personagemType) {
    const updatePersoagem = await tipoPersonagem.findByIdAndUpdate(
      id,
      {
        nome: personagem.nome,
        descricao: personagem.descricao,
        urlImg: personagem.urlImg,
      },
      { new: true }
    );
    return updatePersoagem;
  }

  async delete(id: string) {
    try {
      await tipoPersonagem.findByIdAndDelete(id);
      return "Personagem removido com exito.";
    } catch (error) {
      throw new Error(`Erro ao remover o persoagem, erro: ${error}`);
    }
  }

  async fetchAndStoreCharacters() {
    try {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/series/6972/characters?apikey=ed11dfee7e8bb0ecd0712787cbbc1ddf&hash=287493cf5762baa34a0701791215a618&ts=1`
      );

      const characters = response.data.data.results;

      for (const character of characters) {
        const newCharacter: personagemType = {
          nome: character.name,
          descricao: character.description || "",
          urlImg:
            character.thumbnail.path + "." + character.thumbnail.extension,
        };

        await this.create(newCharacter);
      }

      console.log("Personagens achados e guardados com sucesso no MongoDB.");
    } catch (error) {
      console.error(`Erro ao buscar personagens: ${error}`);
    }
  }

  //---------------------------------------------------------------------------

  async listarPersogensAfaberica() {
    const personagensOrdem = await tipoPersonagem.find().sort({ nome: 1 });
    return personagensOrdem;
  }

  async getPersonagemComDescricaoMaisLonga() {
    const personagens = await tipoPersonagem.aggregate([
      {
        $project: {
          nome: 1,
          descricao: 1,
          urlImg: 1,
          tamanhoDescricao: { $strLenCP: "$descricao" },
        },
      },
      {
        $sort: { tamanhoDescricao: -1 },
      },
      {
        $limit: 1,
      },
    ]);
    return personagens;
  }
}

export default new PersonagemService();
