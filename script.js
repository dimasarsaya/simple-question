
// Put your answer and question here
const questions = [
    {
        question: "Hewan apa yang berkaki 4?",
        answers: [
            {text: "Sapi", correct: true},
            {text: "Ayam", correct: false},
            {text: "Ular", correct: false},
            {text: "Laba-Laba", correct: false},
        ] 
    },
    {
        question: "1+1 = ?",
        answers: [
            {text: "4", correct: false},
            {text: "5", correct: false},
            {text: "2", correct: true},
            {text: "7", correct: false},
        ] 
    },
    {
        question: "Benua Terbesar Di Bumi?",
        answers: [
            {text: "Asia", correct: true},
            {text: "Afrika", correct: false},
            {text: "Uganda", correct: false},
            {text: "Eropa", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


// memunculkan next button setelah mengerjakan soal
function startQuiz (){           
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}


// function showQuestion
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); 
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

// menghapus html pertanyaan
function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}



// betul atau salah jawaban
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }


    // disable buttons if already selected and popup next button
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `Nilai mu adalah ${score} dari ${questions.length} soal!`;
    nextButton.innerHTML = "Mulai lagi";
    nextButton.style.display = "block";
}


// handle next button
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



// Next question button
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})


startQuiz ();

