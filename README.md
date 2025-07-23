# FishingGame

## Overview
This is a simple game developed rapidly to demonstrate JavaScript proficiency. PIXI.js has also been used for rendering to simplify sprite animation and visual effects.

The project has been designed in accordance with OOP best practices. The bridge pattern has been used as much as possible to isolate the PIXI.js logic, and the Observer pattern has been implemented to manage cross-project events. A factory is used to generate fish in increasingly difficult patterns. Simple spatial tracking has been implemented in the collision manager to reduce the number of collision checks per frame.

## Usage
* The game can be played here: https://kevloughrey.github.io/FishingGame
* The goal is to catch as many green fish as possible.
* If you catch even one red fish, the game ends. 
* If you miss three green fish, the game ends. 
* Use the left and right arrow keys to move.

# Limitations
* Due to the quick nature of development, the desktop experience was prioritised. The game is not currently playable on mobile devices.
* Full game over functionality has not yet been implemented. The game will currently just flash an alert when a loss is recorded then reload the page. This will be updated in the next deployment.

## Future Development
* A simple backend API will be developed to track highscores.