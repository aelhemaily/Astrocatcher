
    // Function to hide cursor when over catcher
function hideCursorOverCatcher() {
    const catcher = document.getElementById('catcher');

    catcher.addEventListener('mouseenter', () => {
        catcher.style.cursor = 'none';
    });

    catcher.addEventListener('mouseleave', () => {
        catcher.style.cursor = 'auto';
    });
}

// Call the function to hide cursor over catcher
hideCursorOverCatcher();



    let verticalMovementDisabled = false;


document.addEventListener('DOMContentLoaded', () => {
    // Get the catcher element and lives container
    const catcher = document.getElementById('catcher');
    const livesContainer = document.getElementById('livesContainer'); // Container for hearts
    let lives = 5; // Initial number of lives
    let gamePaused = false;

    // Function to initialize the lives display with heart icons
    function initializeLives() {
        livesContainer.innerHTML = ''; // Clear existing hearts
        for (let i = 0; i < lives; i++) {
            const heart = document.createElement('img');
            heart.src = 'images/heart.png'; // Path to your heart icon
            heart.alt = 'Heart';
            heart.className = 'heart-icon'; // Add class for styling
            livesContainer.appendChild(heart);
        }
    }

    // Function to handle game over
    function endGame() {
        console.log("Game Over!");
        gamePaused = true;
        // Additional end game logic here, e.g., display a game over message
    }

    // Function to center the catcher horizontally
    function centerCatcher() {
        const catcherWidth = catcher.offsetWidth;
        const windowWidth = window.innerWidth;
        const centerLeft = (windowWidth - catcherWidth) / 2;
        catcher.style.left = `${centerLeft}px`;
    }

    // Color images mapping
    const colorImages = {
        red: 'images/catcher-red.png',
        green: 'images/catcher-green.png',
        blue: 'images/catcher-blue.png',
        yellow: 'images/catcher-yellow.png',
        orange: 'images/catcher-orange.png',
        purple: 'images/catcher-purple.png'
    };

    // Function to change catcher image based on selected color
    function changeCatcherColor(color) {
        const catcherImg = document.querySelector('#catcher img');
        const imageUrl = colorImages[color];

        if (catcherImg && imageUrl) {
            catcherImg.src = imageUrl; // Update the image source
        }
    }

   // Function to enable or disable the color palette click and touch events
function toggleColorPalette(enabled) {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    colors.forEach(color => {
        const element = document.getElementById(color);
        if (element) {
            element.style.pointerEvents = enabled ? 'auto' : 'none';

            if (enabled) {
                // Add touch event listeners
                element.addEventListener('touchstart', handleColorTouch);
                element.addEventListener('touchend', handleColorTouchEnd);
            } else {
                // Remove touch event listeners
                element.removeEventListener('touchstart', handleColorTouch);
                element.removeEventListener('touchend', handleColorTouchEnd);
            }
        }
    });
}

// Handle touch start event
function handleColorTouch(event) {
    event.preventDefault(); // Prevent default touch behavior
    event.stopPropagation(); // Stop the event from propagating to other elements
    const color = event.target.id;
    changeCatcherColor(color);
}

// Handle touch end event
function handleColorTouchEnd(event) {
    event.preventDefault(); // Prevent default touch behavior
    event.stopPropagation(); // Stop the event from propagating to other elements
}

// Function to change the catcher color
function changeCatcherColor(color) {
    const catcherImage = document.querySelector('#catcher img');
    const colorMap = {
        'red': colorImages.red,
        'green': colorImages.green,
        'blue': colorImages.blue,
        'yellow': colorImages.yellow,
        'orange': colorImages.orange,
        'purple': colorImages.purple
    };
    if (colorMap[color]) {
        catcherImage.src = colorMap[color];
        currentColorIndex = colors.indexOf(color);
    }
}

// Call toggleColorPalette with true to enable the color palette
toggleColorPalette(true);


    // Function to handle game pause
    function pauseGame() {
        if (!gamePaused && gameOverScreen.style.display !== 'block') {
            gamePaused = true;
            clearInterval(ballCreationInterval);
            activeBalls.forEach(ballData => {
                clearInterval(ballData.interval); // Stop all falling balls
            });
            pauseOverlay.style.display = 'block'; // Show the pause overlay
            toggleColorPalette(false); // Disable color palette
            document.dispatchEvent(new Event('pauseGame')); // Dispatch pause event
        }
    }

    // Function to handle game resume
    function resumeGame() {
        console.log('Resuming game');
        if (gamePaused) {
            gamePaused = false;
            pauseOverlay.style.display = 'none'; // Hide the pause overlay
            toggleColorPalette(true); // Enable color palette

            // Clear any existing ball creation interval
            clearInterval(ballCreationInterval);

            // Restart ball creation
            ballCreationInterval = setInterval(() => {
                if (lives > 0 && !gamePaused) {
                    scheduleBallCreation();
                }
            }, 50);

            // Resume all falling balls
            activeBalls.forEach(ballData => {
                handleFallingBall(ballData); // Reapply falling logic
            });

            document.dispatchEvent(new Event('resumeGame')); // Dispatch resume event
        }
    }

    // Event listener for the "Play Again" button
    document.getElementById('playAgain').addEventListener('click', () => {
        location.reload(); // Refresh the page to reset the game
    });

// Function to handle the "Play Again" action
function handlePlayAgain() {
    location.reload(); // Refresh the page to reset the game
}

// Add event listeners for "Play Again" button
const playAgainButton = document.getElementById('playAgain');
if (playAgainButton) {
    playAgainButton.addEventListener('click', handlePlayAgain);
    playAgainButton.addEventListener('touchstart', handlePlayAgain, { passive: false });
}


    // Color palette event listeners
    document.getElementById('red').addEventListener('click', () => changeCatcherColor('red'));
    document.getElementById('green').addEventListener('click', () => changeCatcherColor('green'));
    document.getElementById('yellow').addEventListener('click', () => changeCatcherColor('yellow'));
    document.getElementById('blue').addEventListener('click', () => changeCatcherColor('blue'));
    document.getElementById('orange').addEventListener('click', () => changeCatcherColor('orange'));
    document.getElementById('purple').addEventListener('click', () => changeCatcherColor('purple'));

    // Event listener for the custom pause and resume events
    document.addEventListener('pauseGame', () => {
        toggleColorPalette(false); // Disable color palette
    });

    document.addEventListener('resumeGame', () => {
        toggleColorPalette(true); // Enable color palette
    });

    // Center the catcher on page load
    centerCatcher();

    // Initialize the lives display
    initializeLives();
});


function updateLivesDisplay() {
    livesContainer.innerHTML = ''; // Clear existing hearts
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('img');
        heart.src = 'images/heart.png'; // Path to your heart icon
        heart.alt = 'Heart';
        heart.className = 'heart-icon'; // Add class for styling
        livesContainer.appendChild(heart);
    }
}

const catcher = document.getElementById('catcher');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const pauseOverlay = document.getElementById('pauseOverlay');
const finalScoreDisplay = document.getElementById('finalScore');
const playAgainButton = document.getElementById('playAgain');
const resumeGameButton = document.getElementById('resumeGame');
const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
const colorImages = {
    red: 'images/catcher-red.png',
    green: 'images/catcher-green.png',
    blue: 'images/catcher-blue.png',
    yellow: 'images/catcher-yellow.png',
    orange: 'images/catcher-orange.png',
    purple: 'images/catcher-purple.png'
};
let score = 0;
let lives = 5;
let ballFallSpeed = 8;  // Initial falling speed of the balls
let ballDropInterval = 2000;  // Initial delay between creating new balls (in milliseconds)
const initialBallFallSpeed = 7; // Store initial ball speed
const initialBallDropInterval = 2000; // Store initial ball drop interval
const initialMaxBalls = 3; // Initial maximum number of falling balls
let ballCreationInterval; // Variable to store the interval ID
let activeBalls = []; // Array to keep track of active balls
let gamePaused = false;
let maxBalls = initialMaxBalls; // Number of balls currently allowed on the screen
let lastBallCreationTime = 0; // Time when the last ball was created
let moveLeft = false; // Flag to check if left movement is active
let moveRight = false; // Flag to check if right movement is active
let moveUp = false; // Flag to check if up movement is active
let moveDown = false; // Flag to check if down movement is active
let catcherSpeed = 10; // Speed of the catcher
let currentColorIndex = 0; // Start with the first color

// Define thresholds for each game mode
const gameModes = {
    chill: {
      speedThresholds: [
        { score: 2, speed: 5 },
        { score: 20, speed: 6 },
        { score: 30, speed: 6 },
        { score: 50, speed: 6 },
        { score: 60, speed: 7 },
        { score: 80, speed: 8 },
        { score: 90, speed: 8 },
        { score: 100, speed: 8 },
        { score: 120, speed: 9 }
      ],
      ballLimitThresholds: [
        { score: 2, maxBalls: 3 },
        { score: 5, maxBalls: 3 },
        { score: 10, maxBalls: 4 },
        { score: 20, maxBalls: 5 },
        { score: 30, maxBalls: 6 },
        { score: 50, maxBalls: 7 },
        { score: 70, maxBalls: 8 },
        { score: 90, maxBalls: 8 },
        { score: 120, maxBalls: 8 }
      ],
      ballDropIntervalThresholds: [
        { score: 2, interval: 2000 },
        { score: 5, interval: 2000 },
        { score: 10, interval: 2000 },
        { score: 20, interval: 1800 },
        { score: 30, interval: 1600 },
        { score: 50, interval: 1600 },
        { score: 70, interval: 1500 },
        { score: 90, interval: 1400 },
        { score: 120, interval: 1350 }
      ],
      defaultSpeed: 5, // Initial ball speed for chill mode
      defaultMaxBalls: 3, // Initial maximum number of balls for chill mode
      defaultInterval: 2000 // Initial ball drop interval for chill mode
    },
    normal: {
      speedThresholds: [
        { score: 2, speed: 9 },
        { score: 3, speed: 10 },
        { score: 5, speed: 10 },
        { score: 15, speed: 11 },
        { score: 20, speed: 12 },
        { score: 30, speed: 12 },
        { score: 50, speed: 12 },
        { score: 70, speed: 13 },
        { score: 90, speed: 14 },
        { score: 120, speed: 15 }
      ],
      ballLimitThresholds: [
        { score: 2, maxBalls: 5 },
        { score: 3, maxBalls: 5 },
        { score: 10, maxBalls: 6 },
        { score: 20, maxBalls: 7 },
        { score: 30, maxBalls: 7 },
        { score: 50, maxBalls: 7 },
        { score: 70, maxBalls: 7 },
        { score: 90, maxBalls: 7 },
        { score: 120, maxBalls: 8 }
      ],
      ballDropIntervalThresholds: [
        { score: 2, interval: 1500 },
        { score: 3, interval: 1500 },
        { score: 10, interval: 1400 },
        { score: 20, interval: 1400 },
        { score: 30, interval: 1400 },
        { score: 50, interval: 1300 },
        { score: 70, interval: 1200 },
        { score: 90, interval: 1150 },
        { score: 120, interval: 1100 }
      ],
      defaultSpeed: 9, // Initial ball speed for normal mode
      defaultMaxBalls: 5, // Initial maximum number of balls for normal mode
      defaultInterval: 1500 // Initial ball drop interval for normal mode
    },
    nutstronaut: {
      speedThresholds: [
        { score: 2, speed: 10 },
        { score: 3, speed: 10 },
        { score: 10, speed: 11 },
        { score: 15, speed: 12 },
        { score: 20, speed: 14 },
        { score: 30, speed: 16 },
        { score: 50, speed: 18 },
        { score: 70, speed: 20 },
        { score: 90, speed: 21 },
        { score: 120, speed: 21 }
      ],
      ballLimitThresholds: [
        { score: 2, maxBalls: 5 },
        { score: 5, maxBalls: 5 },
        { score: 10, maxBalls: 6 },
        { score: 20, maxBalls: 7 },
        { score: 30, maxBalls: 8 },
        { score: 50, maxBalls: 9 },
        { score: 70, maxBalls: 10 },
        { score: 90, maxBalls: 11 },
        { score: 120, maxBalls: 12 }
      ],
      ballDropIntervalThresholds: [
        { score: 2, interval: 1600 },
        { score: 5, interval: 1600 },
        { score: 10, interval: 1400 },
        { score: 20, interval: 1200 },
        { score: 30, interval: 1000 },
        { score: 50, interval: 900 },
        { score: 70, interval: 800 },
        { score: 90, interval: 700 },
        { score: 120, interval: 650 }
      ],
      defaultSpeed: 10, // Initial ball speed for nutstronaut mode
      defaultMaxBalls: 5, // Initial maximum number of balls for nutstronaut mode
      defaultInterval: 1600 // Initial ball drop interval for nutstronaut mode
    }
  };

// Variables for game settings
let currentModeSettings = null;
let countdownInterval = null;
let countdownTime = 3; // Countdown time in seconds
let gameStarted = false;

// Function to handle the difficulty setting
function handleDifficultySelection() {
    // Get the selected difficulty
    const selectedDifficulty = document.querySelector('input[name="gameMode"]:checked').value;

    // Apply difficulty settings
    if (gameModes[selectedDifficulty]) {
        const { speedThresholds, ballLimitThresholds, ballDropIntervalThresholds } = gameModes[selectedDifficulty];
        
        // Update global settings
        window.speedThresholds = speedThresholds;
        window.ballLimitThresholds = ballLimitThresholds;
        window.ballDropIntervalThresholds = ballDropIntervalThresholds;

        // Set current mode settings
        applyGameModeSettings(selectedDifficulty);

        // Optional: Log to confirm settings have been applied
        console.log('Difficulty settings applied:', gameModes[selectedDifficulty]);
    }
}

// Function to set the game mode settings based on user selection
function applyGameModeSettings(mode) {
    currentModeSettings = gameModes[mode];
}



// Attach event listener to the "Initiate Mission" button
document.getElementById('initiateMissionButton').addEventListener('click', function() {
    handleDifficultySelection();
   
});

// Function to apply the default settings immediately
function applyDefaultSettings() {
    if (!currentModeSettings) return;

    // Apply default settings
    ballFallSpeed = currentModeSettings.defaultSpeed;
    maxBalls = currentModeSettings.defaultMaxBalls;
    ballDropInterval = currentModeSettings.defaultInterval;

    // Optionally, log to confirm default settings have been applied
    console.log('Default settings applied:', {
        ballFallSpeed,
        maxBalls,
        ballDropInterval
    });
}

// Function to update the ball speed based on the player's score
function updateBallSpeed() {
    if (!currentModeSettings) return;

    let newSpeed = currentModeSettings.defaultSpeed; // Start with default speed
    for (let i = 0; i < currentModeSettings.speedThresholds.length; i++) {
        if (score >= currentModeSettings.speedThresholds[i].score) {
            newSpeed = currentModeSettings.speedThresholds[i].speed;
        }
    }
    ballFallSpeed = newSpeed;
}

// Function to update the maximum number of balls based on the player's score
function updateBallLimit() {
    if (!currentModeSettings) return;

    let newMaxBalls = currentModeSettings.defaultMaxBalls; // Start with default maxBalls
    for (let i = 0; i < currentModeSettings.ballLimitThresholds.length; i++) {
        if (score >= currentModeSettings.ballLimitThresholds[i].score) {
            newMaxBalls = currentModeSettings.ballLimitThresholds[i].maxBalls;
        }
    }
    maxBalls = newMaxBalls;
}

// Function to update the ball drop interval based on the player's score
function updateBallDropInterval() {
    if (!currentModeSettings) return;

    let newInterval = currentModeSettings.defaultInterval; // Start with default interval
    for (let i = 0; i < currentModeSettings.ballDropIntervalThresholds.length; i++) {
        if (score >= currentModeSettings.ballDropIntervalThresholds[i].score) {
            newInterval = currentModeSettings.ballDropIntervalThresholds[i].interval;
        }
    }
    ballDropInterval = newInterval;
}

// Attach event listener to the "Initiate Mission" button
document.getElementById('initiateMissionButton').addEventListener('click', function() {
    handleDifficultySelection();
    applyDefaultSettings(); // Apply default settings immediately
});

  
// Function to start dropping balls at the set interval
function startBallDrop() {
    if (!gameStarted) return;

    // Ensure balls are dropped according to the interval
    setInterval(() => {
        if (activeBalls.length < maxBalls) {
            createBall();
        }
    }, ballDropInterval);
}

// Function to create a new ball
function createBall() {
    const ball = document.createElement('div');
    ball.className = 'ball';

    // Get a random color and set it as the background color
    const color = getRandomColor();
    ball.dataset.color = color; // Store the color in a data attribute

    // Set visual color for blue balls to turquoise
    if (color === 'blue') {
        ball.style.backgroundColor = 'rgb(64, 224, 208)'; // Turquoise color
    } else {
        ball.style.backgroundColor = color; // Use the actual color
    }

    ball.style.top = '0px';

    // Set a minimum left position to avoid the far left edge and adjust max position to avoid far right edge
    const ballWidth = 20; // Assuming balls have a fixed width
    const minLeftPosition = 50; // Minimum left position to avoid the far left
    const maxLeftPosition = window.innerWidth - ballWidth - 50; // Adjust to avoid the far right edge

    // Ensure maxLeftPosition is not less than minLeftPosition
    const leftPosition = Math.max(minLeftPosition, minLeftPosition + Math.random() * (maxLeftPosition - minLeftPosition));

    ball.style.left = `${leftPosition}px`;

    document.getElementById('game').appendChild(ball);
    const ballData = { element: ball, top: 0, interval: null };
    activeBalls.push(ballData);
    handleFallingBall(ballData);
}


// Example function for getting a random color (you'll need to implement this)
function getRandomColor() {
    // Generate a random color or select from a predefined list
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Example function for handling a falling ball (you'll need to implement this)
function handleFallingBall(ballData) {
    // Implement ball falling behavior
    console.log('Handling falling ball', ballData);
}



// Function to get a random color from the predefined colors
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function handleFallingBall(ballData) {
    ballData.interval = setInterval(() => {
        if (lives <= 0 || gamePaused) {
            return;
        }

        let ballTop = parseFloat(ballData.element.style.top);
        const ballLeft = parseFloat(ballData.element.style.left);
        const ballRight = ballLeft + ballData.element.offsetWidth;
        const ballBottom = ballTop + ballData.element.offsetHeight;
        const catcherLeft = parseFloat(catcher.style.left);
        const catcherRight = catcherLeft + catcher.offsetWidth;
        const catcherTop = parseFloat(catcher.style.top);
        const catcherBottom = catcherTop + catcher.offsetHeight;
        const catcherImage = document.querySelector('#catcher img').src;
        const ballColor = ballData.element.dataset.color; // Get the logical color from dataset
        const threshold = -12; // Margin in pixels to trigger catch early

        let catcherColor = '';
        for (const [color, imgSrc] of Object.entries(colorImages)) {
            if (catcherImage.includes(imgSrc)) {
                catcherColor = color;
                break;
            }
        }

        if (ballBottom >= (catcherTop - threshold) && ballTop <= (catcherBottom + threshold) &&
            ballRight > catcherLeft && ballLeft < catcherRight) {

            if (!ballData.processed) {
                ballData.processed = true; // Mark as processed

                if (autoColorEnabled) {
                    // Auto color mode: All catches are correct
                    score += 1;
                    scoreDisplay.textContent = `Score: ${score}`;
                    updateBallSpeed(); // Update speed based on new score
                    updateBallLimit(); // Update max balls based on new score
                    updateBallDropInterval(); // Update ball drop interval based on new score
                    playSoundEffect('success'); // Play success sound

                    // Change catcher color to match the ball color
                    for (const [color, imgSrc] of Object.entries(colorImages)) {
                        if (ballColor === color) {
                            catcher.querySelector('img').src = imgSrc;
                            break;
                        }
                    }
                } else {
                    // Non auto color mode: Check if ball color matches catcher color
                    if (ballColor === catcherColor) {
                        // Correct color catch
                        score += 1;
                        scoreDisplay.textContent = `Score: ${score}`;
                        updateBallSpeed(); // Update speed based on new score
                        updateBallLimit(); // Update max balls based on new score
                        updateBallDropInterval(); // Update ball drop interval based on new score
                        playSoundEffect('success'); // Play success sound
                    } else {
                        // Wrong color catch
                        lives -= 1;
                        if (lives <= 0) {
                            playSoundEffect('gameover'); // Play game over sound
                            endGame();
                        } else {
                            playSoundEffect('fail'); // Play fail sound
                        }
                        updateLivesDisplay(); // Update lives display when a life is lost
                    }
                }

                ballData.element.classList.add('ball-catch');
                setTimeout(() => {
                    document.getElementById('game').removeChild(ballData.element);
                    activeBalls = activeBalls.filter(b => b.element !== ballData.element);
                    clearInterval(ballData.interval);
                }, 500); // Duration matches the animation length
            }

        } else if (ballTop > window.innerHeight - 40) {
            if (!ballData.processed) {
                ballData.processed = true; // Mark as processed

                // Missed catch (ball reached bottom)
                lives -= 1;
                if (lives <= 0) {
                    playSoundEffect('gameover'); // Play game over sound
                    endGame();
                } else {
                    playSoundEffect('fail'); // Play fail sound
                }
                updateLivesDisplay(); // Update lives display when a life is lost

                document.getElementById('game').removeChild(ballData.element);
                activeBalls = activeBalls.filter(b => b.element !== ballData.element);
                clearInterval(ballData.interval);
            }
        } else {
            ballTop += ballFallSpeed;
            ballData.element.style.top = `${ballTop}px`;
            ballData.top = ballTop; // Update ballData with the new position
        }
    }, 50);
}




// Function to create balls with a controlled delay
function scheduleBallCreation() {
    let currentTime = Date.now();
    if (currentTime - lastBallCreationTime >= ballDropInterval) {
        if (activeBalls.length < maxBalls) {
            createBall();
            lastBallCreationTime = currentTime;
        }
    }
}

// Flag to check if the first ball has been created



// Function to start the game
function startGame() {
    // Initialize the last ball creation time
    lastBallCreationTime = Date.now();

    // Create the first ball immediately if it hasn't been created
    if (!firstBallCreated) {
        createBall();
        firstBallCreated = true; // Set the flag to true after creating the first ball
    }

    // Create new balls at controlled intervals
    ballCreationInterval = setInterval(() => {
        if (lives > 0 && !gamePaused) {
            scheduleBallCreation();
        }
    }, 50); // Check every 50ms if a ball can be created


    // Existing code to handle mouse movement
    document.addEventListener('mousemove', (event) => {
        if (lives > 0 && !gamePaused) {
            const catcher = document.querySelector('#catcher');
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const catcherWidth = catcher.offsetWidth;
            const catcherHeight = catcher.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
    
            let newLeft = mouseX - (catcherWidth / 2);
            newLeft = Math.max(0, Math.min(windowWidth - catcherWidth, newLeft));
    
            if (verticalMovementDisabled) {
                // Only update horizontal position
                catcher.style.left = `${newLeft}px`;
                // Maintain current vertical position
            } else {
                let newTop = mouseY - (catcherHeight / 2);
                newTop = Math.max(0, Math.min(windowHeight - catcherHeight, newTop));
                catcher.style.left = `${newLeft}px`;
                catcher.style.top = `${newTop}px`;
            }
        }
    });

    let currentColorIndex = 0;

   
let initialCatcherTop = parseFloat(catcher.style.top) || 0;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;


function updateCatcherPosition() {
    const catcher = document.querySelector('#catcher');
    const catcherWidth = catcher.offsetWidth;
    const catcherHeight = catcher.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get the current position of the catcher
    let currentLeft = parseFloat(window.getComputedStyle(catcher).left) || 0;
    let currentTop = parseFloat(window.getComputedStyle(catcher).top) || 0;

    // Update position based on movement flags
    if (moveLeft) {
        currentLeft -= 5; // Adjust step size as needed
    }
    if (moveRight) {
        currentLeft += 5; // Adjust step size as needed
    }
    if (!verticalMovementDisabled) {
        if (moveUp) {
            currentTop -= 5; // Adjust step size as needed
        }
        if (moveDown) {
            currentTop += 5; // Adjust step size as needed
        }
    }

    // Bound the catcher within the window
    currentLeft = Math.max(0, Math.min(windowWidth - catcherWidth, currentLeft));
    if (!verticalMovementDisabled) {
        currentTop = Math.max(0, Math.min(windowHeight - catcherHeight, currentTop));
    } else {
        currentTop = Math.max(windowHeight - catcherHeight, currentTop); // Ensure it stays at the bottom when vertical is disabled
    }

    // Apply updated position
    catcher.style.left = `${currentLeft}px`;
    catcher.style.top = `${currentTop}px`;
}

// Update position on animation frame
function animate() {
    updateCatcherPosition();
    requestAnimationFrame(animate);
}

animate();

// Update the catcher position based on keyboard inputs
document.addEventListener('keydown', (event) => {
    if (lives > 0 && !gamePaused && !gameOver) { // Check if the game is not paused and not over
        const catcherImage = document.querySelector('#catcher img');
        switch (event.key) {
            // Color binding cases
            case 'r':
            case '1':
                catcherImage.src = colorImages.red;
                currentColorIndex = colors.indexOf('red');
                break;
            case 'g':
            case '2':
                catcherImage.src = colorImages.green;
                currentColorIndex = colors.indexOf('green');
                break;
            case 'b':
            case '3':
                catcherImage.src = colorImages.blue;
                currentColorIndex = colors.indexOf('blue');
                break;
            case 'y':
            case '4':
                catcherImage.src = colorImages.yellow;
                currentColorIndex = colors.indexOf('yellow');
                break;
            case 'p':
            case '6':
                catcherImage.src = colorImages.purple;
                currentColorIndex = colors.indexOf('purple');
                break;
            case 'o':
            case '5':
                catcherImage.src = colorImages.orange;
                currentColorIndex = colors.indexOf('orange');
                break;
            case ' ':
                currentColorIndex = (currentColorIndex + 1) % colors.length;
                catcherImage.src = colorImages[colors[currentColorIndex]];
                break;
            // Movement cases
            case 'a':
                moveLeft = true;
                break;
            case 'd':
                moveRight = true;
                break;
            case 'w':
                if (!verticalMovementDisabled) {
                    moveUp = true;
                }
                break;
            case 's':
                if (!verticalMovementDisabled) {
                    moveDown = true;
                }
                break;
            // Toggle vertical movement and move catcher to the bottom
            case 'h':
                if (verticalMovementDisabled) {
                    // Re-enable vertical movement
                    verticalMovementDisabled = false;
                    console.log('Vertical movement enabled');
                } else {
                    // Disable vertical movement and move catcher to the bottom
                    verticalMovementDisabled = true;
                    const catcher = document.querySelector('#catcher');
                    const catcherBottom = window.innerHeight - catcher.offsetHeight;
                    catcher.style.top = `${catcherBottom}px`;
                    moveUp = false; // Ensure vertical movement stops
                    moveDown = false;
                    console.log('Vertical movement disabled');
                }
                break;
        }
    }
});

// Stop movement on key release
document.addEventListener('keyup', (event) => {
    if (lives > 0 && !gamePaused && !gameOver) { // Check if the game is not paused and not over
        switch (event.key) {
            case 'a':
                moveLeft = false;
                break;
            case 'd':
                moveRight = false;
                break;
            case 'w':
                moveUp = false;
                break;
            case 's':
                moveDown = false;
                break;
        }
    }
});

  
  
}

    // Detect when the tab is hidden or visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseGame();
        }
    });

    // Smooth movement of the catcher
    requestAnimationFrame(updateCatcherPosition);


// Function to update the catcher's position smoothly
function updateCatcherPosition() {
    const catcherWidth = catcher.offsetWidth;
    const windowWidth = window.innerWidth;
    const catcherHeight = catcher.offsetHeight;
    const catcherLeft = parseFloat(catcher.style.left) || 0;
    const catcherTop = parseFloat(catcher.style.top) || 0;

    if (moveLeft) {
        // Move left, but ensure the catcher doesn't go out of bounds
        catcher.style.left = `${Math.max(catcherLeft - catcherSpeed, 0)}px`;
    }
    if (moveRight) {
        // Move right, but ensure the catcher doesn't go out of bounds
        catcher.style.left = `${Math.min(catcherLeft + catcherSpeed, windowWidth - catcherWidth)}px`;
    }
    if (!verticalMovementDisabled) { // Check if vertical movement is enabled
        if (moveUp) {
            // Move up, but ensure the catcher doesn't go out of bounds
            catcher.style.top = `${Math.max(catcherTop - catcherSpeed, 0)}px`;
        }
        if (moveDown) {
            // Move down, but ensure the catcher doesn't go out of bounds
            catcher.style.top = `${Math.min(catcherTop + catcherSpeed, window.innerHeight - catcherHeight)}px`;
        }
    }
    
    if (!gamePaused && lives > 0) {
        requestAnimationFrame(updateCatcherPosition);
    }
}


// Helper function to get a random color
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to end the game
// Global variables to keep track of the music functions
let playMusic, pauseMusic;




// Function to end the game
// Global variable to store settings
let gameSettings = {
    mode: 'normal', // Default value
    autoColor: false // Default value
};

function endGame() {
    // Stop creating new balls
    clearInterval(ballCreationInterval);

    // Stop all falling balls
    activeBalls.forEach(ballData => {
        clearInterval(ballData.interval); // Stop the ball movement interval
    });

    // Freeze the catcher in the middle of the screen
    catcher.style.left = `${(window.innerWidth - 100) / 2}px`;

    // Mute the music
    if (pauseMusic) {
        pauseMusic();
    }

    // Show the game over screen
    finalScoreDisplay.textContent = score;
    document.getElementById('gameMode').textContent = gameSettings.mode;
    document.getElementById('autoColorStatus').textContent = gameSettings.autoColor ? 'On' : 'Off';
    gameOverScreen.style.display = 'block';
}

// Function to restart the game
function restartGame() {
    window.location.reload();
}
// Existing pause and resume functions
function pauseGame() {
    if (!gamePaused && gameOverScreen.style.display !== 'block') {
        gamePaused = true;
        clearInterval(ballCreationInterval);
        activeBalls.forEach(ballData => {
            clearInterval(ballData.interval); // Stop all falling balls
        });
        pauseOverlay.style.display = 'block'; // Show the pause overlay
        document.dispatchEvent(new Event('pauseGame')); // Dispatch pause event
    }
}

