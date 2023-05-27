# What Do I Do
### Uma lista de tarefas simples utilizando Typescript, Node + Express, Vite + React e Material Ui.

  <img src="https://user-images.githubusercontent.com/85768828/241394401-0d45fc20-9c8c-48ee-a4c8-0156752fcbc7.png" width="480px" />

> Projeto realizado com a finalidade de cumprir um desafio técnico no qual foi solicitado a criação de uma API simples com 4 endpoints (CRUD) e um app de lista de tarefas capaz de consumi-la.

#
## Principais Techs envolvidas:
|Backend                                        | - |Frontend    |
|-----------------------------------------------|---|-----------|
|[Typescript](https://www.typescriptlang.org/)  | - |[Typescript](https://www.typescriptlang.org/) |
|[Node](https://nodejs.org/pt-br)               | - |[Vite](https://vitejs.dev/)       |
|[Express](https://expressjs.com/pt-br/)        | - |[React](https://react.dev/)      |
|[@decorators/express](https://www.npmjs.com/package/@decorators/express)| - |[Material Ui](https://mui.com/)|
|[uuid](https://www.npmjs.com/package/uuid)     | - |[Sass](https://sass-lang.com/)       |

#
## Como inicializar o projeto?

> Necessário o uso de Node, no mínimo, em sua versão 16.

O projeto possui scripts em seu diretório principal para facilitar sua inicialização, bem como seus scripts individuais nos diretórios "**_server_**", onde está presente o backend, e "**_client_**", onde está o frontend.

### Utilizando scripts do diretório principal:
> Nesta opção pode ser necessário adicionar o [pacote npm concurrently](https://www.npmjs.com/package/concurrently) no momento da inicialização do script.

1. No diretório principal, utilize o comando `npm run dev-install` (ou `yarn run dev-install`) para instalar as dependências em ambas stacks;
2. Após instaladas as dependências, com o comando `npm run dev`, será possível rodar o backend e frontend simultaneamente.
3. Também é possível, com o comando `npm run server-test`, rodar os testes de integração do server (backend).

### Utilizando scripts nos diretórios individuais:

- **Server (backend)**:
  1. Dentro do diretório `server/`, utilize o comando `npm run install` (ou `yarn`), para instalar as dependências;
  2. Utilize o comando `npm run dev` ou `npm start` (ou `yarn dev` / `yarn start`) para inicializar o servidor backend.
  3. Os testes de integração podem ser conferidos através do comando `npm run test` (ou `yarn test`).

- **Client (frontend)**:
  1. Dentro do diretório `client/`, utilize o comando `npm run install` (ou `yarn`), para instalar as dependências;
  2. Utilize o comando `npm run dev` (ou `yarn dev`) para inicializar o react app.
  3. Caso o app não seja aberto automaticamente em seu browser, você poderá conferir no endereço http://localhost:3000/.
  > Em raros casos, podem ocorrer erros ao incializar o **client**, podendo ser útil utilizar a flag `npm run dev --force`

