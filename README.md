# Bash Game of Life: Survival

A terminal-based survival game that combines the rules of Conway's Game of Life with player control, strategy, and survival mechanics. Written entirely in Bash.

## Features

-   **Interactive Gameplay:** You control a single cell (`@`) in a living Game of Life grid.
-   **Dynamic Terminal UI:** The game board is rendered and updated in real-time in your terminal.
-   **Survival Mechanics:** To survive a turn, you must move to a grid location that will be "alive" in the next generation according to Conway's rules.
-   **Scoring:** Your score is the number of generations you successfully survive.
-   **Power-ups:** Collect temporary immunity power-ups (`$`) that appear on the board.
-   **Difficulty Levels:** Choose from Easy, Medium, and Hard modes, affecting grid size and game speed.
-   **Keyshade Integration (Optional):** Game settings can be managed externally via Keyshade for advanced configuration.

## Prerequisites

-   A Unix-like operating system (Linux, macOS, WSL on Windows).
-   `bash` (version 4.0 or newer recommended).
-   Standard terminal commands (`tput`, `stty`, `read`). These are pre-installed on most systems.

## How to Play

### 1. Clone the Repository
Clone this repository to your local machine.
```bash
git clone https://github.com/johnny603/Bash-Game-O-Life.git
cd Bash-Game-O-Life
```


### 2. Make the Script Executable
You only need to do this once.

```
chmod +x gol_survival.sh
```

### 3. Run the Game
Execute the script to start playing.
```
./gol_survival.sh
```
Game Controls
W: Move Up
A: Move Left
S: Move Down
D: Move Right
Q: Quit the Game
Objective: Survive as many generations as possible by moving your cell (@) to a location that will be alive in the next turn. You die if you move to a cell that becomes dead due to isolation (fewer than 2 neighbors) or overpopulation (more than 3 neighbors).
