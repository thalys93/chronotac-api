import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ChronoTac API',
      version: '1.0.0',
      description: 'API para gerenciamento de jogos Tic-Tac-Toe',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Game: {
          type: 'object',
          required: ['board', 'currentPlayer'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do jogo',
            },
            board: {
              type: 'array',
              items: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              description: 'Tabuleiro do jogo (matriz 3x3)',
            },
            winner: {
              type: 'string',
              nullable: true,
              description: 'Vencedor do jogo (X, O ou null)',
            },
            isDraw: {
              type: 'boolean',
              default: false,
              description: 'Indica se o jogo terminou em empate',
            },
            currentPlayer: {
              type: 'string',
              description: 'Jogador atual (X ou O)',
            },
            playedDate: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora em que o jogo foi jogado',
            },
            status: {
              type: 'string',
              default: 'finished',
              description: 'Status do jogo',
            },
          },
        },
        GameInput: {
          type: 'object',
          required: ['board', 'currentPlayer'],
          properties: {
            board: {
              type: 'array',
              items: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              description: 'Tabuleiro do jogo (matriz 3x3)',
            },
            winner: {
              type: 'string',
              nullable: true,
              description: 'Vencedor do jogo (X, O ou null)',
            },
            isDraw: {
              type: 'boolean',
              default: false,
              description: 'Indica se o jogo terminou em empate',
            },
            currentPlayer: {
              type: 'string',
              description: 'Jogador atual (X ou O)',
            },
            status: {
              type: 'string',
              default: 'finished',
              description: 'Status do jogo',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
            message: {
              type: 'string',
              description: 'Detalhes do erro',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };