// Define the game variables
const dogBreeds = ["beagle", "bulldog/french", "dalmatian", "redbone", "labrador", "poodle", "rottweiler", "husky", "cockapoo", "pitbull", "affenpinscher", "whippet", "kelpie", "leonberg"];
let selectedDogBreed = "";
let selectedDogBreedArr = [];
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;
let gameWon = false;

// Define the HTML elements
const dogImage = document.getElementById("dog-image");
const guessInput = document.getElementById("guess-input");
const guessSubmitBtn = document.getElementById("guess-submit");
const wordDisplay = document.getElementById("word-display");
const incorrectGuessesDisplay = document.getElementById("incorrect-guesses");
const maxIncorrectGuessesDisplay = document.getElementById("max-incorrect-guesses");

// Define the event listeners
guessSubmitBtn.addEventListener("click", handleGuess);
guessInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleGuess();
  }
});

// Define the game functions
function handleGuess() {
  const guessedLetter = guessInput.value.toLowerCase();
  if (guessedLetter.length !== 1) {
    alert("Please enter a single letter.");
    return;
  }
  if (guessedLetters.includes(guessedLetter)) {
    alert("You have already guessed that letter. Please try a different one.");
    return;
  }
  guessedLetters.push(guessedLetter);
  updateWordDisplay();
  updateIncorrectGuesses();
  guessInput.value = "";
  checkGameStatus();
}

function updateWordDisplay() {
  let wordDisplayStr = "";
  for (let i = 0; i < selectedDogBreedArr.length; i++) {
    const currentLetter = selectedDogBreedArr[i];
    if (guessedLetters.includes(currentLetter)) {
      wordDisplayStr += currentLetter.toUpperCase();
    } else {
      wordDisplayStr += "_";
    }
    wordDisplayStr += " ";
  }
  wordDisplay.textContent = wordDisplayStr;
}

function updateIncorrectGuesses() {
  if (!selectedDogBreedArr.includes(guessInput.value)) {
    incorrectGuesses++;
    incorrectGuessesDisplay.textContent = incorrectGuesses;
  }
}

function checkGameStatus() {
  if (incorrectGuesses >= maxIncorrectGuesses) {
    endGame("lose");
  }
  if (!wordDisplay.textContent.includes("_")) {
    endGame("win");
  }
}

function endGame(result) {
  if (result === "win") {
    alert("Congratulations, you guessed the dog breed!");
    gameWon = true;
  } else if (result === "lose") {
    alert("Sorry, you lost. The dog breed was: " + selectedDogBreed.toUpperCase());
  }
  guessInput.disabled = true;
  guessSubmitBtn.disabled = true;
}

function startGame() {
  // Reset the game variables
  selectedDogBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
  selectedDogBreedArr = selectedDogBreed.split("");
  guessedLetters = [];
  incorrectGuesses = 0;
  gameWon = false;

// Fetch the dog image from the Dog API and display it on the page
fetch(`https://dog.ceo/api/breed/${selectedDogBreed}/images/random`)
  .then(response => response.json())
  .then(data => {
    dogImage.src = data.message; // <-- Update the dog image source with the URL from the API response
    dogImage.alt = `Picture of a ${selectedDogBreed}`; // <-- Add an alt text for accessibility
  });

// Reset the HTML elements
  guessInput.disabled = false;
  guessSubmitBtn.disabled = false;
  guessInput.value = "";
  incorrectGuessesDisplay.textContent = incorrectGuesses;
  maxIncorrectGuessesDisplay.textContent = maxIncorrectGuesses;

  // Generate the word display
  updateWordDisplay();
}

// Start the game when the page loads
window.addEventListener("load", startGame);