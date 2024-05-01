import { Schema, model } from "mongoose";

const criadorSchema = new Schema({
  nome: String,
  funcao: String,
  contriComic: Array,
});

export default model("Criadores", criadorSchema);
