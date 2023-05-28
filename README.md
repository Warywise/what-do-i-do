# What Do I Do
### Uma lista de tarefas simples utilizando Typescript, Node + Express, Vite + React e Material Ui.

  <img src="https://user-images.githubusercontent.com/85768828/241394401-0d45fc20-9c8c-48ee-a4c8-0156752fcbc7.png" width="480px" />

> Projeto realizado com a finalidade de cumprir um desafio técnico no qual foi solicitado a criação de uma API simples com 4 endpoints (CRUD) e um app de lista de tarefas capaz de consumi-la.

#
## 👨🏽‍💻 Principais Techs envolvidas:
|Backend                                        | - |Frontend    |
|-----------------------------------------------|---|-----------|
|[Typescript](https://www.typescriptlang.org/)  | - |[Typescript](https://www.typescriptlang.org/) |
|[Node](https://nodejs.org/pt-br)               | - |[Vite](https://vitejs.dev/)       |
|[Express](https://expressjs.com/pt-br/)        | - |[React](https://react.dev/)      |
|[@decorators/express](https://www.npmjs.com/package/@decorators/express)| - |[Material Ui](https://mui.com/)|
|[Joi](https://joi.dev/)                        | - |[Material Icons](https://mui.com/material-ui/material-icons/)|
|[uuid](https://www.npmjs.com/package/uuid)     | - |[Sass](https://sass-lang.com/)        |

#
## 🚀 Como inicializar o projeto?

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

#
## 📝 Utilizando a lista de tarefas '_What Do I Do_':

No backend (server) é possível utilizar um CRUD de tarefas, que são separadas por "categorias", as quais também é possível criar e deleta-las.
Os dados são salvos em memória através do módulo **file system** do Node e podem ser conferidos na íntegra no arquivo localizado em `server/src/tasks_storage.json`, que inicialmente estará vazio, mas quando com tarefas criadas tem o seguinte formato:
```json
{
  "general": [
    {
      "id": "b113ad3a-6d9b-41a6-960c-1c430dac37c7",
      "title": "My task",
      "description": "This is the description of my awesome task! =D",
      "createdAt": "Sun Feb 30 2023 09:17:08 GMT-0300 (Brasilia Standard Time)",
      "concludedAt": null
    }
  ]
}
```
### 🌐 Rotas disponíveis do server e exemplos de requisição:
  - `/category`
    - `POST`
    - `DELETE`
    ```js
    Body da requisição para POST e DELETE
    {
      name: "general",  // Máximo de 30 caracteres
    }
    ```
    
  - `/tasks`
    - `POST`
    ```js
    Body da requisição para POST
    {
      title: "My task",  // máximo de 50 caracteres
      description: "This is the description of...", // máximo de 300 caracteres
      category: "general",
    }
    ```
    - `GET`
    - `PATCH`
    ```js
    Body da requisição para PATCH
    {
      id: "b113ad3a-6d9b-41a6-960c-1c430dac37c7", // uuid válido
      title: "My task", // apenas para quando for atualiza-lo
      description: "This is my other description...",  // apenas para quando for atualiza-la
      category: "general",
      concluded: true, // utilizado para marcar tarefas como 'concluída'
    }
    ```
    - `DELETE`
    ```js
    Body da requisição para DELETE
    {
      id: "b113ad3a-6d9b-41a6-960c-1c430dac37c7",
      category: "general",
    }
    ```
### 🗂️ Interface do client:
No frontend é possível consumir tudo o que a API do backend oferece. Ao acessar a página haverá um **board**(categoria) vazio, crie diferentes boards de tarefas, defina uma cor para cada um e separe tarefas de acordo com a finalidade de cada board como quiser.
Um board de tarefas ou tarefa específica podem ser deletados a qualquer instante (se ainda não concluído, é necessário fazer uma confirmção da ação 😉). 
Tarefas podem ser marcadas como concluída e podem se editadas sempre, e é possível verificar detalhes como descrição, data de criação e data de conclusão.
A seguir, um GIF simples exemplificando o uso do app:

<img src="https://user-images.githubusercontent.com/85768828/241420152-c1a5c7f9-9d0f-4489-9e71-8afa2b0c381e.gif" width="560px" />

#
Obrigado por ler até aqui! _Enjoy!_ ✅
#
