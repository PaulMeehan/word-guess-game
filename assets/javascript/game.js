

const maxGuesses = 12;   //maximum number of guesses per round
var continuePlay = true;   //flag indication play should continue  (currently nothing setting this to False)
var wordList = ["CHOCOLATE", "CAKE", "ICE CREAM", "COOKIES", "APPLE PIE", "SHERBERT"];
var randomNum = 0;   //randomly selected number

//create variables for each element that will be updated through code
var elmtBanner = document.getElementById("banner");  //Banner element
var elmtWins = document.getElementById("wins");      //Wins element
var elmtLosses = document.getElementById("losses");  //Losses element
var elmtMask = document.getElementById("mask");      //Masked word element
var elmtRemaining = document.getElementById("remaining");  //remaining guesses element
var elmtGuessed = document.getElementById("guessed");      //letters already guessed element
var elmtNewWord = document.getElementById("new-word-btn");  //New word button


// function to change visiblity of New Word button
function changeButtonView(newStatus) {
    switch (newStatus) {
        case "show":
            // elmtNewWord.setAttribute("display", "block");
            elmtNewWord.style.display = "block";
            elmtNewWord.style.visibility = "visible";
            break;
        case "hide":
            // elmtNewWord.setAttribute("display", "hidden");
            elmtNewWord.style.display = "none";
            elmtNewWord.style.visibility = "hidden";
            break;
        default:
            // elmtNewWord.setAttribute("display", "block");
            elmtNewWord.style.display = "block";
            elmtNewWord.style.visibility = "visible";
    }
};


// function to change the text of the banner message
function setBanner(newText) {
    document.getElementById("banner").textContent = newText;
};


//game object
var game = {
    wins : 0,
    losses : 0,
    result : "unknown",      //string indicating the result of the game
    currentWord : "",
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
    initializeMask: function () {      //set the initial value of the mask
        //first remove any pre-existing elements
        for (var i=0;i<this.mask.length;i++) {
            this.mask.pop;
        }

        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord.charAt(i) === " ") {
                this.mask[i] = ".";  // fill in dot for space characters
            } else {
                this.mask[i] = "_";
            }
        };
    },

    updateBoard : function() {        //update document elements to show latest values
        elmtWins.textContent="Wins: " + this.wins;
        elmtLosses.textContent="Losses: " + this.losses;
        elmtMask.textContent="Current puzzle: " + this.mask.join(" ");
        elmtRemaining.textContent="Number of guesses remaining: " + this.numRemaining;
        elmtGuessed.textContent="Letters already guessed: " + this.guessedLetters
    },
    newRound : function() {    //reset counters for new round
        randomNum = Math.floor(Math.random() * wordList.length - 1);  //randomly select an index number
        this.currentWord = wordList[randomNum];
        // this.currentWord = "ORANGE";   //use this for testing
        this.numGuesses = 0;
        this.numRemaining = maxGuesses;
        this.guessedLetters = "";
        this.result = "unknown";
        this.initializeMask();
        changeButtonView("hide");
        setBanner("Make your guess");
        this.updateBoard();
    },
    processKey : function () {   //process the key pressed by the user
        var letter = event.key.toUpperCase();
        this.numGuesses = this.numGuesses + 1;
        this.numRemaining = this.numRemaining - 1;
        this.guessedLetters = this.guessedLetters + letter + " ";
        this.updateMask(letter);

        //check if all letters have been guessed or exceeded maximum guesses
        if (!this.mask.join("|").includes("_")) {
            this.result = "win";

        } else if (this.numRemaining === 0) {
            this.result = "lose";
        };
        //update elements according to result
        switch (this.result) {
            case "win":
                this.wins = this.wins + 1;
                setBanner("You Win!");
                changeButtonView("show");
                break;
            case "lose":
                this.losses = this.losses + 1;
                setBanner("You Lose!  The word was " + this.currentWord);
                changeButtonView("show");
                break;
            default:
            // do nothing
        };

        this.updateBoard();
    }
};




// wrapper for document ready
$(document).ready(function() {

    //start a new round of play
    game.newRound();

    //run each time the user clicks a keyboard key
    document.onkeyup = function (event) {
        if (game.result === 'unknown') {  //only process key events while in the middle of a game
            game.processKey();
        };
    };

});