// Function to resume the game
function resumeGame() {
    console.log('Resuming game');
    if (gamePaused) {
        gamePaused = false;
        pauseOverlay.style.display = 'none'; // Hide the pause overlay

        // Clear any existing ball creation interval
        clearInterval(ballCreationInterval);

        // Restart ball creation
        ballCreationInterval = setInterval(() => {
            if (lives > 0 && !gamePaused) {
                scheduleBallCreation();
            }
        }, 50);

        // Resume all falling balls
        activeBalls.forEach(ballData => {
            handleFallingBall(ballData); // Reapply falling logic
        });

        document.dispatchEvent(new Event('resumeGame')); // Dispatch resume event
    }
}

// Add event listeners for both click and touchstart events
resumeGameButton.addEventListener('click', resumeGame);
resumeGameButton.addEventListener('touchstart', resumeGame, { passive: false });


// Function to prevent catcher movement on touch within specified elements
function preventCatcherMovementOnTouch(element) {
    element.addEventListener('touchstart', (event) => {
        event.stopPropagation(); // Prevent touch event from propagating to catcher movement
    }, { passive: false });

    element.addEventListener('touchmove', (event) => {
        event.stopPropagation(); // Prevent touch event from propagating to catcher movement
    }, { passive: false });
}

// Add event listeners for "Resume" button
const resumeButton = document.getElementById('resume');
if (resumeButton) {
    resumeButton.addEventListener('click', (event) => {
        event.preventDefault();
        resumeGame();
    });

    resumeButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        resumeGame();
    }, { passive: false });

    preventCatcherMovementOnTouch(resumeButton);
}

// Function to enable or disable the color palette click events
function toggleColorPalette(enabled) {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    colors.forEach(color => {
        const element = document.getElementById(color);
        if (element) {
            element.style.pointerEvents = enabled ? 'auto' : 'none';
            if (enabled) {
                element.addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    event.stopPropagation(); // Prevent catcher from moving
                    catcherImage.src = colorImages[color];
                    currentColorIndex = colors.indexOf(color);
                }, { passive: false });
            }
        }
    });
}

// Prevent catcher movement on color palette touch
const colorPaletteElements = document.querySelectorAll('#color-palette div');
colorPaletteElements.forEach(element => {
    preventCatcherMovementOnTouch(element);
});

// Event listener for the "Play Again" button
document.getElementById('playAgain').addEventListener('click', (event) => {
    event.preventDefault();
    location.reload(); // Refresh the page to reset the game
});

document.getElementById('playAgain').addEventListener('touchstart', (event) => {
    event.preventDefault();
    location.reload(); // Refresh the page to reset the game
}, { passive: false });

preventCatcherMovementOnTouch(document.getElementById('playAgain'));


// New event listener for the Escape key to toggle pause/resume
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (gamePaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    }
});





// Event listener for the "Play Again" button
playAgainButton.addEventListener('click', restartGame);



// Event listener for the "Resume" button
resumeGameButton.addEventListener('click', resumeGame);

let isTouching = false; // Flag to track touch state


// Variables to manage touch state
// Define global flags for game states
let gameOver = false;   // Update this based on your game state management

let touchStartX = 0;
let touchStartY = 0;


function handleTouchStart(event) {
    event.preventDefault(); // Prevent default touch behavior

    // Exit if the game is paused or in the game over state
    if (gamePaused || gameOver) {
        return;
    }

    isTouching = true;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!isTouching) return;

    // Exit if the game is paused or in the game over state
    if (gamePaused || gameOver) {
        isTouching = false; // Ensure to reset touch state
        return;
    }

    event.preventDefault(); // Prevent default touch behavior

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const catcher = document.querySelector('#catcher');
    const catcherWidth = catcher.offsetWidth;
    const catcherHeight = catcher.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate new position
    let newLeft = Math.max(0, Math.min(touchX - catcherWidth / 2, windowWidth - catcherWidth));
    let newTop = Math.max(0, Math.min(touchY - catcherHeight / 2, windowHeight - catcherHeight));

    catcher.style.left = `${newLeft}px`;
    catcher.style.top = `${newTop}px`;
}

function handleTouchEnd() {
    isTouching = false;
}

// Add event listeners for touch events
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });






const powerUps = [
    { type: '1UP', text: '1UP', effect: 'extraLife', cssClass: 'powerup-1up', sound: 'audio/1up.mp3' },
    { type: 'PLUS_PLUS', text: '', effect: 'growCatcher', cssClass: 'powerup-plusplus', sound: 'audio/plusplus.mp3' },
    { type: 'MAGNET', text: '', effect: 'magnet', cssClass: 'powerup-magnet', sound: 'audio/magnet.mp3' },
    { type: 'MEGA_BALL', text: '', effect: 'megaBall', cssClass: 'powerup-megaball', sound: 'audio/megaball.mp3' } // Added Mega Ball power-up
];

let activePowerUps = {};

function getRandomPowerUp() {
    const availablePowerUps = powerUps.filter(pu => !activePowerUps[pu.effect]);
    return availablePowerUps[Math.floor(Math.random() * availablePowerUps.length)];
}

function isTooClose(newElement, type) {
    const newRect = newElement.getBoundingClientRect();
    const elements = document.querySelectorAll(`.${type}`);

    for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(newRect.left - rect.left);
        const combinedWidth = (newRect.width + rect.width) / 2;

        if (distance < combinedWidth + 90) { // Minimum distance of 90 pixels between the edges
            return true; // Too close
        }
    }
    return false; // Fair distance
}

function createPowerUp() {
    // Check if growCatcher or shrinkCatcher is active or falling
    const isGrowCatcherActiveOrFalling = growCatcherActive || document.querySelector('.powerup[data-effect="growCatcher"]');
    const isShrinkCatcherActiveOrFalling = shrinkCatcherActive || document.querySelector('.powerdown[data-effect="shrinkCatcher"]');

    const availablePowerUps = powerUps.filter(pu => 
        !(pu.effect === 'growCatcher' && isShrinkCatcherActiveOrFalling) &&
        !(pu.effect === 'shrinkCatcher' && isGrowCatcherActiveOrFalling)
    );

    if (availablePowerUps.length === 0) {
        return; // No available power-ups to create
    }

    const powerUp = document.createElement('div');
    const powerUpData = availablePowerUps[Math.floor(Math.random() * availablePowerUps.length)];
    powerUp.className = `powerup ${powerUpData.cssClass}`;
    powerUp.textContent = powerUpData.text;
    powerUp.dataset.effect = powerUpData.effect;
    powerUp.style.top = '0px';

    const powerUpWidth = 40; // Fixed width
    const minLeftPosition = 50;
    const maxLeftPosition = window.innerWidth - powerUpWidth - minLeftPosition;
    let position;

    do {
        position = minLeftPosition + Math.random() * maxLeftPosition;
        powerUp.style.left = `${position}px`;
    } while (isTooClose(powerUp, 'powerdown')); // Check distance to power-downs

    document.getElementById('game').appendChild(powerUp);
    const powerUpElement = { element: powerUp, top: 0, interval: null };
    handleFallingPowerUp(powerUpElement);
}


function handleFallingPowerUp(powerUpData) {
    powerUpData.interval = setInterval(() => {
        if (lives <= 0) {
            clearInterval(powerUpData.interval);
            return;
        }

        if (gamePaused) {
            // If game is paused, do not update the position
            return;
        }

        let powerUpTop = parseFloat(powerUpData.element.style.top);
        const powerUpLeft = parseFloat(powerUpData.element.style.left);
        const powerUpRight = powerUpLeft + powerUpData.element.offsetWidth;
        const powerUpBottom = powerUpTop + powerUpData.element.offsetHeight;
        const catcherLeft = parseFloat(catcher.style.left);
        const catcherRight = catcherLeft + catcher.offsetWidth;
        const catcherTop = parseFloat(catcher.style.top);
        const catcherBottom = catcherTop + catcher.offsetHeight;

        if (powerUpBottom >= catcherTop && powerUpTop <= catcherBottom &&
            powerUpRight > catcherLeft && powerUpLeft < catcherRight) {
            activatePowerUp(powerUpData.element.dataset.effect);
            document.getElementById('game').removeChild(powerUpData.element);
            clearInterval(powerUpData.interval);
        } else if (powerUpTop > window.innerHeight - 40) {
            document.getElementById('game').removeChild(powerUpData.element);
            clearInterval(powerUpData.interval);
        } else {
            powerUpTop += ballFallSpeed + 5; // Make power-ups fall faster
            powerUpData.element.style.top = `${powerUpTop}px`;
        }
    }, 50);
}

function activatePowerUp(effect) {
    // Find the power-up data to get the associated sound
    const powerUpData = powerUps.find(pu => pu.effect === effect);
    if (powerUpData) {
        // Play the corresponding sound effect
        const audio = new Audio(powerUpData.sound);
        audio.play();
    }

    if (effect === 'extraLife') {
        lives += 1;
        updateLivesDisplay(); // Update the visual display of lives
    } else if (effect === 'growCatcher') {
        applyGrowCatcher();
    } else if (effect === 'magnet') {
        activateMagnet();
    } else if (effect === 'megaBall') {
        applyMegaBallEffect(); // Apply the Mega Ball effect
    }
}

let growCount = 0;
let magnetActive = false;
let megaBallActive = false;
let megaBallEndTime = 0;
let growCatcherPauseTime = 0;
let growCatcherInterval = null;
const growCatcherDuration = 20000; // 20 seconds
let growCatcherActive = false;
let growCatcherEndTime = 0;

let growCatcherPauseDuration = 0;
let growCatcherPauseEndTime = 0; // Store end time after pausing

function applyGrowCatcher() {
    if (growCatcherActive) return; // Prevent multiple activations

    growCatcherActive = true;
    const originalWidth = catcher.offsetWidth;
    growCatcherEndTime = Date.now() + growCatcherDuration; // 20 seconds from now

    // Increase catcher size
    catcher.style.width = `${originalWidth * 1.5}px`;

    // Function to handle size reversion
    const handleSizeReversion = () => {
        if (!gamePaused) {
            if (Date.now() >= growCatcherEndTime) {
                catcher.style.width = `${originalWidth}px`;
                growCatcherActive = false;
                clearInterval(growCatcherInterval);
                delete activePowerUps['growCatcher'];
            }
        }
    };

    // Start the interval timer to handle size reversion
    growCatcherInterval = setInterval(handleSizeReversion, 50);

    // Pause event handler
    document.addEventListener('pauseGame', () => {
        if (growCatcherActive) {
            growCatcherPauseTime = Date.now();
            clearInterval(growCatcherInterval); // Stop the interval
        }
    });

    // Resume event handler
    document.addEventListener('resumeGame', () => {
        if (growCatcherActive) {
            const pausedDuration = Date.now() - growCatcherPauseTime;
            growCatcherEndTime += pausedDuration; // Adjust end time based on pause duration
            growCatcherInterval = setInterval(handleSizeReversion, 50); // Restart the interval
        }
    });

    // Mark the power-up as active
    activePowerUps['growCatcher'] = true;
}


