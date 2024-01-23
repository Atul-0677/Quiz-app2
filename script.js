const questions=[
    {
        question:"Which is larget animal in the world?",
        answers:[
            {text : "Shark" , correct:false},
            {text : "Blue Whale" , correct: true},
            {text : "Elephant" , correct:false},
            {text : "Giraffe" , correct:false},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text : "Asia" , correct:false},
            {text : "Australia" , correct: true},
            {text : "Arctic" , correct:false},
            {text : "Africa" , correct:false}, 
        ]
    },
    {
        question:"Which is world fastest car in drag race?",
        answers:[
            {text : "Bugatti" , correct:false},
            {text : "BMW F90 M5 CS" , correct: true},
            {text : "Mercides" , correct:false},
            {text : "Audi" , correct:false}, 
        ]
    },
    {
        question:"Which is formula of force?",
        answers:[
            {text : "F = m* q" , correct:false},
            {text : "F = m * a" , correct: true},
            {text : "F = q1q2/d" , correct:false},
            {text : "none of these" , correct:false}, 
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            score+1;
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};


nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});



startQuiz();