import * as request from "supertest";
import app from "../src/app";
import ComicModel from "../src/marvel/schemas/comic.schema";
import comicService from "../src/marvel/services/comic.service";
//------------------------------------------------------------------------------------------------------------------
//----> TROCAR OS IDS ANTIGOS PELOS IDS DOS NOVOS DOCUMENTOS GERANDOS PELO MONGO, CASO CONTRARIO, VAI DAR ERRO <----
//------------------------------------------------------------------------------------------------------------------
describe("Testando endpoints de comics", () => {
  it("Deve inserir uma comic no banco de dados", async () => {
    const ComicMock = {
      titulo: "testeDosTests",
      descricao: "teste3",
      dataPublicacao: [
        { date: "2009-08-05T00:00:00-0400", type: "d" },
        { date: "2009-07-16T00:00:00-0400", type: "focDaate" },
        { date: "2011-02-10T00:00:00-0500", type: "unlimbitedDate" },
        { date: "2012-06-12T00:00:00-0400", type: "digitablPurchaseDate" },
      ],
      capa: "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/59359ef0c8f10.jpg",
    };

    const response = await request
      .default(app)
      .post("/criarComic")
      .send(ComicMock);
    const findedComic = await ComicModel.findById(response.body._id);

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(ComicMock.titulo).toBe(findedComic?.titulo);
    expect(ComicMock.descricao).toBe(findedComic?.descricao);
    expect(ComicMock.dataPublicacao).toStrictEqual(findedComic?.dataPublicacao);
    expect(ComicMock.capa).toBe(findedComic?.capa);
  });

  it("Deve recuperar todos os livros do banco de dados", async () => {
    const response = await request.default(app).get("/findComics");
    const qtdeTotalComicsDB = await ComicModel.countDocuments();

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(qtdeTotalComicsDB);
  });

  it("Deve retornar os detalhes de uma comic pelo ID", async () => {
    const mockComicId = "66311038b476c9bfb463f103"; // colocar o id da comic aqui após criado, nao sei fazer de outro jeito
    const response = await request.default(app).get(`/comic/${mockComicId}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      __v: 0,
      _id: "66311038b476c9bfb463f103",
      titulo: "War of Kings (2009) #6",
      descricao: "",
      dataPublicacao: [
        { type: "onsaleDate", date: "2009-08-05T00:00:00-0400" },
        { type: "focDate", date: "2009-07-16T00:00:00-0400" },
        { type: "unlimitedDate", date: "2011-02-10T00:00:00-0500" },
        { type: "digitalPurchaseDate", date: "2012-06-12T00:00:00-0400" },
      ],
      capa: "http://i.annihil.us/u/prod/marvel/i/mg/2/03/5935c48412a13.jpg",
    });
  });

  it("Deve atualizar a comic", async () => {
    const comicId = "66311038b476c9bfb463f103";
    const updatedComicData = {
      titulo: "War of Kings (2009) #6",
      descricao: "",
      dataPublicacao: [
        {
          type: "onsaleDate",
          date: "2009-08-05T00:00:00-0400",
        },
        {
          type: "focDate",
          date: "2009-07-16T00:00:00-0400",
        },
        {
          type: "unlimitedDate",
          date: "2011-02-10T00:00:00-0500",
        },
        {
          type: "digitalPurchaseDate",
          date: "2012-06-12T00:00:00-0400",
        },
      ],
      capa: "http://i.annihil.us/u/prod/marvel/i/mg/2/03/5935c48412a13.jpg",
    };

    const response = await request
      .default(app)
      .put(`/updateComic/${comicId}`)
      .send(updatedComicData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.titulo).toBe(updatedComicData.titulo);
    expect(response.body.descricao).toBe(updatedComicData.descricao);
  });

  it("Deve excluir uma comic existente por ID", async () => {
    const comic = await ComicModel.create({
      titulo: "Comic de Teste",
      descricao:
        "Esta é uma comic de teste para fins de teste automatizado do delete.",
      dataPublicacao: [
        { type: "onsaleDate", date: "2009-08-05T00:00:00-0400" },
        { type: "focDate", date: "2009-07-16T00:00:00-0400" },
        { type: "unlimitedDate", date: "2011-02-10T00:00:00-0500" },
        { type: "digitalPurchaseDate", date: "2012-06-12T00:00:00-0400" },
      ],
      capa: "link_da_imagem.jpg",
    });

    const response = await request
      .default(app)
      .delete(`/deleteComic/${comic._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual("comic removido com exito.");

    const deletedComic = await ComicModel.findById(comic._id);
    expect(deletedComic).toBeNull();
  });

  it("Deve importar comics com sucesso", async () => {
    const mockFetchAndStoreComics = jest.spyOn(
      comicService,
      "fetchAndStoreComics"
    );
    mockFetchAndStoreComics.mockResolvedValueOnce();

    const response = await request.default(app).get("/importar-comics");

    expect(response.status).toBe(200);

    expect(response.body.message).toBe(
      "Comics buscadas e guardadas com sucesso."
    );

    expect(mockFetchAndStoreComics).toHaveBeenCalledTimes(1);
  });

  it("Deve retornar o número total de comics corretamente", async () => {
    const response = await request.default(app).get("/numeroDeComics");
    expect(response.status).toBe(200);
    expect(response.body.numeroTotalDeComics).toBeDefined();
    expect(typeof response.body.numeroTotalDeComics).toBe("number");
  });
});