let megaBallPauseTime = 0;
let megaBallInterval = null;

function applyMegaBallEffect() {
    // If a teeny ball effect is active, cancel it
    if (teenyBallActive) {
        clearInterval(teenyBallCheckInterval);
        const balls = document.querySelectorAll('.ball');
        balls.forEach(ball => {
            const originalSize = ball.dataset.originalSize || 1; // Use stored size or default to 1
            ball.style.transform = `scale(${originalSize})`;
        });
        teenyBallActive = false;
        delete activePowerUps['teenyBall'];
    }

    if (megaBallActive) return; // Prevent multiple activations

    // Set the effect as active
    megaBallActive = true;
    megaBallEndTime = Date.now() + 20000; // 20 seconds from now

    // Apply the effect to existing balls
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        const originalSize = ball.style.transform ? parseFloat(ball.style.transform.replace('scale(', '').replace(')', '')) : 1;
        ball.dataset.originalSize = originalSize; // Store original size in a data attribute
        ball.style.transform = 'scale(1.5)'; // Increase size to 1.5
    });

    // Function to handle effect reversion
    const handleMegaBallEffect = () => {
        if (!gamePaused) {
            if (Date.now() >= megaBallEndTime) {
                clearInterval(megaBallInterval);
                // Revert effect on all balls
                const balls = document.querySelectorAll('.ball');
                balls.forEach(ball => {
                    const originalSize = ball.dataset.originalSize || 1; // Use stored size or default to 1
                    ball.style.transform = `scale(${originalSize})`;
                });
                megaBallActive = false;
                delete activePowerUps['megaBall'];
            } else {
                // Apply effect to new balls
                const balls = document.querySelectorAll('.ball');
                balls.forEach(ball => {
                    if (!ball.dataset.originalSize) {
                        const originalSize = ball.style.transform ? parseFloat(ball.style.transform.replace('scale(', '').replace(')', '')) : 1;
                        ball.dataset.originalSize = originalSize;
                        ball.style.transform = 'scale(1.5)';
                    }
                });
            }
        }
    };

    // Start the interval timer to handle effect reversion
    megaBallInterval = setInterval(handleMegaBallEffect, 100);

    // Pause event handler
    document.addEventListener('pauseGame', () => {
        if (megaBallActive) {
            megaBallPauseTime = Date.now();
            clearInterval(megaBallInterval); // Stop the interval
        }
    });

    // Resume event handler
    document.addEventListener('resumeGame', () => {
        if (megaBallActive) {
            const pausedDuration = Date.now() - megaBallPauseTime;
            megaBallEndTime += pausedDuration; // Adjust end time based on pause duration
            megaBallInterval = setInterval(handleMegaBallEffect, 100); // Restart the interval
        }
    });

    // Mark the power-up as active
    activePowerUps['megaBall'] = true;
}


function activateMagnet() {
    if (magnetActive) return; // Prevent multiple activations

    magnetActive = true;
    const magnetDuration = 15000; // Magnet lasts for 15 seconds
    const magnetRadius = 200; // Radius within which the magnet attracts

    // Set end time for the magnet effect
    magnetEndTime = Date.now() + magnetDuration;

    // Add the magnet-active class to the catcher
    catcher.classList.add('magnet-active');

    const magnetEffect = () => {
        if (gamePaused) return; // Skip effect processing if the game is paused

        const balls = document.querySelectorAll('.ball'); // Get all ball elements
        const catcherColor = getCatcherColorFromImage(); // Get the catcher's color based on image
        const autoColorEnabled = document.getElementById('autoColor').checked; // Check if auto color mode is enabled

        balls.forEach(ball => {
            const ballColor = ball.dataset.color; // Get the ball's color from data attribute

            if (autoColorEnabled || ballColor === catcherColor) { // Adjust condition based on auto color mode
                const ballRect = ball.getBoundingClientRect();
                const catcherRect = catcher.getBoundingClientRect();

                const distance = Math.sqrt(
                    Math.pow(catcherRect.left + catcherRect.width / 2 - (ballRect.left + ballRect.width / 2), 2) +
                    Math.pow(catcherRect.top + catcherRect.height / 2 - (ballRect.top + ballRect.height / 2), 2)
                );

                if (distance < magnetRadius) { // If the ball is within the magnet's range
                    const targetX = catcherRect.left + (catcherRect.width - ballRect.width) / 2;
                    const targetY = catcherRect.top + (catcherRect.height - ballRect.height) / 2;

                    // Smoothly move the ball towards the catcher
                    ball.style.transition = 'left 0.1s linear, top 0.1s linear';
                    ball.style.position = 'absolute'; // Ensure ball is positioned absolutely
                    ball.style.left = `${targetX}px`;
                    ball.style.top = `${targetY}px`;
                }
            }
        });
    };

    const startMagnetInterval = () => {
        magnetInterval = setInterval(magnetEffect, 50);
    };

    const stopMagnetInterval = () => {
        clearInterval(magnetInterval);
    };

    const endMagnetEffect = () => {
        magnetActive = false;
        stopMagnetInterval();
        catcher.classList.remove('magnet-active');
        delete activePowerUps['magnet'];
    };

    // Start the magnet effect interval
    startMagnetInterval();

    // Set a timeout to remove the effect after the duration
    const timeoutId = setTimeout(endMagnetEffect, magnetEndTime - Date.now());

    // Handle pause and resume
    function handlePause() {
        if (magnetActive) {
            magnetPauseTime = Date.now(); // Record the pause time
            stopMagnetInterval(); // Stop the effect interval
            clearTimeout(timeoutId); // Clear the timeout
        }
    }

    function handleResume() {
        if (magnetActive) {
            const currentTime = Date.now();
            const elapsedPauseTime = currentTime - magnetPauseTime; // Calculate pause duration
            magnetEndTime += elapsedPauseTime; // Adjust end time by adding the pause duration

            // Restart the effect interval
            startMagnetInterval();

            // Restart the timeout with the updated end time
            clearTimeout(timeoutId);
            setTimeout(endMagnetEffect, magnetEndTime - currentTime);
        }
    }

    // Event listeners for pause and resume
    document.addEventListener('pauseGame', handlePause);
    document.addEventListener('resumeGame', handleResume);

    // Mark the power-up as active
    activePowerUps['magnet'] = true;
}


// Helper function to get the catcher's color from the image URL
function getCatcherColorFromImage() {
    const catcherImg = document.querySelector('#catcher img');
    const src = catcherImg ? catcherImg.src : '';

    // Match the image source with the colorImages object
    for (const [color, imageUrl] of Object.entries(colorImages)) {
        if (src.endsWith(imageUrl)) {
            return color; // Return the color name if a match is found
        }
    }
    return ''; // Return an empty string if no match is found
}

