// script.js

// Function to start the game
function startGame() {
    // Your start game logic here
}

// Function to show the "How to Play" menu
function showHowToPlay() {
    const mainMenu = document.getElementById('main-menu');
    const howToPlayMenu = document.getElementById('how-to-play');
    
    // Hide the main menu with a transition
    mainMenu.classList.add('hidden');
    
    // Show the how-to-play menu with full-screen expansion
    howToPlayMenu.classList.remove('hidden');
    howToPlayMenu.classList.add('menu-expanded');
}

// Function to close the "How to Play" menu
function closeHowToPlay() {
    const mainMenu = document.getElementById('main-menu');
    const howToPlayMenu = document.getElementById('how-to-play');
    
    // Immediately hide the how-to-play menu
    howToPlayMenu.classList.add('hidden');
    
    // Show the main menu
    mainMenu.classList.remove('hidden');
}

// Function to show the "Power Ups and Power Downs" menu
function showPowerUpsDowns() {
    const mainMenu = document.getElementById('main-menu');
    const powerUpsDownsMenu = document.getElementById('power-ups-downs');
    
    // Hide the main menu with a transition
    mainMenu.classList.add('hidden');
    
    // Show the power ups/downs menu with full-screen expansion
    powerUpsDownsMenu.classList.remove('hidden');
    powerUpsDownsMenu.classList.add('menu-expanded');
}

// Function to close the "Power Ups and Power Downs" menu
function closePowerUpsDowns() {
    const mainMenu = document.getElementById('main-menu');
    const powerUpsDownsMenu = document.getElementById('power-ups-downs');
    
    // Immediately hide the power ups/downs menu
    powerUpsDownsMenu.classList.add('hidden');
    
    // Show the main menu
    mainMenu.classList.remove('hidden');
}

// Function for power-ups/downs logic
function powerUpsDowns() {
    // Your power ups/downs logic here
}

// script.js

// Function to show the "Controls" menu
function showControls() {
    const mainMenu = document.getElementById('main-menu');
    const controlsMenu = document.getElementById('controls');
    
    // Hide the main menu with a transition
    mainMenu.classList.add('hidden');
    
    // Show the controls menu with full-screen expansion
    controlsMenu.classList.remove('hidden');
    controlsMenu.classList.add('controls-expanded');
}

// Function to close the "Controls" menu
function closeControls() {
    const mainMenu = document.getElementById('main-menu');
    const controlsMenu = document.getElementById('controls');
    
    // Immediately hide the controls menu
    controlsMenu.classList.add('hidden');
    
    // Show the main menu
    mainMenu.classList.remove('hidden');
}

// Adding event listeners for Controls button

document.querySelector('#controls .close-button').addEventListener('click', closeControls);
