/**
 * Basic observer base class for observer pattern.
 * Classes that extend Observer should override onNotify.
 */
class Observer {
    constructor() {};
    /**
     * Called when the subject notifies observers of an event.
     * @param {string} sender - Name of the notifying entity.
     * @param {any} event - Event data.
     */
    onNotify(sender, event) {}
}

/**
 * The subject contains a list of observers and notifies them of events.
 */
class Subject {
    constructor() {
        this.observers = [];
    }

    /**
     * Adds an observer to the notification list.
     * @param {Observer} obj - Object to add.
     */
    addObserver(obj) {
        this.observers.push(obj);
    }

    /**
     * Notifies all registered observers of an event.
     * @param {string} sender - Event sender.
     * @param {any} event - Event data.
     */
    notifyObservers(sender, event) {
        for (let observer of this.observers) {
            observer.onNotify(sender, event);
        }
    }
}