// // Event listener to test Mega Ball power-up with 'n' key
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'n' || event.key === 'N') {
//         spawnMegaBallPowerUp(); // Force spawn Mega Ball power-up for testing
//     }
// });

// // Event listener to test Magnet power-up with 'm' key
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'm') {
//         activateMagnet(); // Call the activateMagnet function when "m" is pressed
//     }
// });

// Function to spawn Mega Ball power-up for testing
// function spawnMegaBallPowerUp() {
//     const megaBallPowerUp = document.createElement('div');
//     megaBallPowerUp.className = `powerup powerup-megaball`;
//     megaBallPowerUp.textContent = '';
//     megaBallPowerUp.dataset.effect = 'megaBall';
//     megaBallPowerUp.style.top = '0px';

//     const powerUpWidth = 40; // Fixed width
//     const minLeftPosition = 50;
//     const maxLeftPosition = window.innerWidth - powerUpWidth - minLeftPosition;
//     let position;

//     do {
//         position = minLeftPosition + Math.random() * maxLeftPosition;
//         megaBallPowerUp.style.left = `${position}px`;
//     } while (isTooClose(megaBallPowerUp, 'powerdown')); // Check distance to power-downs

//     document.getElementById('game').appendChild(megaBallPowerUp);
//     const powerUpElement = { element: megaBallPowerUp, top: 0, interval: null };
//     handleFallingPowerUp(powerUpElement);
// }

function schedulePowerUpCreation() {
    setInterval(() => {
        if (lives > 0 && !gamePaused) {
            createPowerUp();
        }
    }, 15000); // Power-ups created every 15 seconds
}


const powerDowns = [
    { type: 'MINUS_ONE', text: ' ', effect: 'negativeLife', cssClass: 'powerdown-minusone', sound: 'audio/minusone.mp3' },
    { type: 'MINUS_MINUS', text: ' ', effect: 'shrinkCatcher', cssClass: 'powerdown-minusminus', sound: 'audio/minusminus.mp3' },
    { type: 'VIRUS', text: ' ', effect: 'virus', cssClass: 'powerdown-virus', sound: 'audio/virus.mp3' }, // Added Virus power-down
    { type: 'TEENY_BALL', text: ' ', effect: 'teenyBall', cssClass: 'powerdown-teenyball', sound: 'audio/teenyball.mp3' } // Added Teeny Ball power-down
];

let activePowerDowns = new Set(); // Track active power-down effects

function createPowerDown() {
    // Check if growCatcher or shrinkCatcher is active or falling
    const isGrowCatcherActiveOrFalling = growCatcherActive || document.querySelector('.powerup[data-effect="growCatcher"]');
    const isShrinkCatcherActiveOrFalling = shrinkCatcherActive || document.querySelector('.powerdown[data-effect="shrinkCatcher"]');

    const availablePowerDowns = powerDowns.filter(pd => 
        !(pd.effect === 'shrinkCatcher' && isGrowCatcherActiveOrFalling) &&
        !(pd.effect === 'growCatcher' && isShrinkCatcherActiveOrFalling)
    );

    if (availablePowerDowns.length === 0) {
        return; // No available power-downs to create
    }

    const powerDown = document.createElement('div');
    const powerDownData = availablePowerDowns[Math.floor(Math.random() * availablePowerDowns.length)];
    powerDown.className = `powerdown ${powerDownData.cssClass}`;
    powerDown.textContent = powerDownData.text;
    powerDown.dataset.effect = powerDownData.effect;
    powerDown.style.top = '0px';

    const powerDownWidth = 40; // Fixed width
    const minLeftPosition = 50;
    const maxLeftPosition = window.innerWidth - powerDownWidth - minLeftPosition;
    let position;

    do {
        position = minLeftPosition + Math.random() * maxLeftPosition;
        powerDown.style.left = `${position}px`;
    } while (isTooClose(powerDown, 'powerup')); // Check distance to power-ups

    document.getElementById('game').appendChild(powerDown);
    const powerDownElement = { element: powerDown, top: 0, interval: null };
    handleFallingPowerDown(powerDownElement);
}


function getRandomPowerDown() {
    return powerDowns[Math.floor(Math.random() * powerDowns.length)];
}

function handleFallingPowerDown(powerDownData) {
    powerDownData.interval = setInterval(() => {
        if (lives <= 0) {
            clearInterval(powerDownData.interval);
            return;
        }

        if (gamePaused) {
            // If game is paused, do not update the position
            return;
        }

        let powerDownTop = parseFloat(powerDownData.element.style.top);
        const powerDownLeft = parseFloat(powerDownData.element.style.left);
        const powerDownRight = powerDownLeft + powerDownData.element.offsetWidth;
        const powerDownBottom = powerDownTop + powerDownData.element.offsetHeight;
        const catcherLeft = parseFloat(catcher.style.left);
        const catcherRight = catcherLeft + catcher.offsetWidth;
        const catcherTop = parseFloat(catcher.style.top);
        const catcherBottom = catcherTop + catcher.offsetHeight;

        if (powerDownBottom >= catcherTop && powerDownTop <= catcherBottom &&
            powerDownRight > catcherLeft && powerDownLeft < catcherRight) {

            // Activate the effect of the power-down
            activatePowerDown(powerDownData.element.dataset.effect);

            // Remove power-down and stop its interval
            document.getElementById('game').removeChild(powerDownData.element);
            clearInterval(powerDownData.interval);
            activePowerDowns.delete(powerDownData.element.dataset.effect); // Mark power-down as inactive

        } else if (powerDownTop > window.innerHeight) {
            // Cleanup if the power-down goes out of view
            if (document.getElementById('game').contains(powerDownData.element)) {
                document.getElementById('game').removeChild(powerDownData.element);
            }
            clearInterval(powerDownData.interval);
            activePowerDowns.delete(powerDownData.element.dataset.effect); // Mark power-down as inactive
        } else {
            powerDownTop += ballFallSpeed + 5; // Make power-downs fall faster
            powerDownData.element.style.top = `${powerDownTop}px`;
        }
    }, 50);
}

function activatePowerDown(effect) {
    // Find the power-down data to get the associated sound
    const powerDownData = powerDowns.find(pd => pd.effect === effect);
    if (powerDownData) {
        // Play the corresponding sound effect
        const audio = new Audio(powerDownData.sound);
        audio.play();
    }

    if (effect === 'negativeLife') {
        lives -= 1;
        updateLivesDisplay(); // Update the visual display of lives

        if (lives <= 0) {
            endGame();
        }
    } else if (effect === 'shrinkCatcher') {
        shrinkCatcher();
    } else if (effect === 'virus') {
        applyVirusEffects(); // Apply the visual glitch effect
    } else if (effect === 'teenyBall') {
        applyTeenyBallEffect(); // Apply the teeny ball effect
    }
}


let shrinkCatcherActive = false;
let shrinkCatcherEndTime = 0;
let shrinkCatcherPauseTime = 0;
let shrinkCatcherTimeout = null;

function shrinkCatcher() {
    if (shrinkCatcherActive) return; // Prevent multiple activations

    shrinkCatcherActive = true;
    const originalWidth = catcher.offsetWidth;
    const newWidth = originalWidth * 0.8;

    // Apply the shrink effect
    catcher.style.width = `${newWidth}px`;

    // Set end time for the effect
    shrinkCatcherEndTime = Date.now() + 20000; // 20 seconds from now

    // Function to revert the size
    const revertSize = () => {
        catcher.style.width = `${originalWidth}px`;
        shrinkCatcherActive = false;
    };

    // Function to handle pause
    function handlePause() {
        if (shrinkCatcherActive) {
            shrinkCatcherPauseTime = Date.now(); // Record the pause time
            clearTimeout(shrinkCatcherTimeout); // Stop the timeout
        }
    }

    // Function to handle resume
    function handleResume() {
        if (shrinkCatcherActive) {
            const currentTime = Date.now();
            const elapsedPauseTime = currentTime - shrinkCatcherPauseTime; // Calculate pause duration
            shrinkCatcherEndTime += elapsedPauseTime; // Adjust end time by adding the pause duration

            // Restart the timeout with the updated end time
            shrinkCatcherTimeout = setTimeout(revertSize, shrinkCatcherEndTime - currentTime);
        }
    }

    // Start the timeout to revert the size
    shrinkCatcherTimeout = setTimeout(revertSize, 20000);

    // Event listeners for pause and resume
    document.addEventListener('pauseGame', handlePause);
    document.addEventListener('resumeGame', handleResume);
}

let virusEffectActive = false;
let virusEffectEndTime = 0;
let virusEffectPauseTime = 0;
let virusEffectTimeout = null;
const virusEffectDuration = 10000; // 10 seconds
const glitchEffectClass = 'glitch-effect';
const gameContainer = document.getElementById('game'); // Ensure you have a game container

function applyVirusEffects() {
    if (virusEffectActive) return; // Prevent multiple activations

    virusEffectActive = true;
    virusEffectEndTime = Date.now() + virusEffectDuration; // 10 seconds from now

    if (!gameContainer.classList.contains(glitchEffectClass)) {
        gameContainer.classList.add(glitchEffectClass);

        // Function to handle pause
        function handlePause() {
            if (virusEffectActive) {
                virusEffectPauseTime = Date.now(); // Record the pause time
                gameContainer.classList.remove(glitchEffectClass); // Remove visual effect during pause
                clearTimeout(virusEffectTimeout); // Stop the timeout
            }
        }

        // Function to handle resume
        function handleResume() {
            if (virusEffectActive) {
                const currentTime = Date.now();
                const elapsedPauseTime = currentTime - virusEffectPauseTime; // Calculate pause duration
                virusEffectEndTime += elapsedPauseTime; // Adjust end time by adding the pause duration

                // Restart the visual effect and timeout with the updated end time
                gameContainer.classList.add(glitchEffectClass); // Reapply the visual effect
                virusEffectTimeout = setTimeout(() => {
                    gameContainer.classList.remove(glitchEffectClass);
                    virusEffectActive = false;
                }, virusEffectEndTime - Date.now()); // Time remaining
            }
        }

        // Start the timeout to remove the effect after the duration
        virusEffectTimeout = setTimeout(() => {
            gameContainer.classList.remove(glitchEffectClass);
            virusEffectActive = false;
        }, virusEffectDuration);

        // Event listeners for pause and resume
        document.addEventListener('pauseGame', handlePause);
        document.addEventListener('resumeGame', handleResume);
    }
}

// Example of calling the function
document.addEventListener('keydown', (event) => {
    if (event.key === 'v') {
        applyVirusEffects(); // Call the applyVirusEffects function when "v" is pressed
    }
});

let teenyBallActive = false;
let teenyBallEndTime = 0;
let teenyBallPauseTime = 0;
let teenyBallCheckInterval = null;
const teenyBallDuration = 10000; // 10 seconds


function applyTeenyBallEffect() {
    // If a mega ball effect is active, cancel it
    if (megaBallActive) {
        clearInterval(megaBallInterval);
        const balls = document.querySelectorAll('.ball');
        balls.forEach(ball => {
            const originalSize = ball.dataset.originalSize || 1; // Use stored size or default to 1
            ball.style.transform = `scale(${originalSize})`;
        });
        megaBallActive = false;
        delete activePowerUps['megaBall'];
    }

    if (teenyBallActive) return; // Prevent multiple activations

    teenyBallActive = true;
    teenyBallEndTime = Date.now() + teenyBallDuration; // 10 seconds from now

    // Apply the effect to existing balls
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        const originalSize = ball.style.transform ? parseFloat(ball.style.transform.replace('scale(', '').replace(')', '')) : 1;
        ball.dataset.originalSize = originalSize; // Store original size in a data attribute
        ball.style.transform = 'scale(0.5)'; // Reduce size to 0.5
    });

    // Function to revert effect on all balls
    const revertEffect = () => {
        const balls = document.querySelectorAll('.ball');
        balls.forEach(ball => {
            const originalSize = ball.dataset.originalSize || 1; // Use stored size or default to 1
            ball.style.transform = `scale(${originalSize})`;
        });
        teenyBallActive = false;
    };

    // Function to handle pause
    function handlePause() {
        if (teenyBallActive) {
            teenyBallPauseTime = Date.now(); // Record the pause time
            clearInterval(teenyBallCheckInterval); // Stop the interval
        }
    }

    // Function to handle resume
    function handleResume() {
        if (teenyBallActive) {
            const currentTime = Date.now();
            const elapsedPauseTime = currentTime - teenyBallPauseTime; // Calculate pause duration
            teenyBallEndTime += elapsedPauseTime; // Adjust end time by adding the pause duration

            // Restart the interval with the updated end time
            teenyBallCheckInterval = setInterval(() => {
                if (Date.now() > teenyBallEndTime) {
                    clearInterval(teenyBallCheckInterval);
                    revertEffect(); // Revert effect when time is up
                } else {
                    // Apply effect to new balls
                    const balls = document.querySelectorAll('.ball');
                    balls.forEach(ball => {
                        if (!ball.dataset.originalSize) {
                            const originalSize = ball.style.transform ? parseFloat(ball.style.transform.replace('scale(', '').replace(')', '')) : 1;
                            ball.dataset.originalSize = originalSize;
                            ball.style.transform = 'scale(0.5)';
                        }
                    });
                }
            }, 100); // Check every 100 milliseconds
        }
    }

    // Start the interval to continuously check and apply effect
    teenyBallCheckInterval = setInterval(() => {
        if (Date.now() > teenyBallEndTime) {
            clearInterval(teenyBallCheckInterval);
            revertEffect(); // Revert effect when time is up
        } else {
            // Apply effect to new balls
            const balls = document.querySelectorAll('.ball');
            balls.forEach(ball => {
                if (!ball.dataset.originalSize) {
                    const originalSize = ball.style.transform ? parseFloat(ball.style.transform.replace('scale(', '').replace(')', '')) : 1;
                    ball.dataset.originalSize = originalSize;
                    ball.style.transform = 'scale(0.5)';
                }
            });
        }
    }, 100); // Check every 100 milliseconds

    // Event listeners for pause and resume
    document.addEventListener('pauseGame', handlePause);
    document.addEventListener('resumeGame', handleResume);

    // Mark the power-up as active
    activePowerUps['teenyBall'] = true;
}


