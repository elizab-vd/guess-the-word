const guessedLetters = document.querySelector(".guessed-letters");
                    //ul where guessed letters appear
const guessButton = document.querySelector(".guess");
                    //Guess Button (first)
const inputGuess = document.querySelector(".letter");
                    //text-input where players type their guess
const wordInProgress = document.querySelector(".word-in-progress");
                    //Empty p where word in progress appears
const guessesRemaining = document.querySelector(".remaining");
                    //p where number of remaining guesses will appear
const numGuess = document.querySelector(".remaining span"); 
                    //span in guessesRemaining that surrounds the number
const message = document.querySelector(".message");
                    //p where message will appear as user guesses
const playButton = document.querySelector(".play-again hide");
                    //hidden button appears to say "Play again!"
const word = "magnolia";
    //starting word to test game


    //STILL HAVE QUESTIONS ABOUT THE CIRCLES
const placeholder = function (word) {
    const placeholderCircles = [];
    for (const letter of word) {
        console.log(letter);
        placeholderCircles.push("●");
    }
    wordInProgress.innerText = placeholderCircles.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e){
    e.preventDefault();
    const inputLetter = document.inputGuess.value;
    console.log(inputLetter);
})
