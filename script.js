var wordH2 = document.querySelector("#word");
var timeH3 = document.querySelector("#time-left");
var winsH3 = document.querySelector("#wins");
var lossesH3 = document.querySelector("#losses");
var words = ["manatee","fanatee","anchormanatee","manakeys","syzygy"];
var randomWord = "";
var randomWordArr = [];
var userGuess = [];
var isPlaying =false;
var countdownTimer;
var secondsLeft = 10;
//remember wins/losses in localstorage
var wins= localStorage.getItem("wins")|| 0;
var losses = localStorage.getItem("losses") || 0;

winsH3.textContent = wins;
lossesH3.textContent = losses;


// start game game when button is clicked
//randomly select word
function startGame(){
    userGuess=[];
    secondsLeft=10;
    timeH3.textContent=secondsLeft;
    randomWord = words[Math.floor(Math.random()*words.length)];
    console.log("randomword:",randomWord);
    randomWordArr = randomWord.split("");
    console.log("randomWordArr:",randomWordArr);
    // display an "_" for each letter
    for (let i = 0; i < randomWordArr.length; i++) {
        userGuess.push("_");
    }
    console.log('userGuess: ',userGuess)
    wordH2.textContent=userGuess.join("");
    isPlaying=true;
    // start countdown timer at 10s
    countdownTimer = setInterval(function(){
        secondsLeft--;
        timeH3.textContent=secondsLeft;
        if(secondsLeft<=0){
            //if time runs out, lose
            clearInterval(countdownTimer);
            timeH3.textContent = "you lose!"
            isPlaying=false;
            losses++;
            localStorage.setItem("losses",losses)
            lossesH3.textContent = losses;
        }
    },1000)
}
// while playing, check for keystrokes
document.addEventListener("keyup",function(event){
    if(!isPlaying){
        return;
    }
    var letterPressed = event.key;
    console.log(letterPressed)
    if(randomWordArr.includes(letterPressed)){
        //if in word, update page to show correct letters
        console.log("letter exists in word!")
        for (let i = 0; i < randomWordArr.length; i++) {
            if(letterPressed===randomWordArr[i]){
                userGuess[i]=letterPressed
            }
        }
        console.log('userGuess: ',userGuess)
        wordH2.textContent=userGuess.join("");
        //if all letters revealed, win
        if(userGuess.join("")===randomWordArr.join("")){
            timeH3.textContent = "you win!"
            isPlaying=false;
            clearInterval(countdownTimer);
            wins++;
            localStorage.setItem("wins",wins);
            winsH3.textContent = wins;
        }

    }
})

document.querySelector("#start-game").addEventListener("click",function(){
    if(!isPlaying){
        startGame();
    }
})
//if clear scores clicked, reset wins/losses in localstorage
document.querySelector("#reset").addEventListener("click",function(){
    localStorage.setItem("wins",0);
    localStorage.setItem("losses",0);

})



