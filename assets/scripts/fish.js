/**
 * Represents a fish game entity.
 * Extends GameEntity to inherit 
 * position, sprite, and animation properties.
 */
class Fish extends GameEntity {
    /**
     * @param {Object} config - Configuration object for the fish.
     */
    constructor(config) {
        super(config);
        this.type = config.type;
        this.speed = config.speed;
    }
    
    /**
     * Update the fish's position each frame.
     * @param {number} delta - time since last frame.
     */
    update(delta) {
        this.y += this.speed * delta;
    }

    /**
     * Get the type of fish.
     * @returns {string} - The type of fish.
     */
    getType() {
        return this.type;
    }

    /**
     * Mark the fish as caught for removal from game.
     */
    setCaught() {
        this.caught = true;
    }

    /**
     * Set the fish's speed, for increasing difficulty
     * over time.
     * @param {number} s - New speed value.
     */
    setSpeed(s) {
        this.speed = s;
    }
}