import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Game } from '../entities/Game';

const router = Router();
const gameRepository = AppDataSource.getRepository(Game);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Salvar um novo jogo
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameInput'
 *     responses:
 *       201:
 *         description: Jogo salvo com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 game:
 *                   $ref: '#/components/schemas/Game'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/games', async (req, res) => {
  try {
    const { board, winner, isDraw, currentPlayer, status } = req.body;
    
    const game = new Game();
    game.board = board;
    game.winner = winner;
    game.isDraw = isDraw || false;
    game.currentPlayer = currentPlayer;
    game.status = status || 'finished';
    
    const savedGame = await gameRepository.save(game);
    
    res.status(201).json({
      message: 'Game saved successfully',
      game: savedGame
    });
  } catch (error: unknown) {
    console.error('Error saving game:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      error: 'Failed to save game',
      message: errorMessage
    });
  }
});

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Listar histórico de jogos
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de itens por página
 *     responses:
 *       200:
 *         description: Lista de jogos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 games:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Game'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/games', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const [games, total] = await gameRepository.findAndCount({
      order: { playedDate: 'DESC' },
      skip,
      take: limit
    });
    
    res.json({
      games,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: unknown) {
    console.error('Error fetching games:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      error: 'Failed to fetch games',
      message: errorMessage
    });
  }
});

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Obter um jogo específico
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogo
 *     responses:
 *       200:
 *         description: Jogo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game:
 *                   $ref: '#/components/schemas/Game'
 *       404:
 *         description: Jogo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = await gameRepository.findOne({ where: { id: parseInt(id) } });
    
    if (!game) {
      return res.status(404).json({
        error: 'Game not found'
      });
    }
    
    res.json({ game });
  } catch (error: unknown) {
    console.error('Error fetching game:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      error: 'Failed to fetch game',
      message: errorMessage
    });
  }
});

export default router;