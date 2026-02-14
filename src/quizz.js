import "./style.css";
import quiz from "./quiz-femmes-scientifiques.json";

let a = 0;
let rep = 0;
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

function checkAnswer(){
    
    a=a+1;
    console.log(a);
    console.log(rep);
}

function nextQuestion(){
    for (let i = 0; i < answerButton.length; i = i+1) {
        answerButton[i].textContent = quiz.questions[a].options[i];
    }
    document.querySelector("#question").textContent = quiz.questions[a].question;
}
