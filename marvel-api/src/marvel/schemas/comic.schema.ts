import { Schema, model } from "mongoose";

const comicSchema = new Schema({
  titulo: String,
  descricao: String,
  dataPublicacao: Array,
  capa: String,
});

export default model("Comic", comicSchema);
