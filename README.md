# JobsPost - Frontend

[![Backend: Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=Spring)](https://github.com/LeirbagAC/spring-boot-rest)

Uma aplicação web desenvolvida para listar, visualizar e gerenciar vagas de emprego. Este repositório contém o frontend da aplicação, construído para se comunicar com uma API RESTful.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes ferramentas:

* **Next.js (16.2.9)** e **React (19.2.4)**
* **TypeScript** para tipagem estática e maior segurança no desenvolvimento
* **Ant Design (antd 6.4.4)** para componentes de interface e design system
* **Axios** para consumo da API

## ⚙️ Funcionalidades

* **Listagem de Vagas:** Exibição de postagens detalhando o perfil da vaga, tempo de experiência requerido, descrição e tecnologias utilizadas (tech stack).
* **Gerenciamento:** Opções diretas na interface para edição e exclusão de vagas específicas.
* **Autenticação Integrada:** Interceptação de requisições configurada para adicionar automaticamente o token de autenticação (Basic Auth) armazenado no `localStorage`.

## 🛠️ Próximos Passos (Roadmap)

* **Implementação do React Query (TanStack Query):** Refatorar o gerenciamento de estados assíncronos e requisições à API para melhorar o cache, o controle de loading e a performance geral da aplicação.

## 🏃‍♂️ Como executar o projeto localmente

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  Crie um arquivo `.env.local` na raiz do projeto contendo a URL da sua API backend em execução:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080 # Substitua pela rota correta
    ```
    *(Nota: A configuração do Axios depende dessa variável para definir a `baseURL` de todas as chamadas HTTP)*.
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
5.  Acesse `http://localhost:3000` no seu navegador para ver o resultado.
