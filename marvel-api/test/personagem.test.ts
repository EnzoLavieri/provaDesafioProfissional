import * as request from "supertest";
import app from "../src/app";
import PersonagemModel from "../src/marvel/schemas/personagem.schema";
import personagemService from "../src/marvel/services/personagem.service";
//------------------------------------------------------------------------------------------------------------------
//----> TROCAR OS IDS ANTIGOS PELOS IDS DOS NOVOS DOCUMENTOS GERANDOS PELO MONGO, CASO CONTRARIO, VAI DAR ERRO <----
//------------------------------------------------------------------------------------------------------------------
describe("Testando endpoints de personagem", () => {
  it("Deve inserir um personagem no banco de dados", async () => {
    const PersonagemMock = {
      nome: "testePersogaem",
      descricao: "teste do teste criacao de personagme",
      urlImg: "http://i.annihil.us/u/prod/marvel/i/mg/1/20/52696929dc721.jpg",
    };

    const response = await request
      .default(app)
      .post("/criarPersoagem")
      .send(PersonagemMock);
    const findedCriador = await PersonagemModel.findById(response.body._id);

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(PersonagemMock.nome).toBe(findedCriador?.nome);
    expect(PersonagemMock.descricao).toBe(findedCriador?.descricao);
    expect(PersonagemMock.urlImg).toStrictEqual(findedCriador?.urlImg);
  });

  it("Deve recuperar todos os personagens do banco de dados", async () => {
    const response = await request.default(app).get("/findPersoagens");
    const qtdeTotalPersonagensDB = await PersonagemModel.countDocuments();

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(qtdeTotalPersonagensDB);
  });

  it("Deve retornar os detalhes do personagem pelo ID", async () => {
    const personagemId = "6631412fd8c3dc4835ff5b00"; // Trocar ids sempre que quiser atualizar os teste, nao sei outra maneira
    const response = await request
      .default(app)
      .get(`/personagem/${personagemId}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      __v: 0,
      _id: "6631412fd8c3dc4835ff5b00",
      nome: "testePersogaem",
      descricao: "teste do teste de personagme",
      urlImg:
        "http://i.aaaaannihil.us/u/prod/marvel/i/mg/1/20/52696929dc721.jpg",
    });
  });

  it("Deve atualizar o personagem", async () => {
    const personagemId = "6631412fd8c3dc4835ff5b00";
    const updatedPersonagemData = {
      nome: "testePersogaem",
      descricao: "teste do teste de personagme",
      urlImg:
        "http://i.aaaaannihil.us/u/prod/marvel/i/mg/1/20/52696929dc721.jpg",
    };

    const response = await request
      .default(app)
      .put(`/updatePersonagem/${personagemId}`)
      .send(updatedPersonagemData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.nome).toBe(updatedPersonagemData.nome);
    expect(response.body.descricao).toBe(updatedPersonagemData.descricao);
    expect(response.body.urlImg).toBe(updatedPersonagemData.urlImg);
  });

  it("Deve excluir personagem existente por ID", async () => {
    const comic = await PersonagemModel.create({
      nome: "testePersogaem",
      descricao: "delPersonagme",
      urlImg:
        "http://i.aaaannihil.us/u/prod/marvel/i/mg/1/20/52696929dc721.jpg",
    });

    const response = await request
      .default(app)
      .delete(`/deletePersonagem/${comic._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual("Personagem removido com exito.");

    const deletePersonagem = await PersonagemModel.findById(comic._id);
    expect(deletePersonagem).toBeNull();
  });

  it("Deve importar personagens com sucesso", async () => {
    const mockFetchAndStorePersonagens = jest.spyOn(
      personagemService,
      "fetchAndStoreCharacters"
    );
    mockFetchAndStorePersonagens.mockResolvedValueOnce();

    const response = await request.default(app).get("/importar-personagens");

    expect(response.status).toBe(200);

    expect(response.body.message).toBe(
      "Personagens buscados e guardados com sucesso."
    );

    expect(mockFetchAndStorePersonagens).toHaveBeenCalledTimes(1);
  });

  it("Deve retornar uma lista de personagens ordenados por nome", async () => {
    const response = await request
      .default(app)
      .get("/personagemOrdemAfabetica");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve retornar o personagem com a descrição mais longa", async () => {
    const response = await request
      .default(app)
      .get("/personagemOrdemDescLonga");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].nome).toBe("Smasher (Vril Rokk)");
  });
});
