
# Verzel

## Descrição do projeto

Projeto CRUD de módulos e aulas construído em Node e React.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [PostgreSQL](https://www.postgresql.org/)
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Primeiro passo

```bash
# Clone este repositório
$ git clone https://github.com/Arnxld/verzel.git
```


### 💾 Criando o Banco de Dados (PostgreSQL)
```bash
# Acesse a pasta do projeto
$ cd verzel

# Vá para a pasta api
$ cd api

# Copie o conteúdo do arquivo src/database/schema.sql
$ cd api

# Agora no terminal/cmd, acesse o terminal interativo do PostgreSQL
$ psql

# Execute o primeiro bloco do arquivo schema.sql para criar o banco de dados verzel

# Conecte-se ao banco de dados verzel criado
$ \c verzel

# Execute os blocos restantes, preferencialmente um após o outro para evitar erros
```


### 🎲 Rodando o Back-end (servidor)

```bash
# Ainda na pasta api, abra o projeto no Visual Studio Code
$ code .

# Crie um arquivo .env, insira as variáveis ambiente com as informações de usuário do PostgreSQL e o segredo para tokens JWT, conforme exemplo no arquivo .env.example

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento no terminal
$ yarn dev

# O servidor iniciará no endereço http://localhost:3001;
```

### 🌐Rodando o Front-end

```bash
# Abra a pasta ../fe no Visual Studio Code

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento no terminal
$ yarn start

# A aplicação iniciará no endereço http://localhost:3000
```
