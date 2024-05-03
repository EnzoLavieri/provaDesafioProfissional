import * as request from "supertest";
import app from "../src/app";
import CriadorModel from "../src/marvel/schemas/criador.schema";
import criadorService from "../src/marvel/services/criador.service";
//------------------------------------------------------------------------------------------------------------------
//----> TROCAR OS IDS ANTIGOS PELOS IDS DOS NOVOS DOCUMENTOS GERANDOS PELO MONGO, CASO CONTRARIO, VAI DAR ERRO <----
//------------------------------------------------------------------------------------------------------------------
describe("Testando endpoints de criador", () => {
  it("Deve inserir um criador no banco de dados", async () => {
    const CriadorMock = {
      nome: "testeCriador",
      funcao: "desenhista",
      contriComic: [
        {
          nome: "Annihilation: Conquest (2007) #4",
          resourceURI: "http://gateway.marvel.com/v1/public/comics/20686",
        },
        {
          nome: "Annihilation (Hardcover)",
          resourceURI: "http://gateway.marvel.com/v1/public/comics/48278",
        },
      ],
    };

    const response = await request
      .default(app)
      .post("/criarCriador")
      .send(CriadorMock);
    const findedCriador = await CriadorModel.findById(response.body._id);

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(CriadorMock.nome).toBe(findedCriador?.nome);
    expect(CriadorMock.funcao).toBe(findedCriador?.funcao);
    expect(CriadorMock.contriComic).toStrictEqual(findedCriador?.contriComic);
  });

  it("Deve recuperar todos os criadores do banco de dados", async () => {
    const response = await request.default(app).get("/findCriador");
    const qtdeTotalCriadoresDB = await CriadorModel.countDocuments();

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(qtdeTotalCriadoresDB);
  });

  it("Deve retornar os detalhes do criador pelo ID", async () => {
    const criadorId = "663140450cddb954ad9b7dd2"; // ID de exemplo para teste
    const response = await request.default(app).get(`/criador/${criadorId}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      __v: 0,
      _id: "663140450cddb954ad9b7dd2",
      nome: "testeCriador",
      funcao: "desenhista",
      contriComic: [
        {
          nome: "Annihilation: Conquest (2007) #4",
          resourceURI: "http://gateway.marvel.com/v1/public/comics/20686",
        },
        {
          nome: "Annihilation (Hardcover)",
          resourceURI: "http://gateway.marvel.com/v1/public/comics/48278",
        },
      ],
    });
  });

  it("Deve retornar atualizar o criador", async () => {
    const criadorId = "663140450cddb954ad9b7dd2";
    const updatedCriadorData = {
      nome: "testeCriador",
      funcao: "desenhista",
      contriComic: [
        {
          nome: "Annihilation: Conquest (2007) #4",
          resourceURI: "http://gateway.marvel.com/v1/public/comics/20686",
        },
        {
          nome: "Annihilation (Hardcover)",
          resourceURI: "http://gateway.marvel.com/v1/public/comics/48278",
        },
      ],
    };

    const response = await request
      .default(app)
      .put(`/updateCriador/${criadorId}`)
      .send(updatedCriadorData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.nome).toBe(updatedCriadorData.nome);
    expect(response.body.funcao).toBe(updatedCriadorData.funcao);
  });

  it("Deve excluir ciador existente por ID", async () => {
    const comic = await CriadorModel.create({
      nome: "testeCriador",
      funcao: "delDesenhista",
      contriComic: [
        {
          nome: "Annihilation: Conquest (2007) #4",
          resourceURI: "http://gateway.marvel.com/v1/public/comics/20686",
        },
        {
          nome: "Annihilation (Hardcover)",
          resourceURI: "http://gatway.marvel.com/v1/public/comics/48278",
        },
      ],
    });

    const response = await request
      .default(app)
      .delete(`/deleteCriador/${comic._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual("Criador removido com exito.");

    const deleteCriador = await CriadorModel.findById(comic._id);
    expect(deleteCriador).toBeNull();
  });

  it("Deve importar criadores com sucesso", async () => {
    const mockFetchAndStoreCriadores = jest.spyOn(
      criadorService,
      "integrateCreators"
    );
    mockFetchAndStoreCriadores.mockResolvedValueOnce();

    const response = await request.default(app).get("/importar-criadores");

    expect(response.status).toBe(200);

    expect(response.body.message).toBe(
      "Criadores buscados e guardados com sucesso."
    );

    expect(mockFetchAndStoreCriadores).toHaveBeenCalledTimes(1);
  });
});