function schedulePowerDownCreation() {
    setInterval(() => {
        if (lives > 0 && !gamePaused) {
            createPowerDown();
        }
    }, 10000); // Check every 10 seconds
}


// Test function to spawn Virus power-down when 'V' is pressed
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'v' || event.key === 'V') {
//         spawnVirusPowerDown(); // Spawn Virus power-down directly
//     } else if (event.key === 't' || event.key === 'T') {
//         spawnTeenyBallPowerDown(); // Spawn Teeny Ball power-down directly
//     }
// });

function spawnVirusPowerDown() {
    const virusPowerDown = document.createElement('div');
    virusPowerDown.className = `powerdown powerdown-virus`;
    virusPowerDown.textContent = ' ';
    virusPowerDown.dataset.effect = 'virus';
    virusPowerDown.style.top = '0px';

    const powerDownWidth = 40; // Fixed width
    const minLeftPosition = 50;
    const maxLeftPosition = window.innerWidth - powerDownWidth - minLeftPosition;
    let position;

    do {
        position = minLeftPosition + Math.random() * maxLeftPosition;
        virusPowerDown.style.left = `${position}px`;
    } while (isTooClose(virusPowerDown, 'powerup')); // Check distance to power-ups

    document.getElementById('game').appendChild(virusPowerDown);
    const powerDownElement = { element: virusPowerDown, top: 0, interval: null };
    handleFallingPowerDown(powerDownElement);
}

function spawnTeenyBallPowerDown() {
    const teenyBallPowerDown = document.createElement('div');
    teenyBallPowerDown.className = `powerdown powerdown-teenyball`;
    teenyBallPowerDown.textContent = ' ';
    teenyBallPowerDown.dataset.effect = 'teenyBall';
    teenyBallPowerDown.style.top = '0px';

    const powerDownWidth = 40; // Fixed width
    const minLeftPosition = 50;
    const maxLeftPosition = window.innerWidth - powerDownWidth - minLeftPosition;
    let position;

    do {
        position = minLeftPosition + Math.random() * maxLeftPosition;
        teenyBallPowerDown.style.left = `${position}px`;
    } while (isTooClose(teenyBallPowerDown, 'powerup')); // Check distance to power-ups

    document.getElementById('game').appendChild(teenyBallPowerDown);
    const powerDownElement = { element: teenyBallPowerDown, top: 0, interval: null };
    handleFallingPowerDown(powerDownElement);
}

function isTooClose(element, type) {
    // Your implementation of the distance check function
    return false; // Placeholder, adjust this based on your actual implementation
}



// function spawnRandomPowerUpOrPowerDown() {
//     const randomType = Math.random() > 0.5 ? 'powerup' : 'powerdown';
//     const powerUps = [
//         { type: '1UP', text: '1UP', effect: 'extraLife', cssClass: 'powerup-1up' },
//         { type: 'PLUS_PLUS', text: '', effect: 'growCatcher', cssClass: 'powerup-plusplus' },
//         { type: 'MAGNET', text: '', effect: 'magnet', cssClass: 'powerup-magnet' },
//         { type: 'MEGA_BALL', text: '', effect: 'megaBall', cssClass: 'powerup-megaball' }
//     ];
//     const powerDowns = [
//         { type: 'SPEED_UP', text: '', effect: 'speedUp', cssClass: 'powerdown-speedup' }
//     ];

//     const items = randomType === 'powerup' ? powerUps : powerDowns;
//     const item = items[Math.floor(Math.random() * items.length)];
//     const element = document.createElement('div');
//     element.className = `${randomType} ${item.cssClass}`;
//     element.textContent = item.text;
//     element.dataset.effect = item.effect;
//     element.style.top = '0px';

//     const itemWidth = 40; // Fixed width
//     const minLeftPosition = 50;
//     const maxLeftPosition = window.innerWidth - itemWidth - minLeftPosition;
//     let position;

//     do {
//         position = minLeftPosition + Math.random() * maxLeftPosition;
//         element.style.left = `${position}px`;
//     } while (isTooClose(element, randomType));

//     document.getElementById('game').appendChild(element);
//     const itemData = { element: element, top: 0, interval: null, startTime: Date.now(), duration: 20000 };
//     handleFallingPowerUp(itemData);
// }

// document.addEventListener('keydown', (event) => {
//     if (event.key === 'k' || event.key === 'K') {
//         spawnRandomPowerUpOrPowerDown(); // Force spawn a random power-up or power-down
//     }
// });

// Function to force spawn a random powerdown when 'J' is pressed
// function forceSpawnRandomPowerdown() {
//     // Get a random powerdown from the existing powerdowns array
//     const powerDownData = getRandomPowerDown();

//     // Create a new powerdown element
//     const powerDown = document.createElement('div');
//     powerDown.className = `powerdown ${powerDownData.cssClass}`;
//     powerDown.textContent = powerDownData.text;
//     powerDown.dataset.effect = powerDownData.effect;
//     powerDown.style.top = '0px';

//     const powerDownWidth = 40; // Fixed width
//     const minLeftPosition = 50;
//     const maxLeftPosition = window.innerWidth - powerDownWidth - minLeftPosition;
//     let position;

//     do {
//         position = minLeftPosition + Math.random() * maxLeftPosition;
//         powerDown.style.left = `${position}px`;
//     } while (isTooClose(powerDown, 'powerup')); // Check distance to existing power-ups

//     // Append the powerdown to the game container
//     document.getElementById('game').appendChild(powerDown);

//     // Initialize the falling logic for the new powerdown
//     const powerDownElement = { element: powerDown, top: 0, interval: null };
//     handleFallingPowerDown(powerDownElement);
// }

// // Event listener to handle key press for spawning powerdowns
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'j' || event.key === 'J') {
//         forceSpawnRandomPowerdown();
//     }
// });

document.addEventListener('DOMContentLoaded', (event) => {
    // Function to set trail color class based on ball's data-color attribute
    function setBallTrailColor(ball) {
        const color = ball.getAttribute('data-color');
        const trailColorClass = `trail-${color}`;
        
        // Remove all existing trail color classes
        ball.classList.remove('trail-red', 'trail-green', 'trail-blue', 'trail-yellow', 'trail-orange', 'trail-purple');
        
        // Add the class corresponding to the ball's color
        if (trailColorClass) {
            ball.classList.add(trailColorClass);
        }
    }

    // Function to set color class based on ball's data-color attribute
    function setBallColorClass(ball) {
        const color = ball.getAttribute('data-color');
        const ballColorClass = `ball-${color}`;
        
        // Remove all existing ball color classes
        ball.classList.remove('ball-red', 'ball-green', 'ball-blue', 'ball-yellow', 'ball-orange', 'ball-purple');
        
        // Add the class corresponding to the ball's color
        if (ballColorClass) {
            ball.classList.add(ballColorClass);
        }
    }

    // Function to handle the animation start
    function onAnimationStart(event) {
        if (event.animationName === 'ballCatchAnimation') {
            event.target.classList.add('no-trail');
        }
    }

    // Function to handle the animation end
    function onAnimationEnd(event) {
        if (event.animationName === 'ballCatchAnimation') {
            event.target.classList.remove('no-trail');
        }
    }

    // Function to add event listeners and set color properties to a ball
    function addBallEventListeners(ball) {
        setBallTrailColor(ball); // Set trail color based on data-color attribute
        setBallColorClass(ball); // Set ball color class based on data-color attribute
        ball.addEventListener('animationstart', onAnimationStart);
        ball.addEventListener('animationend', onAnimationEnd);
    }

    // Observe changes in the game container
    const gameContainer = document.getElementById('game');
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('ball')) {
                    // New ball added, set up its event listeners
                    addBallEventListeners(node);
                }
            });
        });
    });
    
    observer.observe(gameContainer, { childList: true, subtree: true });

    // Attach listeners to existing balls
    document.querySelectorAll('.ball').forEach(addBallEventListeners);
});

let firstBallCreated = false;
document.addEventListener('DOMContentLoaded', (event) => {
    let isBlockingPause = false; // Global flag to control blocking pause functionality

    // Function to handle blocking pause functionality
    function blockPause(event) {
        if (isBlockingPause) {
            event.preventDefault();
            event.stopImmediatePropagation();
            console.log('Pause is blocked.');
        }
    }
    
    function blockEscape(event) {
        if (isBlockingPause && event.key === 'Escape') {
            event.preventDefault();
            event.stopImmediatePropagation();
            console.log('Escape key press is blocked.');
        }
    }

    // Function to show the Mission Settings menu
    function showMissionSettings() {
        const missionSettings = document.getElementById('missionSettings');
        if (missionSettings) {
            isBlockingPause = true; // Block pause during mission settings
            window.addEventListener('blur', blockPause, true);
            document.addEventListener('visibilitychange', blockPause, true);
            window.addEventListener('keydown', blockEscape, true);

            missionSettings.style.display = 'block'; // Show the menu
        }
    }

    
    function startGameWithSettings() {
        const missionSettings = document.getElementById('missionSettings');
        if (missionSettings) {
            missionSettings.style.display = 'none'; // Hide the menu
        }
    
        // Retrieve selected game mode
        const gameModeOptions = document.getElementsByName('gameMode');
        gameModeOptions.forEach(option => {
            if (option.checked) {
                gameSettings.mode = option.value;
            }
        });
    
        const autoColorCheckbox = document.getElementById('autoColor');
        gameSettings.autoColor = autoColorCheckbox.checked;
    
        // // Set up game with the selected settings
        // console.log('Game Mode:', gameSettings.mode);
        // console.log('Auto Color:', gameSettings.autoColor ? 'Enabled' : 'Disabled');
    
        // Proceed with countdown and game initialization
        startCountdown(); // Start the countdown
    
        // Start the game with auto color feature enabled
        if (gameSettings.autoColor) {
            enableAutoColor(); // Enable auto color functionality
        } else {
            disableAutoColor(); // Disable auto color functionality
        }
    }
    
    // Add event listeners for touchstart and click to the button and checkbox
    const initiateMissionButton = document.getElementById('initiateMissionButton');
    if (initiateMissionButton) {
        initiateMissionButton.addEventListener('touchstart', startGameWithSettings);
        initiateMissionButton.addEventListener('click', startGameWithSettings);
    }
    
    const autoColorCheckbox = document.getElementById('autoColor');
    if (autoColorCheckbox) {
        autoColorCheckbox.addEventListener('touchstart', function(e) {
            // Prevent touchstart event from triggering a click event
            e.preventDefault();
            autoColorCheckbox.checked = !autoColorCheckbox.checked;
        });
    
        autoColorCheckbox.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the click event from bubbling
        });
    }
    
