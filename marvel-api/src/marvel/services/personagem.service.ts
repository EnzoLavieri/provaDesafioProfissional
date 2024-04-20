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
}

export default new PersonagemService();
