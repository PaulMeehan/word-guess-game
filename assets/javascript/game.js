
const maxGuesses = 12;   //maximum number of guesses per round

//create variables for each element that will be updated through code
var elmtBanner = document.getElementById("banner");  //Banner element
var elmtWins = document.getElementById("wins");      //Wins element
var elmtLosses = document.getElementById("losses");  //Losses element
var elmtWord = document.getElementById("word");      //Masked word element
var elmtRemaining = document.getElementById("remaining");  //remaining guesses element
var elmtGuessed = document.getElementById("guessed");      //letters already guessed element
var elmtNewWord = document.getElementById("new-word-btn");  //New word button


// function to change visiblity of New Word button
function changeButtonView(newStatus) {
    switch (newStatus) {
        case "show":
            elmtNewWord.setAttribute("display", "block");
            break;
        case "hide":
            elmtNewWord.setAttribute("display", "hidden");
            break;
        default:
            elmtNewWord.setAttribute("display", "block");
    }
};


//game object
var game = {
    wins : 0,
    losses : 0,
    result : "unknown",      //string indicating the result of the game
    currentWord : "ORANGE",
    mask : [],        //array of either the "_" character or a letter of the word
    numGuesses : 0,         //number of guesses this round
    numRemaining : maxGuesses,      //number of guesses remaining this round
    guessedLetters : "",
    updateMask : function(currentLetter) {      //update mask with specified letter if found
        currentLetter = currentLetter.toUpperCase();
        for (i=0; i<this.currentWord.length; i++) {
            if (currentLetter === this.currentWord[i]) {
                this.mask[i] = currentLetter;
            }
        };
    },
    updateBoard : function() {        //update document elements to show latest values
        elmtWins.textContent="Wins: " + this.wins;
        elmtLosses.textContent="Losses: " + this.losses;
        elmtWord.textContent="Current word: " + this.mask.join(" ");
        elmtRemaining.textContent="Number of guesses remaining: " + this.numRemaining;
        elmtGuessed.textContent="Letters already guessed: " + this.guessedLetters
    },
    newRound : function() {    //reset counters for new round
        this.numGuesses = 0;
        this.numRemaining = maxGuesses;
        this.guessedLetters = "";
        this.result = "unknown";
        changeButtonView("hide");
    }
};

// function to change the text of the banner message
function setBanner (newText) {
    document.getElementById("banner").textContent=newText;
};

// function to set the initial value of the mask
function initializeMask () {
    for (var i = 0; i < game.currentWord.length; i++) {
        game.mask[i] = "_";
    };
};



// wrapper for document ready
$(document).ready(function() {

    // Game startup
    setBanner("Press any key to begin");
    initializeMask();


    //run each time the user clicks a keyboard key
    document.onkeyup = function (event) {
        
        //only process the key if game result is unknown
        if (game.result === 'unknown') {

            changeButtonView("hide");
            setBanner("Game on!");

            var letter = event.key.toUpperCase();
            game.numGuesses = game.numGuesses + 1;
            game.numRemaining = game.numRemaining - 1;
            game.guessedLetters = game.guessedLetters + letter + " ";
            // showValues();
            game.updateMask(letter);
            
            //check if all letters have been guessed or exceeded maximum guesses
            if (! game.mask.join("|").includes("_")) {
                game.result = "win";

            } else if (game.numRemaining === 0) {
                game.result = "lose";
            };
            
            //update elements according to result
            switch (game.result) {
                case "win":
                    game.wins = game.wins + 1;
                    setBanner("You Win!");
                    break;
                case "lose":
                    game.losses = game.losses + 1;
                    setBanner("You Lose!");
                    break;
                default:
                    // do nothing
            }

        } else {
            changeButtonView("show");
        };
        
        //update board information
        game.updateBoard();

    };

});




