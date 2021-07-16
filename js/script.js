const guessedLettersElement = document.querySelector(".guessed-letters");
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
let word = "magnolia";
    //starting word to test game
const guessedLetters = [];
    //array for letters that are guessed
let remainingGuesses= 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");

    const words = await res.text();
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
   
    placeholder(word);
};

getWord();






const placeholder = function (word) {
    const placeholderCircles = [];
    for (const letter of word) {
        console.log(letter);
        placeholderCircles.push("●");
    }
    wordInProgress.innerText = placeholderCircles.join("");
};


guessButton.addEventListener("click", function (e){
    e.preventDefault();

    message.innerText = "";

    const guess  = inputGuess.value;

    const goodGuess = validateInput(guess);
    console.log(goodGuess);

    if(goodGuess){
        makeGuess(guess);
    }
     inputGuess.value = "";

});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if(input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if(input.length > 1){
        message.innerText = "Please enter a single letter.";
    } else if(!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    if(guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter. Please enter another.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessedLettersDisplay();
        updateGuessesRemaining(guess);
        showWordInProgress(guessedLetters);
    }
};

//updates page with the letters the player guesses
const guessedLettersDisplay = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//replaces circle symbols with the correct letters guessed
const showWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for(const letter of wordArray){
        if(guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }

    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)){
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
        
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class ="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        numGuess.innerHTML = `${remainingGuesses} guess`;
    } else {  
        numGuess.innerHTML = `${remainingGuesses} guesses`;
       
    }

};

//checks if player successfully guessed the word and won the game
const checkIfWin = function () {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
};