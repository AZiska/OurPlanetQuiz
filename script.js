const buttonA = document.getElementById('buttonA');
const buttonB = document.getElementById('buttonB');
const buttonC = document.getElementById('buttonC');
const buttonD = document.getElementById('buttonD');
const questionContainer = document.getElementById('questionContainer');
const questionTitle = document.getElementById('questionTitle');
const questionText = document.getElementById('questionText');
const scoreContainer = document.getElementById('scoreContainer');
const nextButton = document.getElementById('nextButton');
const jokerButton = document.getElementById('jokerButton');
const jokerButtonNote = document.getElementById('jokerButtonNote');
const correctAnswersButton = document.getElementById('correctAnswers_counter');
const falseAnswersButton = document.getElementById('falseAnswers_counter');
const restartQuizButton = document.getElementById('restartQuizButton');
const gameButtonContainer = document.getElementById('gameButtonContainer');

const questions = [
    {
        questionTitle: 'Question 1:',
        questionText: 'What is the largest ocean on our planet?',
        answerA: 'A: Indian Ocean',
        answerB: 'B: Atlantic Ocean',
        answerC: 'C: Pacific Ocean',
        answerD: 'D: Antarctic Ocean',
        correctAnswer: 'C',

    },
    {
        questionTitle: 'Question 2:',
        questionText: 'How many legs do insects have?',
        answerA: 'A: 4',
        answerB: 'B: 6',
        answerC: 'C: 8',
        answerD: 'D: more than 10',
        correctAnswer: 'B'
    },
    {
        questionTitle: 'Question 3:',
        questionText: 'What is the smallest continent?',
        answerA: 'A: Africa',
        answerB: 'B: Europe',
        answerC: 'C: South America',
        answerD: 'D: Australia',
        correctAnswer: 'D'
    },
    {
        questionTitle: 'Question 4:',
        questionText: 'When standing on the equator you weigh less than when standing on one of the poles.',
        answerA: 'A: true',
        answerB: 'B: false',
        correctAnswer: 'A'
    },
    {
        questionTitle: 'Question 5:',
        questionText: 'How old is the Earth?',
        answerA: 'A: 4.54 million years',
        answerB: 'B: 8.54 million years',
        answerC: 'C: 4.54 billion years',
        answerD: 'D: 8.54 billion years',
        correctAnswer: 'C'
    },
]

let currentQuestionIndex = 0;
let buttonClicks = 0;
let roundAnswered = false;
let roundWon = false;
let roundLost = false;
let jokerUsed = false;
let correctAnswers = 0;
let falseAnswers = 0;


buttonA.onclick = () => {
    if (buttonClicks === 0) {
        answerCheck(buttonA, 'A')
    }
}

buttonB.onclick = () => {
    if (buttonClicks === 0) {
        answerCheck(buttonB, 'B')
    }
}

buttonC.onclick = () => {
    if (buttonClicks === 0) {
        answerCheck(buttonC, 'C')
    }
}

buttonD.onclick = () => {
    if (buttonClicks === 0) {
        answerCheck(buttonD, 'D')
    }
}


const answerCheck = (button, userAnswer) => {
    if (userAnswer === questions[currentQuestionIndex].correctAnswer) {
        button.style.backgroundColor = '#8bc34ae6'; // GREEN COLOR
        roundWon = true;
        correctAnswers++;
        correctAnswersButton.innerHTML = correctAnswers;
    } else {
        button.style.backgroundColor = '#ec1749eb' // RED COLOR
        roundLost = true;
        falseAnswers++;
        falseAnswersButton.innerHTML = falseAnswers;
    }
    buttonA.style.cursor = 'initial';
    buttonB.style.cursor = 'initial';
    buttonC.style.cursor = 'initial';
    buttonD.style.cursor = 'initial';
    nextButton.style.cursor = 'pointer';
    buttonClicks++
    roundAnswered = true;
}

jokerButton.onclick = () => {
    if (jokerUsed === false && roundLost === true) {
        resetButtons()
        falseAnswers--;
        falseAnswersButton.innerHTML = falseAnswers;
        jokerUsed = true;
        jokerButton.style.backgroundColor = '#3642429e';
        jokerButton.innerHTML = 'Try Again* (used)'
    }
}

nextButton.onclick = () => {
    if (currentQuestionIndex === (questions.length - 1) && roundAnswered === true) {
        showScore()
    } else if (roundAnswered === true) {
        currentQuestionIndex++;
        startNextQuestion()
    }
}

restartQuizButton.onclick = () => {
    startQuiz();
}

const showScore = () => {
    questionContainer.style.display = 'none';
    gameButtonContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    restartQuizButton.style.cursor = 'pointer'
    jokerButtonNote.style.display = 'none';
}

const loadQuestionHtml = (question) => {
    questionTitle.innerHTML = question.questionTitle;
    questionText.innerHTML = question.questionText;
    buttonA.innerHTML = question.answerA;
    hideEmptyAnswers(buttonA);
    buttonB.innerHTML = question.answerB;
    hideEmptyAnswers(buttonB);
    buttonC.innerHTML = question.answerC;
    hideEmptyAnswers(buttonC);
    buttonD.innerHTML = question.answerD;
    hideEmptyAnswers(buttonD);
}

const hideEmptyAnswers = (button) => {
    if(button.innerHTML === 'undefined') {
        button.style.display = 'none'
    }
}

const updateNextButton = () => {
    nextButton.style.cursor = 'initial';
    if(currentQuestionIndex === (questions.length - 1)) {
        nextButton.innerHTML = 'Show final score'
    }
}

const resetButtons = () => {
    buttonA.style.cursor = 'pointer';
    buttonB.style.cursor = 'pointer';
    buttonC.style.cursor = 'pointer';
    buttonD.style.cursor = 'pointer';
    updateNextButton();
    buttonA.style.backgroundColor = '#fbfbfb';
    buttonB.style.backgroundColor = '#fbfbfb';
    buttonC.style.backgroundColor = '#fbfbfb';
    buttonD.style.backgroundColor = '#fbfbfb';
    buttonA.style.display = '';
    buttonB.style.display = '';
    buttonC.style.display = '';
    buttonD.style.display = '';
    buttonClicks = 0;
    restartQuizButton.style.cursor = 'initial'
}

const startQuiz = () => {
    resetButtons();
    loadQuestionHtml(questions[currentQuestionIndex]);
    roundAnswered = false;
    jokerUsed = false;
    roundLost = false;
    roundWon = false;
    correctAnswers = 0;
    falseAnswers = 0;
    currentQuestionIndex = 0;
    correctAnswersButton.innerHTML = correctAnswers;
    falseAnswersButton.innerHTML = falseAnswers;
    jokerButton.style.backgroundColor = '#163f40';
    jokerButton.innerHTML = 'Try Again*'
    jokerButtonNote.style.display = ''
    nextButton.innerHTML = "Next Question"
    questionContainer.style.display = 'block';
    gameButtonContainer.style.display = ''; 
    scoreContainer.style.display = 'none';
}

const startNextQuestion = () => {
    resetButtons();
    loadQuestionHtml(questions[currentQuestionIndex]);
    roundAnswered = false;
    roundLost = false;
    roundWon = false;
}

startQuiz()


// what is difference between:
// questions[currentQuestionIndex] and currentQuestion variable?
// let currentQuestion = questions[currentQuestionIndex];