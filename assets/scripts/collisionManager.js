/**
 * Detect collisions between fish and the net/player,
 * and notify observers when a collision occurs.
 */
class CollisionManager {
    /**
     * @param {Fishery} fishery - The fishery managing all fish entities.
     * @param {Net} net - The net entity controlled by the player.
     * @param {Subject} subject - The subject for observer notifications.
     */
    constructor(fishery, net, subject) {
        this.fishery = fishery;
        this.net = net;
        this.subject = subject;
    }

    /**
     * Basic AABB collision detection between two entities.
     * @param {GameEntity} a - First entity.
     * @param {GameEntity} b - Second entity.
     * @returns {boolean} True if the entities collide, false otherwise.
     */
    aabbCollision(a, b) {
        const boundsA = a.getSprite().getBounds();
        const boundsB = b.getSprite().getBounds();

        return (
            boundsA.x < boundsB.x + boundsB.width &&
            boundsA.x + boundsA.width > boundsB.x &&
            boundsA.y < boundsB.y + boundsB.height &&
            boundsA.y + boundsA.height > boundsB.y
        );
    }

    /**
     * Checks all fish to see if any collide with the net.
     * If a collision is detected, marks the fish as caught and notifies observers.
     */
    update() {
        // Basic spatial hashing for performance. Filters to fish
        // that are close enough to the net to collide.
        const fishOfInterest = this.fishery.getFish().filter((fish) => {
            return fish.getBottom() >= this.net.getY();
        });
        // Perform AABB detection on filtered fish.
        if (fishOfInterest.length > 0) {
            for (let fish of fishOfInterest) {
                if (this.aabbCollision(fish, this.net)) {
                    fish.setCaught();
                    this.subject.notifyObservers(
                        "Collision Manager",
                        `${fish.getType()} caught`
                    );
                }
            }
        }
    }
}
