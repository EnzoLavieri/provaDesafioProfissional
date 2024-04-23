import app from "../src/app";
import { describe, it, expect } from "@jest/globals";
import ComicModel from "../src/marvel/schemas/comic.schema";
import * as request from "supertest";

describe("Testando endpoints de comics", () => {
  it.skip("Deve inserir uma comic no banco de dados", async () => {
    const ComicMock = {
      titulo: "War of Kings (2009) #1",
      descricao: "",
      //   dataPublicacao: 2 - 2 - 2024,
      capa: "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/59359ef0c8f10.jpg",
    };

    const response = await request.default(app).post("/comics").send(ComicMock);
    const findedComic = await ComicModel.findById(response.body._id);

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(ComicMock.titulo).toBe(findedComic?.titulo);
    expect(ComicMock.descricao).toBe(findedComic?.descricao);
    // expect(ComicMock.dataPublicacao).toBe(findedComic?.dataPublicacao);
    expect(ComicMock.capa).toBe(findedComic?.capa);
  });

  it("Deve recuperar todos os livros do banco de dados", async () => {
    const response = await request.default(app).get("/findComics");
    const qtdeTotalComicsDB = await ComicModel.countDocuments();

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(qtdeTotalComicsDB);
  });
});
