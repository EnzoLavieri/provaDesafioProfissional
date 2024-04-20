import { Schema, model } from "mongoose";

const personagemSchema = new Schema({
  nome: String,
  descricao: String,
  urlImg: String,
});

export default model("Personagem", personagemSchema);