// Handle touch events for radio buttons (game mode)
const gameModeOptions = document.getElementsByName('gameMode');
gameModeOptions.forEach(option => {
    option.addEventListener('touchstart', function(e) {
        // Prevent touchstart event from triggering a click event
        e.preventDefault();
        // Uncheck all radio buttons
        gameModeOptions.forEach(opt => {
            opt.checked = false;
        });
        // Check the touched radio button
        option.checked = true;

        // Manually trigger the change event to apply game mode settings
        const event = new Event('change');
        option.dispatchEvent(event);
    });

    option.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click event from bubbling
    });

    // Add change event listener to apply game mode settings
    option.addEventListener('change', function() {
        handleDifficultySelection(); // Apply the selected game mode settings
    });
});

    
    // Function to enable auto color feature
    function enableAutoColor() {
        autoColorEnabled = true;
    }
    
    // Function to disable auto color feature
    function disableAutoColor() {
        autoColorEnabled = false;
    }
    
    
    // Set up the initiate button in the Mission Settings menu
    const initiateButton = document.getElementById('initiateMissionButton');
    if (initiateButton) {
        initiateButton.addEventListener('click', startGameWithSettings);
    }

    function allowMovement(event) {
        if (lives > 0 && !gamePaused) {
            const catcher = document.querySelector('#catcher');
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const catcherWidth = catcher.offsetWidth;
            const catcherHeight = catcher.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
    
            let newLeft = mouseX - (catcherWidth / 2);
            newLeft = Math.max(0, Math.min(windowWidth - catcherWidth, newLeft));
    
            if (verticalMovementDisabled) {
                // Only update horizontal position
                catcher.style.left = `${newLeft}px`;
                // Maintain current vertical position
            } else {
                let newTop = mouseY - (catcherHeight / 2);
                newTop = Math.max(0, Math.min(windowHeight - catcherHeight, newTop));
                catcher.style.left = `${newLeft}px`;
                catcher.style.top = `${newTop}px`;
            }
        }
    }
    

    // Function to handle the countdown
   // Function to handle the countdown
function startCountdown() {
    const countdownDiv = document.createElement('div');
    countdownDiv.id = 'countdown';
    document.body.appendChild(countdownDiv);

    let countdown = 3;

    function updateCountdown() {
        countdownDiv.textContent = countdown > 0 ? countdown : 'CATCH!';
        countdownDiv.classList.remove('countdown-anim');
        if (countdown === 0) {
            countdownDiv.classList.add('catch');
        } else {
            countdownDiv.classList.remove('catch');
        }
        void countdownDiv.offsetWidth; // Trigger reflow to restart animation
        countdownDiv.classList.add('countdown-anim');
    }

    // Play countdown sound
    playSoundEffect('countdown'); // Ensure this path is correct

    updateCountdown();

    // Mouse movement logic for catcher during countdown
    document.addEventListener('mousemove', handleCatcherMovementDuringCountdown);

    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown >= 0) {
            updateCountdown();
            if (countdown === 0) {
                startGame(); // Start the game
                schedulePowerDownCreation(); // Schedule power-downs
                schedulePowerUpCreation(); // Schedule power-ups
                playMusic(); // Start the music

                // Immediately unblock pause functionality and remove event listeners
                isBlockingPause = false; // Allow pause functionality
                window.removeEventListener('blur', blockPause, true);
                document.removeEventListener('visibilitychange', blockPause, true);
                window.removeEventListener('keydown', blockEscape, true);

                // Remove the event listener for catcher movement after countdown
                document.removeEventListener('mousemove', handleCatcherMovementDuringCountdown);
            }
        } else {
            clearInterval(countdownInterval);
            document.body.removeChild(countdownDiv);
        }
    }, 1000);
}

// Function to handle catcher movement during countdown
function handleCatcherMovementDuringCountdown(event) {
    if (lives > 0 && !gamePaused) {
        const catcher = document.querySelector('#catcher');
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const catcherWidth = catcher.offsetWidth;
        const catcherHeight = catcher.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let newLeft = mouseX - (catcherWidth / 2);
        newLeft = Math.max(0, Math.min(windowWidth - catcherWidth, newLeft));

        if (verticalMovementDisabled) {
            // Only update horizontal position
            catcher.style.left = `${newLeft}px`;
            // Maintain current vertical position
        } else {
            let newTop = mouseY - (catcherHeight / 2);
            newTop = Math.max(0, Math.min(windowHeight - catcherHeight, newTop));
            catcher.style.left = `${newLeft}px`;
            catcher.style.top = `${newTop}px`;
        }
    }
}


    // Show Mission Settings menu initially
    showMissionSettings();
});

// Function to handle music
function handleMusic() {
    const audio = new Audio('audio/music.mp3');
    audio.loop = true; // Loop the music
    let isMusicPlaying = false;

    // Function to play music
    function playMusic() {
        audio.play();
        isMusicPlaying = true;
        // Remove the 'muted' class to indicate music is playing
        musicIcon.classList.remove('muted');
    }

    // Function to pause music
    function pauseMusic() {
        audio.pause();
        isMusicPlaying = false;
        // Add the 'muted' class to indicate music is muted
        musicIcon.classList.add('muted');
    }

    // Function to toggle music
    function toggleMusic() {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    // Create the music control icon
    const musicIcon = document.createElement('div');
    musicIcon.id = 'music-icon';
    musicIcon.textContent = '🎵'; // Music note emoji for the icon

    // Append the music icon under the score element
    const scoreDiv = document.getElementById('score');
    scoreDiv.appendChild(musicIcon);

    // Add event listener to the music icon to toggle music
    musicIcon.addEventListener('click', toggleMusic);
    musicIcon.addEventListener('touchstart', toggleMusic);
    // Ensure the music icon is always visible
    document.body.appendChild(musicIcon);

    // Return the playMusic and pauseMusic functions to be used elsewhere
    return { playMusic, pauseMusic };
}

// Call the handleMusic function to set up the music control
const musicControls = handleMusic();
playMusic = musicControls.playMusic;
pauseMusic = musicControls.pauseMusic;

// Function to handle sound effects
function handleSoundEffects() {
    // Audio elements for sound effects
    const soundEffects = {
        countdown: new Audio('audio/countdown.mp3'),
        success: new Audio('audio/success-ding.mp3'),
        fail: new Audio('audio/fail-ding.mp3'),
        gameover: new Audio('audio/gameover.mp3')
    };

    // Adjust volume for each sound effect as needed
    const defaultVolume = 0.8;
    let effectVolume = defaultVolume;

    for (let key in soundEffects) {
        soundEffects[key].volume = effectVolume;
        soundEffects[key].loop = false; // Disable looping for individual sound effects
    }

    let isEffectsEnabled = true;

    // Function to play a sound effect
    function playSoundEffect(name) {
        if (isEffectsEnabled && soundEffects[name]) {
            soundEffects[name].currentTime = 0; // Reset to start
            soundEffects[name].play().catch(error => {
                console.error(`Failed to play ${name} sound effect:`, error);
            });
        }
    }

    // Function to toggle sound effects
    function toggleEffects() {
        isEffectsEnabled = !isEffectsEnabled;
        // Toggle the icon between speaker and muted state
        effectIcon.textContent = isEffectsEnabled ? '🔊' : '🔈';
        for (let key in soundEffects) {
            soundEffects[key].muted = !isEffectsEnabled; // Mute/unmute sound effects
        }
    }

    // Function to set volume for sound effects
    function setEffectVolume(volume) {
        effectVolume = volume;
        for (let key in soundEffects) {
            soundEffects[key].volume = effectVolume;
        }
    }

    // Create the sound effects control icon
    const effectIcon = document.createElement('div');
    effectIcon.id = 'effect-icon';
    effectIcon.textContent = '🔊'; // Speaker emoji for the icon
    effectIcon.style.fontSize = '2em';
    effectIcon.style.cursor = 'pointer';
    effectIcon.style.display = 'block';
    effectIcon.style.position = 'absolute'; /* Ensures the icon is always in a fixed position */
    effectIcon.style.top = '30px'; /* Align with the music icon */
    effectIcon.style.left = '60px'; /* Adjust to the right of the music icon */
    effectIcon.style.zIndex = '1000'; /* Ensures the icon stays on top */

    // Append the sound effects icon to the body
    document.body.appendChild(effectIcon);

    // Add event listener to the sound effects icon to toggle sound effects
    effectIcon.addEventListener('click', toggleEffects);
    effectIcon.addEventListener('touchstart', toggleEffects);
    // Return the playSoundEffect and setEffectVolume functions to be used externally
    return { playSoundEffect, setEffectVolume };
}

// Get a reference to the home icon link element
const homeIcon = document.getElementById('homeicon');

// Function to handle navigation (you can customize this based on your needs)
function navigateToMainMenu(event) {
    // Prevent the default behavior of the anchor tag (to prevent page reload)
    event.preventDefault();

    // Navigate to the main menu page
    window.location.href = homeIcon.getAttribute('href');
}

// Add event listener for click event
homeIcon.addEventListener('click', navigateToMainMenu);

// Add event listener for touchstart event (for touch devices)
homeIcon.addEventListener('touchstart', navigateToMainMenu);

// Call the handleSoundEffects function to set up the sound effects control and get the playSoundEffect and setEffectVolume functions
const { playSoundEffect, setEffectVolume } = handleSoundEffects();



