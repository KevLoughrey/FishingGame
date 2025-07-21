/**
 * Track and display the player's score.
 */
class ScoreManager extends Observer {
    /**
     * @param {Object} config - Game configuration object.
     * @param {Subject} subject - Observer pattern subject.
     */
    constructor(config, subject) {
        super();
        this.score = 0;
        this.subject = subject;

        this.scoreText = new PIXI.Text('Score: 0', {
            fontFamily: config.FONT_FAMILY,
            fontSize: config.FONT_SIZE,
            fill: config.TEXT_COLOR,
            align: config.TEXT_ALIGN
        });
        this.scoreText.x = config.SCORE_TEXT_X;
        this.scoreText.y = config.SCORE_TEXT_Y;
    }

    /**
     * Handles notifications from observed subjects.
     * Increases score when a green fish is caught and updates display.
     * Notifies other observers of the new score (for gameManager).
     * @param {string} sender - Event sender.
     * @param {any} event - Event data.
     */
    onNotify(sender, event) {
        if (sender == "Collision Manager") {
            if (event.includes("Green")) {
                this.score++;
                this.updateScoreText();
                this.subject.notifyObservers("Score Manager", this.score);
            }
        }
    }

    /**
     * Updates the score text display.
     */
    updateScoreText() {
        this.scoreText.text = `Score: ${this.score}`;
    }

    /**
     * Returns the PIXI text object for score display.
     * @returns {PIXI.Text}
     */
    getScoreText() {
        return this.scoreText;
    }
}