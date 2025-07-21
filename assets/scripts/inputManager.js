/**
 * Handles keyboard input. Tracks the pressed state of keys.
 */
class InputManager {
    constructor() {
        this.keys = {}; // Stores the pressed state of each key

        // Listen for keydown events and mark keys as pressed
        window.addEventListener("keydown", (e) => {
            this.keys[e.code] = true;
        });

        // Listen for keyup events and mark keys as released
        window.addEventListener("keyup", (e) => {
            this.keys[e.code] = false;
        });
    }

    /**
     * Checks if a specific key is currently pressed.
     * @param {string} keyCode - Keycode to check.
     * @returns {boolean} True if the key is pressed, false otherwise.
     */
    isPressed(keyCode) {
        return this.keys[keyCode];
    }
}