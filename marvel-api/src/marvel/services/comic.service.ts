import axios from "axios";
import tipoComic from "../schemas/comic.schema";
import { comicType } from "../types/comic.types";

// const API_URL = "https://gateway.marvel.com/v1/public/events/227/comics?apikey=ed11dfee7e8bb0ecd0712787cbbc1ddf&hash=287493cf5762baa34a0701791215a618&ts=1";

class ComicService {
  async create(comic: comicType) {
    const createdComic = await tipoComic.create(comic);
    return createdComic;
  }

  async findAll() {
    const findedComics = await tipoComic.find();
    return findedComics;
  }

  async findById(id: string) {
    const findComic = await tipoComic.findById(id);
    return findComic;
  }

  async update(id: string, comic: comicType) {
    const updateComic = await tipoComic.findByIdAndUpdate(
      id,
      {
        titulo: comic.titulo,
        descricao: comic.descricao,
        dataPublicacao: comic.dataPublicacao,
        capa: comic.capa,
      },
      { new: true }
    );
    return updateComic;
  }

  async delete(id: string) {
    try {
      await tipoComic.findByIdAndDelete(id);
      return "comic removido com exito.";
    } catch (error) {
      throw new Error(`Erro ao remover o comic, erro: ${error}`);
    }
  }

  async fetchAndStoreComics() {
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/series/6972/comics?apikey=ed11dfee7e8bb0ecd0712787cbbc1ddf&hash=287493cf5762baa34a0701791215a618&ts=1`
      );

      const comics = response.data.data.results;

      for (const comic of comics) {
        const newComic: comicType = {
          titulo: comic.title,
          descricao: comic.description || "",
          dataPublicacao: comic.onsaleDate,
          capa: comic.thumbnail.path + "." + comic.thumbnail.extension,
        };

        await this.create(newComic);
      }

      console.log("Comics guardadas com sucesso no MongoDB.");
    } catch (error) {
      console.error(`Erro ao buscar comics: ${error}`);
    }
  }

  // ------------------------------------------------------------------------

  async getTotalComics() {
    try {
      const numeroTotalDeComics = await tipoComic.countDocuments();
      return numeroTotalDeComics;
    } catch (error) {
      throw new Error("Erro ao obter a quantidade total de comics.");
    }
  }
}

export default new ComicService();
