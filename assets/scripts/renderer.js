/**
 * Handles most PIXI.js logic, including game loop.
 */
class Renderer {
    /**
     * @param {Object} config - Game configuration object.
     * @param {Function} onReady - Callback to run when assets are loaded and renderer is ready.
     */
    constructor(config, onReady) {
        this.width = config.WIDTH;
        this.height = config.HEIGHT;
        this.canvasId = config.CANVAS_ID;
        this.entities = []; // Array of game entities to update/draw
        this.onReady = onReady;

        // Create PIXI application and attach to canvas
        this.app = new PIXI.Application({
            view: document.getElementById(this.canvasId),
            width: this.width,
            height: this.height,
        });

        // Main container for all sprites and effects
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        // Load background and ripple images
        this.loader = new PIXI.Loader();
        this.loader
            .add("bg", config.BACKGROUND_IMAGE)
            .add("ripples", config.RIPPLE_IMAGE)
            .load((_, resources) => this.onAssetsLoaded(resources));
    }

    /**
     * Called when PIXI loader finishes loading assets.
     * Sets up background, ripple effect, and starts the game loop.
     * @param {Object} resources - Loaded asset resources.
     */
    onAssetsLoaded(resources) {
        // Add background sprite
        const bgSprite = new PIXI.Sprite(resources.bg.texture);
        bgSprite.width = this.width;
        bgSprite.height = this.height;
        this.container.addChild(bgSprite);

        // Add ripple sprite and set up displacement filter for water effect
        const ripplesSprite = new PIXI.Sprite(resources.ripples.texture);
        ripplesSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        ripplesSprite.height = this.height * 2; // Make it taller for looping
        this.app.stage.addChild(ripplesSprite);

        const filter = new PIXI.filters.DisplacementFilter(ripplesSprite);
        this.container.filters = [filter];

        // Create a color matrix filter and tint greenish-blue
        const blueFilter = new PIXI.filters.ColorMatrixFilter();
        blueFilter.tint(0x66ccff);

        // Apply the blue filter to the main container
        this.container.filters = [filter, blueFilter];

        // Animate ripples downwards
        const rippleSpeed = 2;
        this.app.ticker.add((delta) => {
            ripplesSprite.y += rippleSpeed * delta;
            if (ripplesSprite.y >= ripplesSprite.height) {
                ripplesSprite.y -= ripplesSprite.height; // Wrap for seamless loop
            }
            this.tick(delta);
        });

        // Notify that renderer and assets are ready
        if (this.onReady) {
            this.onReady();
        }
    }

    /**
     * Main game loop called every frame by PIXI.
     * Updates and draws all entities.
     * @param {number} delta - Time since last frame.
     */
    tick(delta) {
        for (const obj of this.entities) {
            obj.update?.(delta);
            obj.draw?.(delta);
        }
    }

    /**
     * Adds an entity to the renderer.
     * Used for entities with a sprite.
     * @param {Object} obj - Game entity to add.
     */
    addEntity(obj) {
        const sprite = obj.getSprite?.();
        if (sprite && !this.container.children.includes(sprite)) {
            this.container.addChild(sprite);
        }
        this.entities.push(obj);
    }

    /**
     * Removes an entity from the renderer.
     * @param {Object} obj - Game entity to remove.
     */
    removeEntity(obj) {
        const sprite = obj.getSprite?.();
        if (sprite?.parent) {
            sprite.parent.removeChild(sprite);
        }
        const index = this.entities.indexOf(obj);
        if (index !== -1) this.entities.splice(index, 1);
    }

    /**
     * Returns the PIXI application instance.
     * @returns {PIXI.Application}
     */
    getApp() {
        return this.app;
    }

    /**
     * Adds a child display object directly to the PIXI stage.
     * Used for text elements.
     * @param {Object} child - Object to add.
     */
    addChild(child) {
        this.app.stage.addChild(child);
    }
}
