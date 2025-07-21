/**
 * Main entry point for the programme.
 * Initializes fundamental components and relationships.
 */

const game = new Game(GAME_CONFIG);

// Callback; run when the renderer and assets are ready
game.onReady(() => {
    const subject = new Subject(); // Subject for observer pattern

    const fishAtlas = new FishAtlas(); // Contains fish spawn patterns
    const inputManager = new InputManager(); // Gets keyboard state

    const fishery = new Fishery(GAME_CONFIG, game, fishAtlas, subject); // Manages fish
    const net = new Net(GAME_CONFIG, inputManager); // The player's net
    const scoreManager = new ScoreManager(GAME_CONFIG, subject); // Tracks and displays score
    const gameManager = new GameManager(GAME_CONFIG, fishery, net); // Handle game logic and difficulty
    const collisionManager = new CollisionManager(fishery, net, subject); // Detect collisions

    // Rendering and updates are handled by the game object
    game.addEntity(fishery);
    game.addEntity(net);
    game.addEntity(scoreManager);
    game.addEntity(collisionManager);

    // Add score and missed text to the renderer
    game.addChild(scoreManager.getScoreText());
    game.addChild(gameManager.getMissedText());

    // Register observers for notifications
    subject.addObserver(scoreManager);
    subject.addObserver(gameManager);
});