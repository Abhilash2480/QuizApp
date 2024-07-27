const questions=[
    {
        question:"Who is the only player to have scored 100 international centuries?",
        answers:[
            {text:"Ricky Ponting",correct:false},
            {text:"Brian Lara",correct:false},
            {text:"Sachin Tendulkar",correct:true},
            {text:"Virat Kohli",correct:false},
        ]
    },
    {
        question:"Which country won the first ICC Cricket World Cup in 1975?",
        answers:[
            {text:"Australia",correct:false},
            {text:"West Indies",correct:true},
            {text:"India",correct:false},
            {text:"England",correct:false},
        ]
    },
    {
        question:"Who holds the record for the highest individual score in a One Day International (ODI) match?",
        answers:[
            {text:"Chris Gayle",correct:false},
            {text:"Martin Guptill",correct:false},
            {text:"Virender Sehwag",correct:false},
            {text:"Rohit Sharma",correct:true},
        ]
    },
    {
        question:" Which format of cricket is played over five days?",
        answers:[
            {text:"Test cricket",correct:true},
            {text:"One Day International (ODI)",correct:false},
            {text:"Twenty20 (T20)",correct:false},
            {text:"The Hundred",correct:false},
        ]
    },
    {
        question:" Who was the captain of the Indian cricket team that won the 1983 Cricket World Cup?",
        answers:[
            {text:"Sunil Gavaskar",correct:false},
            {text:"Kapil Dev",correct:true},
            {text:"Ravi Shastri",correct:false},
            {text:"Mohinder Amarnath",correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
       const selectbtn=e.target;
       const iscorrect=selectbtn.dataset.correct==="true";
       if(iscorrect){
        selectbtn.classList.add("correct")
        score++;
       }else{
        selectbtn.classList.add("incorrect")
       }
       Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
       });
       nextButton.style.display="block"
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block";
}   

function handleNextButton(){
     currentQuestionIndex++;
     if(currentQuestionIndex<questions.length){
        showQuestions();
     }else{
        showScore();
     }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
