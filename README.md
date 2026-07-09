# JobsPost - Frontend

Uma aplicação web desenvolvida para listar, visualizar e gerenciar vagas de emprego. Este repositório contém o frontend da aplicação, construído para se comunicar com uma API RESTful.

## 🔗 Repositório da API (Backend)

Este frontend consome uma API RESTful dedicada, desenvolvida em Spring Boot. Para que a aplicação funcione completamente no seu ambiente local, é necessário rodar a API em conjunto.

Você pode encontrar o código-fonte, a arquitetura e as instruções de inicialização do backend no link abaixo:

* [**Acessar repositório do Backend (Spring Boot)**](https://github.com/LeirbagAC/spring-boot-rest)

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes ferramentas:

* **Next.js** e **React**
* **TypeScript** para tipagem estática e maior segurança no desenvolvimento
* **TanStack Query (React Query)** para gerenciamento avançado de estados assíncronos, cache de dados e otimização de requisições
* **Ant Design (antd)** para componentes de interface e design system
* **Axios** para consumo da API

## ⚙️ Funcionalidades

* **Listagem e Gestão de Vagas:** Exibição de postagens detalhando o perfil da vaga, tempo de experiência requerido, descrição e tecnologias utilizadas (tech stack).
* **Gerenciamento de Estado Otimizado:** Chamadas à API gerenciadas pelo TanStack Query, garantindo cache eficiente, revalidação de dados em segundo plano e uma experiência de usuário (UX) mais fluida.
* **Autenticação Integrada:** Interceptação de requisições configurada via Axios para adicionar automaticamente o token de autenticação (Basic Auth) armazenado no `localStorage`.

## 🛠️ Próximos Passos (Roadmap)

A aplicação está em constante evolução. Algumas das melhorias mapeadas para o futuro incluem:

* Adicionar testes unitários e de integração (Jest / React Testing Library).
* Aprimorar o design responsivo para dispositivos móveis.

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
    NEXT_PUBLIC_API_URL=http://localhost:8080 # Substitua pela rota correta da API
    ```
    *(Nota: A configuração do Axios depende dessa variável para definir a `baseURL` de todas as chamadas HTTP)*.
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    # ou
    yarn run dev
    ```
5.  Acesse `http://localhost:3000` no seu navegador para ver o resultado.
