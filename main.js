const startQuiz = document.querySelector("#startQuizBtn");
const continueBtn = document.querySelector("#continueBtn");
const quizStartPage = document.querySelector(".quiz_start_page");
const quizRulesPage = document.querySelector(".quiz_Rules_page");
const quizPage = document.querySelector(".quiz_page");
const question = document.querySelector(".question");
const optionDiv = document.querySelector(".option-div");

const restartBtn=document.querySelector("#restart")

const scorePage=document.querySelector(".score_page")
const resultText=document.querySelector(".result_text")

const timeCount = document.querySelector(".timeCount");

const nextBtn = document.querySelector(".nextBtn");

let timeLeft = 15;
let timer;


let InitialScore=0;

startQuiz.addEventListener("click", () => {
  quizStartPage.style.display = "none";
  quizRulesPage.style.display = "block";
});

continueBtn.addEventListener("click", () => {
  quizRulesPage.style.display = "none";
  quizPage.style.display = "block";
  showQuestion();

  let timeLeft = 15;
  timeCount.textContent = timeLeft;
  startTime();
});

let currentQuizIndex = 0;

function startTime() {
  clearInterval(timer);
  timeLeft = 15; 
  timeCount.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeCount.textContent = timeLeft;

    if (timeLeft < 0) {
      clearInterval(timer);
      timeCount.textContent = "time up";
      disabledOption();
    }
  }, 1000);
}

function disabledOption() {
  let optionElements = document.querySelectorAll(".option");
  optionElements.forEach((option) => {
    option.classList.add("disabled"); 
    option.style.backgroundColor = "#ccc";
    option.style.pointerEvents = "none"; 
    option.style.opacity = "0.6"; 
  });
}

function showQuestion() {
  if (quizs && quizs.length > 0) {
    const quiz = quizs[currentQuizIndex];

    /* for (let i = 0; i < quiz.options.length; i++) {
      optionSelected(quiz.options[i]);
    } */

    question.innerHTML = `<p>${quiz.quizName}</p>`;

    optionDiv.innerHTML = quiz.options
      .map(
        (option, index) => `<div class="options">
    <p class="option" data-index="${index}">${option}</p>
    </div>`
      )
      .join("");

    const optionElements = document.querySelectorAll(".option");
    optionElements.forEach((optionElement) => {
      optionElement.addEventListener("click", function () {
        optionSelected(this.getAttribute("data-index"));
      });
    });

    /* const quizItem = quizs[currentQuizIndex];

  for (let index = 0; index < quizItem.length; index++) {
    quizItem[index].setAttribute("onClick",optionSelected(index));
  }
 */
  }
}
nextBtn.addEventListener("click", () => {
  currentQuizIndex++;
  if (currentQuizIndex < quizs.length) {
    showQuestion();
    startTime();
  }else{
    scorePageFn();
  }
   
});

function optionSelected(answerIndex) {
  clearInterval(timer)
  const quiz = quizs[currentQuizIndex];
  console.log(quiz.answer);

  const selectedOption = quiz.options[answerIndex];
  const optionsElements = document.querySelectorAll(".option");

  const selectedOptionElement = Array.from(optionsElements).find(
    (option) => option.getAttribute("data-index") === answerIndex.toString()
  );

  if (selectedOptionElement) {
    if (selectedOption === quiz.answer) {
      InitialScore++
      selectedOptionElement.style.backgroundColor = "black";
      selectedOptionElement.style.color = "white";

    } else {
      selectedOptionElement.style.backgroundColor = "red";
      selectedOptionElement.style.color = "white";

      optionsElements.forEach((option) => {
        if (option.textContent === quiz.answer) {
          option.style.backgroundColor = "black";
          option.style.color = "white";
        }
      });
    }
  } else {
    console.error("Option element not found");
  }
}

function scorePageFn(){
  quizPage.style.display = "none";
  scorePage.style.display = "block";
  resultText.textContent=`You got ${InitialScore} out of ${quizs.length} correct!`;
}

restartBtn.addEventListener("click",function(){
  currentQuizIndex=0;
  InitialScore=0;
  quizStartPage.style.display="block";
  scorePage.style.display = "none";

})