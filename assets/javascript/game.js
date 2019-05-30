const maxGuesses = 12;   //maximum number of guesses per round
var continuePlay = true;   //flag indication play should continue  (currently nothing setting this to False)
var wordList = ["CHOCOLATE", "CAKE", "ICE CREAM", "COOKIES", "APPLE PIE", "SHERBERT", "CANNOLI", "CHEESECAKE", "CREME BRULEE"];
var imgList = ["chocolate.jpg", "cake.jpg", "icecream.jpg", "cookies.jpg", "applepie.jpg", "sherbert.jpg", "cannoli.jpeg", "cheesecake.jpg", "cremebrulee.jpg"];

//create variables for each element that will be updated through code
var elmtSideImage = document.getElementById("sideImage");   //Image on left side
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
            elmtNewWord.style.visibility = "visible";
            break;
        case "hide":
            elmtNewWord.style.visibility = "hidden";
            break;
        default:
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
    randomNum : 0,           //random index number
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
        this.mask = [];
        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord.charAt(i) === " ") {
                this.mask[i] = ".";  // fill in dot for space characters
            } else {
                this.mask[i] = "_";
            }
        };
    },

    updateBoard : function() {        //update document elements to show latest values
        elmtWins.textContent=this.wins;
        elmtLosses.textContent=this.losses;
        elmtMask.textContent=this.mask.join(" ");
        elmtRemaining.textContent=this.numRemaining;
        elmtGuessed.textContent=this.guessedLetters
    },
    
    newRound : function() {    //reset counters for new round
        game.randomNum = Math.floor(Math.random() * wordList.length);  //randomly select an index number
        this.currentWord = wordList[game.randomNum];
        this.numGuesses = 0;
        this.numRemaining = maxGuesses;
        this.guessedLetters = "";
        this.result = "unknown";
        this.initializeMask();
        changeButtonView("hide");
        setBanner("Make your guess");
        this.updateBoard();
        elmtSideImage.setAttribute("src","assets/images/hangman.jpg");
    },
    
    playLose: function () {
        var loseAudio = document.createElement("audio");
        loseAudio.setAttribute("src", "assets/sounds/loser2.wav");
        loseAudio.play();
    },
    
    playWin: function () {
        var winAudio = document.createElement("audio");
        winAudio.setAttribute("src", "assets/sounds/daffy44.mp3");
        winAudio.play();
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
                this.playWin();
                elmtSideImage.setAttribute("src", "assets/images/" + imgList[game.randomNum]);
                break;
            case "lose":
                this.losses = this.losses + 1;
                setBanner("You Lose!  The word was " + this.currentWord);
                changeButtonView("show");
                this.playLose();
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
        //otherwise, wait for user to click "New Round" button
    };

});




