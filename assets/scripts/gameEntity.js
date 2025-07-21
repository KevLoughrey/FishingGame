/**
 * Slices a sprite sheet into a PIXI animation.
 * @param {string} imageUrl - Path to sprite sheet.
 * @param {number} frameCount - Number of frames in animation.
 * @param {number} frameWidth - Width of each frame in pixels.
 * @param {number} frameHeight - Height of each frame in pixels.
 * @returns {PIXI.Texture[]} Animation as PIXI Texture array.
 */
function createSpriteAnimation(imageUrl, frameCount, frameWidth, frameHeight) {
    const base = PIXI.BaseTexture.from(imageUrl);
    const frames = [];

    for (let i = 0; i < frameCount; i++) {
        frames.push(
            new PIXI.Texture(
                base,
                new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight)
            )
        );
    }
    return frames;
}

/**
 * Base class for tangible game objects.
 */
class GameEntity {
    /**
     * @param {Object} params - Entity configuration.
     * @param {number} params.x - Initial X position.
     * @param {number} params.y - Initial Y position.
     * @param {string} params.imageUrl - Sprite sheet image path.
     * @param {number} params.frameCount - Number of animation frames.
     * @param {number} params.frameWidth - Width of each frame.
     * @param {number} params.frameHeight - Height of each frame.
     * @param {number} params.scale - Scaling for the entity.
     */
    constructor({
        x,
        y,
        imageUrl,
        frameCount,
        frameWidth,
        frameHeight,
        scale,
    }) {
        this.x = x;
        this.y = y;
        this.width = frameWidth * scale;
        this.height = frameHeight * scale;

        this.textures = createSpriteAnimation(
            imageUrl,
            frameCount,
            frameWidth,
            frameHeight
        );
        this.sprite = new PIXI.AnimatedSprite(this.textures);
        this.sprite.position.set(x, y);
        this.sprite.scale.set(scale);
        this.sprite.animationSpeed = 0.15;
        this.sprite.play();
    }

    /**
     * Returns the PIXI sprite for rendering.
     * @returns {PIXI.AnimatedSprite}
     */
    getSprite() {
        return this.sprite;
    }

    /**
     * Updates the sprite's position to match the entity's coordinates.
     * Should be called each frame.
     */
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    /** @returns {number} Current X position. */
    getX() {
        return this.x;
    }

    /** @returns {number} Current Y position. */
    getY() {
        return this.y;
    }

    /** @returns {number} Width in pixels. */
    getWidth() {
        return this.width;
    }

    /** @returns {number} Height in pixels. */
    getHeight() {
        return this.height;
    }

    /** @returns {number} Y position of bottom edge. */
    getBottom() {
        return this.y + this.height;
    }
}