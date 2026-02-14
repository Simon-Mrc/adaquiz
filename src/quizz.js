import "./style.css";
import quiz from "./quiz-femmes-scientifiques.json";

let a = 0;
let rep = 0;
let nbRights = 0;

document.querySelector("#button0").textContent = quiz.questions[a].options[0];
document.querySelector("#button1").textContent = quiz.questions[a].options[1];
document.querySelector("#button2").textContent = quiz.questions[a].options[2];
document.querySelector("#button3").textContent = quiz.questions[a].options[3];
document.querySelector("#question").textContent = quiz.questions[a].question;

let answerButton = document.querySelectorAll(".buttonQuizz");
let nextButton = document.querySelector("#nextButton");
nextButton.addEventListener("click", nextQuestion);

for (let i = 0; i < answerButton.length; i = i+1) {
    answerButton[i].addEventListener("click", function(){
        rep = i;
        checkAnswer();
    });
}
;
function initiate(){
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].textContent = quiz.questions[a].options[i];
    }
    document.querySelector("#question").textContent = quiz.questions[a].question;
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].disabled = false;
        };
    document.querySelector("#result").textContent = "";

}
;
function checkAnswer(){
    if(rep == quiz.questions[a].correctIndex){
        document.querySelector("#result").textContent = "yeah right answer";
        nbRights = nbRights + 1;
    }
    else{
        document.querySelector("#result").textContent = "bouhou wrong answer";
    }
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].disabled = true;
        };
    a=a+1;
}
;
function nextQuestion(){
    if (a == quiz.questions.length){
        endOfQuizz();
        return;
    }
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].textContent = quiz.questions[a].options[i];
    }
    document.querySelector("#question").textContent = quiz.questions[a].question;
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].disabled = false;
        };
    document.querySelector("#result").textContent = "";
}
;
function endOfQuizz(){
    //document.querySelectorAll(".duringQuizz").classList.add(`hidden`);
    //document.querySelectorAll(".afterQuizz").classList.remove(`hidden`);
    nextButton.classList.add(`restart`);
    let restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", restart());
}
;
function restart(){
   // document.querySelector(".duringQuizz").classList.remove(`hidden`);
   // document.querySelector(".afterQuizz").classList.add(`hidden`);
    nextButton.classList.remove(`restart`);
    a = 0;
    rep = 0;
    nbRights = 0;
    initiate();
}