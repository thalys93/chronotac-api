# ChronoTac API

API backend para o jogo da velha ChronoTac.

## Pré-requisitos

- Node.js 16+
- Docker e Docker Compose

## Configuração Rápida

### 1. Instalar dependências

```bash
npm install
```

### 2. Subir o banco de dados

```bash
docker-compose up -d
```

### 3. Executar migrações

```bash
npm run migration:run
```

### 4. Iniciar o servidor

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

## Comandos Úteis

- `npm run dev` - Servidor em modo desenvolvimento
- `npm run build` - Build para produção
- `npm start` - Executar versão de produção
- `npm run migration:generate` - Gerar nova migração
- `docker-compose down` - Parar o banco de dados

## Variáveis de Ambiente (Opcionais)

Crie um arquivo `.env` se necessário:
