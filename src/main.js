import "./style.css";
import quiz1 from "./quiz-femmes-scientifiques.json";
import quiz2 from "./quiz-wealthy-women.json";
import quiz3 from "./quiz-athlets-women.json";
let quiz ;

// js for part before quizz started
document.querySelector("#mainTitle1").textContent = quiz1.title;
document.querySelector("#mainTitle2").textContent = quiz2.title;
document.querySelector("#mainTitle3").textContent = quiz3.title;
let startButton = document.querySelectorAll(".startButton");
for(let i = 0 ; i < startButton.length ; i=i+1){
    startButton[i].addEventListener("click",function(){
        quiz = eval(`quiz${i + 1}`); // `` is for interpretation as a string eval() is for running string as code
        initiate();
    });
}
console.log(startButton);

document.querySelector("#quizzHeaderBar").classList.add(`disapear`);

// js for starting the quizz here
let step = 0;  // What part of the quizz you are in
let rep = 0;   // Index to check if answer is right
let nbRights = 0; 

// Creation of node of button. Fill all of them with listeners and response chosen
let answerButton = document.querySelectorAll(".buttonQuizz"); 
for (let i = 0; i < answerButton.length; i = i+1) {
    answerButton[i].addEventListener("click", function(){
        rep = i;
        checkAnswer();
    });
};

// Creation of button to display next question
let nextButton = document.querySelector("#nextButton");
nextButton.addEventListener("click", nextQuestion);

// Creation of button to restart the quizz
let restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click", restart);

// Creation of main page button
let mainPageButton = document.querySelector("#mainPageButton");
mainPageButton.addEventListener("click", mainPage);

let backToMain = document.querySelector(`#backToMain`);
backToMain.addEventListener(`click`, mainPage);

// Function to initiate the quizz
function initiate(){
    document.querySelector("#quizzHeader").textContent = quiz.title;
    step = 0 ;
    rep = 0 ;
    nbRights = 0;
// fill buttons with appropriate answers
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].textContent = quiz.questions[step].options[i];
    }
// fill question for current step
    document.querySelector("#question").textContent = quiz.questions[step].question;
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].disabled = false;
        };
    document.querySelector("#result").textContent = "";
// hide beforeQuizz page and show duringQuizz one
    document.querySelector(".beforeQuizz").classList.add(`hidden`);
    document.querySelector(".duringQuizz").classList.remove(`hidden`);
    document.querySelector("#nextButton").classList.add(`ghost`);
    document.querySelector("#quizzHeaderBar").classList.remove(`disapear`);
};

// check if rep choosen by the button match the current quizz step
function checkAnswer(){
    if(rep == quiz.questions[step].correctIndex){
        document.querySelector("#result").textContent = "yeah right answer";
        nbRights = nbRights + 1;
    }
    else{
        document.querySelector("#result").textContent = `Wrong answer, correct answer was ${quiz.questions[step].options[quiz.questions[step].correctIndex]}`;
    }
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].disabled = true;
        };
    document.querySelector("#nextButton").classList.remove(`ghost`);  
    step = step + 1;
};

// function to trigger the next question. Change the value of all stuff
function nextQuestion(){
    if (step == quiz.questions.length){
        endOfQuizz();
        return;
    }
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].textContent = quiz.questions[step].options[i];
    }
    document.querySelector("#question").textContent = quiz.questions[step].question;
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].disabled = false;
        };
    document.querySelector("#result").textContent = "";
    document.querySelector("#nextButton").classList.add(`ghost`);
};

// hide all content from before and duringQuizz and show afterQuizz
function endOfQuizz(){
    document.querySelector(".duringQuizz").classList.add(`hidden`);
    const pourcentage = Math.floor(nbRights*100/quiz.questions.length);
    console.log(pourcentage);
    if (pourcentage == 0){
        document.querySelector("#resultTitle").textContent = "Oups ! Tu n'as trouvé aucune bonne réponse 😱" ;
    }
    else if (0 < pourcentage && pourcentage < 50){
        document.querySelector("#resultTitle").textContent = "Aïe, tu as beaucoup d'erreurs, tu devrais réessayer 😅" ;
    }
    else if (50 <= pourcentage && pourcentage < 80){
        document.querySelector("#resultTitle").textContent = "C'est pas mal, mais tu peux encore t'améliorer 💪";
    }
    else if (80 <= pourcentage && pourcentage < 100){
        document.querySelector("#resultTitle").textContent = "C'est bien, tu as fait peu d'erreurs 😉";
    }
    else if (pourcentage == 100){
        document.querySelector("#resultTitle").textContent = "Aucune erreur, c'est parfait 😎";
    }
// Use of innerHtml for line changing manipulation
    document.querySelector("#endScore").textContent = `Ton score est de `;
    document.querySelector("#nbFinal").textContent = nbRights + `/` + quiz.questions.length;
    document.querySelector(".afterQuizz").classList.remove(`hidden`);
    document.querySelector("#quizzHeaderBar").classList.add(`disapear`);
};

// Remove hidden from beforeQuizz to prevent failure from initiate function
function restart(){
    document.querySelector(".afterQuizz").classList.add(`hidden`);
    document.querySelector(".beforeQuizz").classList.remove(`hidden`);
    initiate();
};

function mainPage(){
    document.querySelector("#quizzHeaderBar").classList.add(`disapear`);
    document.querySelector(".duringQuizz").classList.add(`hidden`);
    document.querySelector(".afterQuizz").classList.add(`hidden`);
    document.querySelector(".beforeQuizz").classList.remove(`hidden`);
}