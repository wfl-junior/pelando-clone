# Pelando Clone

## Requisitos

1. [Node.js](https://nodejs.org)
1. [yarn](https://yarnpkg.com)

## Instruções

1. Abrir pasta raiz do projeto em um terminal.
1. Rodar comando `yarn install` para instalar todos os pacotes.
1. Rodar comando `cd packages/server`.
1. Rodar comando `mv .env.example .env` para renomear arquivo de variáveis de ambiente, ou renomeie manualmente.
1. Preencha suas variáveis de ambiente.
1. Rodar comando `mv database.example.sqlite database.sqlite` para renomear arquivo de exemplo do banco de dados SQLite, ou renomeie manualmente.
1. Rodar comando `mv ormconfig.example.ts ormconfig.ts` para renomear o arquivo de exemplo de configuração do TypeORM, ou renomeie manualmente.
1. Rodar comando `yarn seed` para semear o banco de dados.
1. Rodar comando `cd ../..`
1. Rodar `yarn both` para iniciar os servidores da api e web. Opcionalmente pode rodar cada servidor em uma aba diferente, basta rodar `yarn web` em um terminal e `yarn server` em outro.
1. Abrir [http://localhost:3000](http://localhost:3000) e curtir a aplicação :D

## Tech Stack

1. [Node.js](https://nodejs.org)
1. [yarn](https://yarnpkg.com)
1. [TypeScript](https://www.typescriptlang.org)
1. [GraphQL](https://graphql.org)

### API

1. [NestJS](https://nestjs.com)
1. [Express.js](https://expressjs.com)
1. [TypeORM](https://typeorm.io)
1. [Apollo Server](https://www.apollographql.com/docs/apollo-server)
1. [JSON Web Token (JWT)](https://jwt.io)

### Web

1. [React](https://reactjs.org)
1. [Next.js](https://nextjs.org)
1. [Apollo Client](https://www.apollographql.com/docs/react)
1. [Tailwind CSS](https://tailwindcss.com)
