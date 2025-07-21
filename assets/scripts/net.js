/**
 * The player's net. Moves left and right based on keyboard input.
 */
class Net extends GameEntity {
    /**
     * @param {Object} config - Game configuration object.
     * @param {InputManager} inputManager - For inputs.
     */
    constructor(config, inputManager) {
        super({
            x: config.NET_X,
            y: config.NET_Y,
            imageUrl: config.NET_IMAGE,
            frameCount: config.NET_FRAMES,
            frameWidth: config.NET_WIDTH,
            frameHeight: config.NET_HEIGHT,
            scale: config.ENTITY_SCALE,
        });
        this.speed = config.INIT_NET_SPEED;   
        this.maxSpeed = config.MAX_NET_SPEED;
        this.maxX = config.WIDTH;  // Rightmost boundary for movement
        this.inputManager = inputManager;
    }

    /**
     * Updates the net's position based on keyboard input.
     * @param {number} delta - Time since last frame.
     */
    update(delta) {
        if (this.inputManager.isPressed("ArrowLeft")) {
            this.x -= this.speed * delta;
        }
        if (this.inputManager.isPressed("ArrowRight")) {
            this.x += this.speed * delta;
        }
        // Clamp the position within screen bounds
        this.x = Math.max(0, Math.min(this.x, this.maxX - this.width));
    }
}