window.onload = function()
{
    createElements();
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

var usedGuesses = [];
var word = [];
var guess = [];
var lives = 6;
var message = `You have ${lives} guesses left.`;

var image = document.getElementById("livesPic");

// var livesPic = new Array(7);
// for (i=0; i < 7; i++)
// {
//     livesPic[i] = new Image();
//     livesPic[i].src = `./images/hang${i}.png`;
// }
// var livesPic = ["./images/hang0.png", "./images/hang1.png", "./images/hang2.png",
//                 "./images/hang3.png", "./images/hang4.png", "./images/hang5.png", "./images/hang6.png"];

//Create/load letter buttons partial rights go to ostapische on stackoverflow
function createElements()
{
    // for (var i = 65; i <= 90; i++ ) 
    // {
    //     var holder = document.createElement("li");
    //     var letter = String.fromCharCode(i);
    //     var button = document.createElement("button");
    //     button.innerHTML = letter;
    //     button.id = letter;
    //     holder.append(button);
    //     button.addClass("letter", "active");
    //     button.addEventListener(onclick, playGame(this));
    //     document.querySelector("alpha").append(holder);
    // }
    var html = '';
    var c;
    for (var i = 65; 90 >= i; i++) 
    {// A-65, Z-90
        c = String.fromCharCode(i);
        html += '<button onclick="checkGuess(\'' + c + '\');" class="letters" id="' + c + '">' + c + '</button>'; //changed from playGame to checkGuess method
    }
    document.getElementById('alpha').innerHTML = html;
        
    refreshLives();
}

//Create word and user guess
function createWord()
{
    var state = states[parseInt(Math.random() * 50 -1)];
    word = state.toUpperCase().split("");
    for(i = 0; i < state.length; i++)
    {
        guess.push("_");
    }
}

//Verify if user wants to play
function askToPlay(first)
{
    setTimeout(function()
    {
        var play = first == true? confirm("Would you like to play a game of Hangman?") : confirm("Would you like to play again?");
        if (play == true)
        {
            refresh(); createWord();
            refreshLives(); //workaround to display word and lives corrctly
        }
        else alert("Thanks for playing!");
    },20)
}

// playGame = (btn) => //removed because time constraints with keypress
// {
//     if (usedGuesses.includes(btn))
//     {
//         message = `You have already
//         guessed this letter. Please try again.\n You have ${lives} guesses left.`; //in keypress instances
//     }
//     else
//     {
//         checkGuess(btn);
//     }
// }

function checkGuess(btn)
{   
    btn = btn.toUpperCase();
    document.getElementById(btn).disabled = "disabled"; //So that the user is unable to click
    if (word.includes(btn))
    {
        for (i = 0; i < word.length; i++)
        {
            if (btn == word[i])
            {
                guess[i] = word[i];
            }
        }
        message = `Correct!\n You have ${lives} guesses left.`;
    } else 
    {
        lives--;
        message = `Incorrect.\n You have ${lives} guesses left.`;
    }

    refreshLives();
    // if (lives == 0) //workaround
    // document.getElementById("livesPic").src = `./images/hang0.png`;
    usedGuesses.push(btn);

    if (lives < 1 || word.every(function(value, index) {return value === guess[index]})) //accurately compare arrays
    {
        endGame(lives);
    }
}

//method starts a new game
function refresh()
{
    for (i = 0; i < usedGuesses.length; i++)
    {
        document.getElementById(usedGuesses[i]).removeAttribute("disabled"); //Workaround to re-enable buttons upon new game
    }
    guess = [];
    word = [];
    usedGuesses = [];
    lives = 6;
    message = `You have ${lives} guesses left.`;
    refreshLives();
}

//method changes the hangman picture
function refreshLives()
{
    document.getElementById("livesPic").src = `./images/hang${lives}.png`;
    document.getElementById("livesMessage").innerHTML = message;
    document.getElementById("guess").innerHTML = guessToString();
}
endGame = (winCondition) =>
{
    winMessage = winCondition > 0? "Congrats you correctly guessed the state!": "You ran out of lives. Better luck next time!";
    if (winCondition > 0) document.getElementById("livesPic").src = `./images/win${lives}.png`;
    document.getElementById("winMessage").innerHTML = winMessage;
    askToPlay(false);
}

//Prints out the word
function guessToString()
{   
    var str = "";
    for (i = 0; i < guess.length; i++)
    {
        str += lives == 0? word[i]: guess[i]; //should output correct word if user runs out of guesses
        str += " "
    }
    return str;
}

//allows user to click keypress as well as click onscreen button
// document.addEventListener("keypress", function(e) //removed because of time constraints
// {
//     if (e.keyCode >= 65 && e.keyCode <= 90)
//     {
//         playGame(String.fromCharCode(e.keyCode));
//     }
// })