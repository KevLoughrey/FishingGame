/**
 * Bridge between PIXI renderer and main.js.
 * Provides methods for adding/removing entities and children.
 */
class Game {
    /**
     * @param {Object} config - Game configuration object.
     */
    constructor(config) {
        // Initialize the renderer
        this.renderer = new Renderer(
            config,
            this.ready.bind(this),
        );
        this.pendingObjects = [];
    }

    /**
     * Callback from constructor. Called when renderer is ready.
     * Adds any pending entities to the renderer.
     */
    ready() {
        for (const obj of this.pendingObjects) {
            this.renderer.addEntity(obj);
        }
        this.pendingObjects = [];

        // Call onReady
        if (this.onReadyCallback) this.onReadyCallback(this);
    }

    /**
     * Adds an entity to the renderer.
     * Used for rendering sprites.
     * If renderer is not ready, stores entity for later addition.
     * @param {Object} obj - Entity to add.
     */
    addEntity(obj) {
        if (this.renderer.app) {
            this.renderer.addEntity(obj);
        } else {
            this.pendingObjects.push(obj);
        }
    }

    /**
     * Removes an entity from the renderer.
     * @param {Object} obj - Entity to remove.
     */
    removeEntity(obj) {
        this.renderer.removeEntity(obj);
    }

    /**
     * Sets an external callback to be called when the game is ready.
     * @param {Function} callback - Callback function.
     */
    onReady(callback) {
        this.onReadyCallback = callback;
    }

    /**
     * Adds a child display object to the renderer's container.
     * Used for rendering text.
     * @param {Object} child - Display object to add.
     */
    addChild(child) {
        this.renderer.addChild(child);
    }
}
