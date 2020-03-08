window.onload = function()
{
    this.createElements();
    askToPlay(true);
};

const states = 
[
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "NewHamshire", "NewHamshire", "NewJersey",
    "NewMexico", "NewYork", "NorthCarolina", "NorthDakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "RhodeIsland", "SouthCarolina", "SouthDakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "WestVirginia", "Wisconsin,", "Wyoming"
];

var usedGuesses, word = []; //Seperate whole word and characters
var guess = [];
var lives = 6;
var message = `You have ${lives} guesses left.`;

var image = document.getElementById("livesPic");

var livesPic = ["./images/hang0.png", "./images/hang1.png", "./images/hang2.png",
                "./images/hang3.png", "./images/hang4.png", "./images/hang5.png", "./images/hang6.png"];

//Create/load letter buttons partial rights go to ostapische on stackoverflow
function createElements()
{
    // for (var i = 65; i <= 90; i++ ) 
    // {
    //     var holder = document.createElement("LI");
    //     var letter = String.fromCharCode(i);
    //     var button = document.createElement("BUTTON");
    //     button.innerHTML = letter;
    //     button.id = letter;
    //     holder.appendChild(button);
    //     button.addClass("letter", "active");
    //     button.addEventListener(click, playGame(this));
    //     document.querySelector(".buttons").appendChild(holder);
    // }
    // let letters = document.getElementById("alpha")[0];
    // for (i=65; i <= 90; i++)
    // {
    //     let button = document.createElement("button");
    //     button.innerHTML = String.fromCharCode(i);
    //     button.addEventListener ("onclick", playGame(button.innerHTML));
    //     letters.appendChild(button);
    // }
    
    refreshLives();
}

//Create word and user guess
function createWord()
{
    state = states[parseInt(Math.random() * 50 -1)];
    word = state.toUpperCase().split("");
    for(i = 0; i < state.length; i++)
    {
        guess.push("_");
    }
}

//Verify if user wants to play
function askToPlay(first)
{
    var play = first == true? confirm("Would you like to play a game of Hangman?") : confirm("Would you like to play again?");
    if (play == true)
    {
        createWord(); refresh();
    }
    else alert("Thanks for playing!");
}

playGame = () =>
{
    if (usedGuesses.includes(btn.id))
        message = `You have already
        guessed this letter. Please try again.\n You have ${lives} guesses left.`; //in keypress instances
    else
    {
        check(btn);
    }
}

check = (btn) =>
{
    document.getElementById(btn.id).disabled = true; //So that the user is unable to click
    if (word.includes(btn.id))
    {
        for (i = 0; i < word.length; i++)
        {
            if (btn.id == word[i])
            {
                guess[i] = word[i];
            }
        }
        message = `Correct!\n You have ${lives} guesses left.`;
    }
    else 
    {
        lives--;
        message = `Incorrect.\n You have ${lives} guesses left.`;
        refreshLives();
    }

    usedGuess.push(btn.id);

    if (lives == 0 || !word.includes("_"))
    endGame(lives);
}

//method starts a new game
function refresh()
{
    guess, word, usedGuesses = [];
    lives = 6;
    document.getElementsByClassName("letter").disabled = false;
    message = `You have ${lives} guesses left.`;
    refreshLives();
}
//method changes the hangman picture
function refreshLives()
{
    image.src = livesPic[lives];
    document.getElementById("myFigure").setAttribute("figCaption", message);
}

endGame = (winCondition) =>
{
    winCondition == true? alert("Congrats you correctly guessed the state!"): alert("You ran out of lives. Better luck next time!");
    askToPlay(false);
}

//allows user to click keypress as well as click onscreen button
document.addEventListener("keypress", function(e)
{
    if (e.keyCode >= 65 || e.keyCode <= 90)
    {
        playGame(e.keyCode);
    }
})