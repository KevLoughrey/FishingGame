/**
 * Observes game events and manage difficulty and game over logic.
 */
class GameManager extends Observer {
    /**
     * @param {Object} config - Game config object.
     * @param {Fishery} fishery - Fish factory.
     * @param {Net} net - Player's net.
     */
    constructor(config, fishery, net) {
        super();
        this.fishery = fishery;
        this.net = net;
        this.difficultyIncreases = 0; // How many times has the difficulty increased?
        this.fishBeforeIncrease = config.FISH_BEFORE_DIFFICULTY_INCREASE; // Score threshold for difficulty increase
        this.greenFishMissed = 0; // Count of green fish that the player has missed
        this.gameOverThreshold = config.GAME_OVER_THRESHOLD;
        this.maxDifficultyIncreases = config.MAX_DIFFICULTY_INCREASES;

        this.missedText = new PIXI.Text(`Missed: 0 / ${this.gameOverThreshold}`, {
            fontFamily: config.FONT_FAMILY,
            fontSize: config.FONT_SIZE,
            fill: config.TEXT_COLOR,
            align: config.TEXT_ALIGN
        });
        this.missedText.x = config.MISSED_TEXT_X;
        this.missedText.y = config.MISSED_TEXT_Y;
    }

    /**
     * Updates the missed text display.
     */
    updateMissedText() {
        this.missedText.text = `Missed: ${this.greenFishMissed} / ${this.gameOverThreshold}`;
    }

    /**
     * Handle notifications from observed subjects.
     * - If a Red fish is caught, the game ends.
     * - If the score reaches threshold, increase the difficulty.
     * @param {string} sender - Name of the notifying entity.
     * @param {any} event - Event data.
     */
    onNotify(sender, event) {
        // Check for game over
        if (sender == "Collision Manager") {
            if (event.includes("Red")) {
                // Game over logic goes here
                alert("You lose! You caught a Red fish.");
            }
        }
        // Check for difficulty increase
        if (sender == "Score Manager") {
            if (
                event % this.fishBeforeIncrease == 0 &&
                this.difficultyIncreases < this.maxDifficultyIncreases
            ) {
                this.difficultyIncreases++;
                this.fishery.increaseDifficulty(this.difficultyIncreases);
            }
        }
        // Increase count of missed green fish
        if (sender == "Fishery") {
            if (event.includes("Green missed")) {
                this.greenFishMissed++;
                this.updateMissedText();
            }
            if (this.greenFishMissed >= this.gameOverThreshold) {
                alert("You lose! You missed too many Green fish.");
            }
        }
    }
    /**
     * Gets the count of missed green fish.
     * @returns {number} The number of green fish that the player has missed.
     */
    getMissedCount() {
        return this.greenFishMissed;
    }

    /**
     * Returns the PIXI text object for score display.
     * @returns {PIXI.Text}
     */
    getMissedText() {
        return this.missedText;
    }
}
