
const maxGuesses = 12;   //maximum number of guesses per round

var currentBanner = document.getElementById("banner");  //Banner element
var currentWins = document.getElementById("wins");      //Wins element
var currentLosses = document.getElementById("losses");  //Losses element
var currentWord = document.getElementById("word");      //Masked word element
var currentRemaining = document.getElementById("remaining");  //remaining guesses element
var currentGuessed = document.getElementById("guessed");      //letters already guessed element


var game = {
    wins : 0,
    losses : 0,
    currentWord : "ORANGE",
    maskedWord : " _ _ _ _ _ _",
    numGuesses : 0,         //number of guesses this round
    numRemaining : maxGuesses,      //number of guesses remaining this round
    guessedLetters : "",
    updateBoard : function() {
        currentWins.textContent="Wins: " + this.wins;
        currentLosses.textContent="Losses: " + this.losses;
        currentWord.textContent="Current word: " + this.maskedWord;
        currentRemaining.textContent="Number of guesses remaining: " + this.numRemaining;
        currentGuessed.textContent="Letters already guessed: " + this.guessedLetters
    },
    newRound : function() {    //reset counters for new round
        this.numGuesses = 0;
        this.numRemaining = maxGuesses;
        this.guessedLetters = "";
    }
};

function showValues () {
    console.clear();
    console.log("wins=" + game.wins);
    console.log("losses=" + game.losses);
    console.log("current word =" + game.currentWord);
    console.log("masked word = " + game.maskedWord);
    console.log("remaining guesses = "+ game.numRemaining);
    console.log("guessed Letters" + game.guessedLetters);
};


function setBanner (newText) {
    document.getElementById("banner").textContent=newText;
};


// Game startup
setBanner("Press any key to begin");


//run each time the user clicks a keyboard key
document.onkeyup = function (event) {
    setBanner("Game on!");

    var letter = event.key.toUpperCase();
    game.numGuesses = game.numGuesses + 1;
    game.numRemaining = game.numRemaining - 1;
    game.guessedLetters = game.guessedLetters + letter + " ";
    showValues();
    game.updateBoard();

};


