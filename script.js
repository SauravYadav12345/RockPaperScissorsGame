let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRounds = 5;
let totalRounds = 5;
let roundsLeft = totalRounds;

const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const roundResultDisplay = document.getElementById("round-result");
const computerChoiceDisplay = document.getElementById("computer-choice");
const gameOverScreen = document.getElementById("game-over");
const finalPlayerScoreDisplay = document.getElementById("final-player-score");
const finalComputerScoreDisplay = document.getElementById(
  "final-computer-score"
);
const restartBtn = document.getElementById("restart-btn");
const finalMessage = document.getElementById("final-message");

//Choices of the Game
const choices = ["rock", "paper", "scissors"];

//computer generating choices
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to update rounds left
function updateRoundsDisplay() {
  document.getElementById("rounds-left").textContent = roundsLeft;
}

// Check for game over
function checkGameOver() {
  if (roundCount >= maxRounds) {
    gameOverScreen.style.display = "block"; // Show final result
    finalPlayerScoreDisplay.textContent = playerScore;
    finalComputerScoreDisplay.textContent = computerScore;

    // Display winner or loser
    if (playerScore > computerScore) {
      finalMessage.textContent = "🎉 Congratulations! You Win! 🎉";
      showWinAnimation();
    } else if (playerScore < computerScore) {
      finalMessage.textContent = "😔 You Lose! Better luck next time! 😔";
      showLoseAnimation();
    } else {
      finalMessage.textContent = "🤝 It's a Draw! Try Again! 🤝";
    }
  }
}

// Show win animation with slow bursting crackers inside the game container
function showWinAnimation() {
  document.body.classList.add("winner");

  const winAnimation = document.getElementById("win-animation");
  winAnimation.style.display = "block"; // Show animation container
  const gameContainer = document.getElementById("game-container");

  for (let i = 0; i < 10; i++) {
    const cracker = document.createElement("div");
    cracker.className = "cracker";
    const containerRect = gameContainer.getBoundingClientRect();
    const leftPosition = Math.random() * containerRect.width + "px";
    const bottomPosition = Math.random() * containerRect.height + "px";

    cracker.style.left = leftPosition;
    cracker.style.bottom = bottomPosition;
    winAnimation.appendChild(cracker);

    gsap.fromTo(
      cracker,
      { scale: 1, opacity: 1, y: 0 },
      {
        scale: 5,
        opacity: 0,
        y: -100,
        duration: 4,
        ease: "power2.out",
        delay: i * 0.3,
        onComplete: () => cracker.remove(),
      }
    );
  }
}

// Update scores
function updateScore() {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

// Display round result
function displayRoundResult(result, computerChoice) {
  roundResultDisplay.textContent = result;
  computerChoiceDisplay.textContent = `Computer chose: ${computerChoice}`;
}

// Determine winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a Draw!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    return "You Win!";
  } else {
    computerScore++;
    return "Computer Wins!";
  }
}

// Core game function
function playRound(playerChoice) {
  if (roundCount < maxRounds) {
    roundCount++;
    roundsLeft--;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    displayRoundResult(result, computerChoice);
    updateScore();
    updateRoundsDisplay();
    checkGameOver();
  }
}

// Restart Button
restartBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  roundCount = 0;
  roundsLeft = totalRounds;
  updateScore();
  updateRoundsDisplay();
  roundResultDisplay.textContent = "";
  computerChoiceDisplay.textContent = "";
  gameOverScreen.style.display = "none";
  document.body.classList.remove("winner", "dull");
});

// Initially display rounds
updateRoundsDisplay();

// Event Listeners for player choices
document
  .getElementById("rock")
  .addEventListener("click", () => playRound("rock"));
document
  .getElementById("paper")
  .addEventListener("click", () => playRound("paper"));
document
  .getElementById("scissors")
  .addEventListener("click", () => playRound("scissors"));
