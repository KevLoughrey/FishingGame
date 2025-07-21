/**
 * Constants and properties for the fishing game.
 */
const GAME_CONFIG = {
    // Canvas and entity dimensions
    WIDTH: window.innerWidth, // Canvas width
    HEIGHT: window.innerHeight, // Canvas height
    CANVAS_ID: "canvas", // HTML canvas ID

    ENTITY_SCALE: 0.15, // Scaling factor for entities
    V_UNIT_DIVISOR: 500, // Divisor for vertical unit calculation.
                         // Smaller numbers will increase the 
                         // vertical speed of entities.
                         // Entities move at a speed of HEIGHT / V_UNIT_DIVISOR per frame.
    V_UNIT_STEP: 50, // Step size for vertical unit divisor.
                     // This is subtracted from V_UNIT_DIVISOR each time the difficulty increases.
                     // A larger number will make the game increase in difficulty more quickly.
    MIN_V_UNIT_DIVISOR: 200, // Minimum vertical unit divisor to prevent too high speeds

    // Assets
    BACKGROUND_IMAGE: "./assets/images/background.jpg", // Background image path
    RIPPLE_IMAGE: "./assets/images/ripples.jpg", // Water ripple image path
    GREEN_FISH_IMAGE: "./assets/images/greenfish.png", // Green fish sprite path
    RED_FISH_IMAGE: "./assets/images/redfish.png", // Red fish sprite path

    // Fish sprite settings
    FISH_WIDTH: 537, // Base fish sprite width in pixels
    FISH_HEIGHT: 648, // Base fish sprite height in pixels
    FISH_FRAMES: 6, // Number of frames in fish animation
    FISH_SPACING_Y: 250, // Vertical spacing between fish rows
    COLS: 10, // Number of columns for fish patterns

    // Net sprite settings
    NET_IMAGE: "./assets/images/net.png", // Net sprite path
    NET_WIDTH: 537, // Base net sprite width in pixels
    NET_HEIGHT: 339, // Base net sprite height in pixels
    NET_FRAMES: 1, // Number of frames in net animation

    // Game logic settings
    FISH_BEFORE_DIFFICULTY_INCREASE: 10, // Number of fish to catch before increasing difficulty
    GAME_OVER_THRESHOLD: 3, // Number of green fish the player can miss before game ends
    MAX_DIFFICULTY_INCREASES: 6, // Maximum difficulty increases allowed

    // Text settings
    FONT_FAMILY: 'Arial', // Font family for text
    FONT_SIZE: 48, // Font size for text
    TEXT_COLOR: 0xffffff, // Color for text
    TEXT_ALIGN: 'left', // Text alignment
    SCORE_TEXT_X: 10, // X position for score text
    SCORE_TEXT_Y: 10, // Y position for score text
    MISSED_TEXT_X: 10, // X position for missed text
    MISSED_TEXT_Y: 50, // Y position for missed text

    // Getters
    get H_UNIT() {
        // Calculate a single horizontal unit
        return this.WIDTH / 100;
    },
    get V_UNIT() {
        // Calculate a single vertical unit
        return this.HEIGHT / this.V_UNIT_DIVISOR;
    },
    get FISH_Y_SPAWN() {
        // Y position for spawning fish off-screen
        return -this.FISH_HEIGHT * this.ENTITY_SCALE;
    },
    get INIT_FISH_SPEED() {
        // Initial fish speed
        return this.V_UNIT;
    },
    get INIT_NET_SPEED() {
        // Initial net speed
        return this.H_UNIT;
    },
    get MAX_NET_SPEED() {
        // Maximum net speed
        return this.H_UNIT * 2;
    },
    get NET_X() {
        // Initial X position for the net
        return this.WIDTH / 2 - (this.NET_WIDTH * this.ENTITY_SCALE) / 2;
    },
    get NET_Y() {
        // Initial Y position for the net
        return this.HEIGHT - this.NET_HEIGHT * this.ENTITY_SCALE;
    },
};
