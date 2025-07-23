/**
 * Manages all fish entities in the game.
 * Spawns fish based on patterns, updating states of existing fish,
 * removing caught or off-screen fish, and manages fish speed for difficulty.
 */
class Fishery {
    /**
     * @param {Object} config - Game configuration object.
     * @param {Game} game - Main game instance.
     * @param {FishAtlas} fishAtlas - Fish spawn patterns.
     * @param {Observer} subject - Observer subject for notifications.
     */
    constructor(config, game, fishAtlas, subject) {
        this.fish = [];
        this.cols = config.COLS;
        this.fishAtlas = fishAtlas;
        this.subject = subject;
        this.screenWidth = config.WIDTH;
        this.screenHeight = config.HEIGHT;
        this.startY = config.FISH_Y_SPAWN; // Y position for first fish row
        this.spacingY = config.FISH_SPACING_Y; // Spacing between fish rows
        this.greenFishImage = config.GREEN_FISH_IMAGE;
        this.redFishImage = config.RED_FISH_IMAGE;
        this.frameCount = config.FISH_FRAMES;
        this.frameWidth = config.FISH_WIDTH;
        this.frameHeight = config.FISH_HEIGHT;
        this.fishSpeed = config.INIT_FISH_SPEED;
        this.scale = config.ENTITY_SCALE;
        this.vUnitDivisor = config.V_UNIT_DIVISOR; // Used for difficulty scaling. See comments in config.js
        this.vUnitStep = config.V_UNIT_STEP;
        this.minVUnitDivisor = config.MIN_V_UNIT_DIVISOR;
        this.game = game;

        // Use only easy patterns initially.
        // Further patterns are appended from the difficultyArrays var
        // when difficulty the game increases.
        this.patterns = this.fishAtlas.getEasyPatterns();
        this.difficultyArrays = [
            this.fishAtlas.getMediumPatterns(),
            this.fishAtlas.getHardPatterns(),
            this.fishAtlas.getVeryHardPatterns(),
        ];

        // Spawn initial fish
        this.makeFish(this.patterns[0]);
    }

    /**
     * Spawns fish based on a pattern string.
     * @param {string} pattern - String representing fish layout.
     */
    makeFish(pattern) {
        // Split the pattern into rows and calculate 
        // horizontal spacing based on desired num of cols.
        const rows = pattern.trim().split("\n");
        const xSpacing = this.screenWidth / (this.cols + 1);

        // Map pattern characters to fish types and images
        const fishMap = {
            G: { type: "Green", image: this.greenFishImage },
            R: { type: "Red", image: this.redFishImage },
        };

        // For each row
        rows.forEach((row, rowIndex) => {
            // For each character in the row
            [...row].forEach((char, colIndex) => {
                // If the char is a valid fish type
                if (char in fishMap) {
                    // Setup the position
                    const x = (colIndex + 1) * xSpacing;
                    const y = this.startY - (rows.length - 1 - rowIndex) * this.spacingY;
                    // Get type and image
                    const { type, image } = fishMap[char];
                    // Create the fish
                    const fish = new Fish({
                        x,
                        y,
                        imageUrl: image,
                        frameCount: this.frameCount,
                        frameWidth: this.frameWidth,
                        frameHeight: this.frameHeight,
                        scale: this.scale,
                        speed: this.fishSpeed,
                        type,
                    });

                    // Add the fish to the internal fish array,
                    // and append to the game for updating and rendering.
                    this.fish.push(fish);
                    this.game.addEntity(fish);
                }
            });
        });
    }

    /**
     * Get all active fish.
     * @returns {Fish[]} Array of fish.
     */
    getFish() {
        return this.fish;
    }

    /**
     * Removes caught or off-screen fish
     * and spawns new fish if needed.
     */
    update() {
        // Remove any fish that are caught or no longer visible.
        this.fish = this.fish.filter((fish) => {
            const onScreen = fish.y <= this.screenHeight;
            const isCaught = fish.caught === true;

            if (!onScreen || isCaught) {
                // If a green fish is missed, 
                // notify observers
                if (!onScreen && fish.getType() === "Green") {
                    this.subject.notifyObservers(
                        "Fishery",
                        `Green missed`
                    );
                }
                this.game.removeEntity(fish);
                return false;
            }
            return true;
        });

        // If no fish are near the top of the screen, 
        // spawn in a new pattern
        const enoughFish = this.fish.some((fish) => fish.y < 100);
        if (!enoughFish) {
            const rand = Math.floor(Math.random() * this.patterns.length);
            this.makeFish(this.patterns[rand]);
        }
    }

    /**
     * Increases difficulty by speeding up fish and adding harder patterns.
     * @param {number} increases - Number of difficulty increases so far.
     */
    increaseDifficulty(increases) {
        this.vUnitDivisor = Math.max(this.minVUnitDivisor, this.vUnitDivisor - this.vUnitStep);
        this.fishSpeed = this.screenHeight / this.vUnitDivisor;
        if (increases < this.difficultyArrays.length) {
            // Add harder patterns to the pool
            this.patterns = this.patterns.concat(this.difficultyArrays[increases - 1]);
        }
    }
}
