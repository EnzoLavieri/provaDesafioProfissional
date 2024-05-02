# Documentação 
**Introdução**: Esta é uma API totalmente customizada com base nas exigências e critérios de avaliação dados pelo professor da matéria.  
**Principal linguagem usada**: TypeScript.  
**Banco de dados**: MongoDB.  
**Frameworks**: Express, Mongoose, Axios, Supertest, Jest, Node e Nodemon.  
**Frameworks de teste**: Supertest, Jest e Autocannon.  

**URLs base**
1. http://localhost:3000/findCriador: Busca todos os criadores.
2. http://localhost:3000/findPersonagens: Busca todos os personagens.
3. http://localhost:3000/findComics: Busca todas as comics.

**Entidades**  
Comic, atributos: título, descrição, data de publicação, capa.  
Criador, atributos: nome, função, contriComic.  
Personagem, atributos: nome, descrição, URL da imagem.  

**Inicialização**
1. Instale o MongoDB e o Node.js.
2. Instale as dependências através do `npm install` no terminal.
3. Certifique-se de que todas as dependências e frameworks necessários estão instalados e funcionando corretamente.
4. Para iniciar a aplicação, execute `npm run start:dev`.<br><br><br>

# Documentação das rotas

## Comics
- **GET /numeroDeComics**
  - Retorna o número total de quadrinhos disponíveis.
- **GET /importar-comics**
  - Importa os quadrinhos da série.
- **POST /criarComic**
  - Cria um novo quadrinho.
- **GET /findComics**
  - Retorna todos os quadrinhos.
- **GET /comic/:id**
  - Retorna um quadrinho específico pelo ID gerado pelo Mongo.
- **PUT /updateComic/:id**
  - Atualiza um quadrinho pelo ID gerado pelo Mongo.
- **DELETE /deleteComic/:id**
  - Deleta um quadrinho pelo ID gerado pelo Mongo.

## Criadores 
- **POST /criarCriador**
  - Cria um novo criador.
- **GET /importar-criadores**
  - Importa todos os criadores da série.
- **GET /findCriador**
  - Retorna todos os criadores.
- **GET /criador/:id**
  - Retorna um criador pelo ID gerado pelo Mongo.
- **PUT /updateCriador/:id**
  - Atualiza um criador pelo ID gerado pelo Mongo.
- **DELETE /deleteCriador/:id**
  - Deleta um criador pelo ID gerado pelo Mongo.

## Personagens 
- **GET /personagemOrdemDescLonga**
  - Retorna o personagem com a descrição mais longa.
- **GET /personagemOrdemAlfabetica**
  - Retorna todos os personagens em ordem alfabética.
- **GET /importar-personagens**
  - Importa os personagens para a base de dados.
- **POST /criarPersonagem**
  - Cria um novo personagem.
- **GET /findPersonagens**
  - Retorna todos os personagens.
- **GET /personagem/:id**
  - Retorna um personagem pelo ID gerado pelo Mongo.
- **PUT /updatePersonagem/:id**
  - Atualiza um personagem pelo ID gerado pelo Mongo.
- **DELETE /deletePersonagem/:id**
  - Deleta um personagem pelo ID gerado pelo Mongo.
