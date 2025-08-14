# **Game Specification: TS-Invaders**

## **1\. Overview**

**TS-Invaders** is a single-player, 2D, fixed-shooter game. The player controls a laser cannon at the bottom of the screen, moving horizontally to defend against descending waves of aliens. The objective is to destroy all aliens in a wave before they reach the bottom of the screen or eliminate the player. The game's difficulty increases with each successfully cleared wave.

## **2\. Game Entities**

### **2.1. Player Cannon**

* **Appearance:** A stylized laser cannon positioned at the bottom-center of the screen.  
* **Movement:** The cannon can move horizontally only. Its movement is constrained to the boundaries of the game screen.  
* **Actions:**  
  * Fires a single laser projectile vertically upwards.  
  * A new projectile cannot be fired until the previous one has either hit an alien/barrier or traveled off-screen.  
* **State:** The player has a set number of lives (e.g., 3). A life is lost upon collision with an enemy projectile or an alien.

### **2.2. Aliens (The Swarm)**

* **Appearance:** A grid of aliens, organized into rows and columns. At least three distinct alien types should be represented, each with a unique sprite and point value (e.g., Top Row: 30 pts, Middle Rows: 20 pts, Bottom Row: 10 pts).  
* **Movement:**  
  * The entire swarm moves horizontally as a single block.  
  * When the outermost alien in the direction of movement reaches the edge of the screen, the entire swarm reverses direction and drops down one level.  
  * The movement speed of the swarm increases as more aliens are destroyed.  
* **Actions:**  
  * Aliens fire laser projectiles vertically downwards at random intervals.  
  * Only aliens on the bottom-most row of the swarm are eligible to fire.  
  * The frequency of firing increases as the number of aliens decreases.

### **2.3. UFO (Mystery Ship)**

* **Appearance:** A small, fast-moving flying saucer.  
* **Movement:** Appears at random intervals, moving horizontally across the top of the screen from one side to the other. It does not descend.  
* **State:** Awards a random, high-point value when destroyed (e.g., 50, 100, or 150 points). It disappears if it reaches the other side of the screen.

### **2.4. Projectiles**

* **Player Projectile:** A thin, vertical laser beam moving upwards from the cannon's position.  
* **Alien Projectile:** A distinct, stylized laser bolt moving downwards from an alien's position.  
* **Behavior:** Projectiles are destroyed upon collision with a valid target or upon leaving the screen boundaries.

### **2.5. Barriers**

* **Appearance:** A set of four destructible barriers located above the player's cannon.  
* **State:**  
  * Composed of a grid of "blocks" or pixels.  
  * Each projectile (player or alien) that hits a barrier destroys a small portion of it.  
  * Aliens that descend low enough to touch a barrier will also destroy the parts they move through.  
  * They provide temporary protection for the player.

## **3\. Game Mechanics**

### **3.1. Controls**

* **Move Left:** Left Arrow Key / A Key  
* **Move Right:** Right Arrow Key / D Key  
* **Fire:** Spacebar / Up Arrow Key  
* **Pause/Start:** Enter Key

### **3.2. Scoring**

* Points are awarded for destroying aliens and the UFO.  
* The player's score is displayed prominently on screen.  
* A high score table will persist locally to track the best performances.

### **3.3. Level Progression (Waves)**

* A level (or "wave") is cleared when the player successfully destroys all aliens in the swarm.  
* Upon clearing a wave, the game briefly pauses, displays a "Wave Cleared" message, and then generates a new, slightly faster swarm that starts one level lower than the previous wave.

### **3.4. Collision Detection**

* **Player Projectile vs. Alien:** Destroys both the projectile and the alien. Awards points.  
* **Player Projectile vs. UFO:** Destroys both. Awards points.  
* **Player Projectile vs. Barrier:** Destroys the projectile and a part of the barrier.  
* **Alien Projectile vs. Player:** Destroys the projectile. A player life is lost. The player cannon enters a brief "destroyed" animation state before respawning (if lives remain).  
* **Alien Projectile vs. Barrier:** Destroys the projectile and a part of the barrier.  
* **Alien vs. Player:** A player life is lost. The game ends.  
* **Alien vs. Barrier:** Destroys the part of the barrier the alien passes through.  
* **Alien vs. Bottom of Screen:** The game ends (Invasion successful).

## **4\. Game Flow & States**

* **Start Menu:** The initial screen. Displays the game title, high score, and a "Press Enter to Start" prompt.  
* **Gameplay State:** The active game screen where the core loop occurs. The UI will display the current score, number of lives remaining, and the current wave number.  
* **Pause State:** The game loop is halted. A "Paused" message is displayed. The game resumes upon a second key press.  
* **Game Over State:** Triggered when the player loses all lives or the swarm reaches the bottom. Displays "Game Over," the final score, and prompts the player to return to the Start Menu.

## **5\. Technical Specification (TypeScript)**

* **Rendering:** The game will be rendered on an HTML5 \<canvas\> element.  
* **Game Loop:** A primary game loop will be driven by requestAnimationFrame for smooth updates and rendering.  
* **Entity Management:**  
  * Game entities (Player, Alien, Projectile, etc.) will be represented by classes or interfaces.  
  * A GameState object will manage collections of all active entities (e.g., aliens: Alien\[\], projectiles: Projectile\[\]).  
* **Collision Logic:** A collision detection module will iterate through relevant entity arrays to check for bounding box intersections.  
* **Input Handling:** Event listeners (keydown, keyup) will be attached to the window to manage player input, updating a state object that the player cannon reads from during the game loop.

## **6\. Asset List**

### **6.1. Sprites**

* Player Cannon (idle, exploding)  
* Alien Type 1 (2-frame animation)  
* Alien Type 2 (2-frame animation)  
* Alien Type 3 (2-frame animation)  
* UFO  
* Player Projectile  
* Alien Projectile  
* Barrier (and its degraded states)

### **6.2. Audio**

* Player Fire (Laser sound)  
* Alien Fire  
* Alien Destroyed (Explosion)  
* UFO Flying (Looping)  
* UFO Destroyed  
* Player Destroyed (Explosion)  
* Background "March" (4-note loop that speeds up as aliens are destroyed)