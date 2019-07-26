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
        // TODO Store answers as arrays and allow for any number of answers per question
        // (with a minimum of two answers)
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
let roundWon = false;
let roundLost = false;
let jokerUsed = false;
let correctAnswers = 0;
let falseAnswers = 0;

const roundAnswered = () => {
    return roundWon === true || roundLost === true;
}

buttonA.onclick = () => {
    answerCheck(buttonA, 'A')
}

buttonB.onclick = () => {
    answerCheck(buttonB, 'B')
}

buttonC.onclick = () => {
    answerCheck(buttonC, 'C')
}

buttonD.onclick = () => {
    answerCheck(buttonD, 'D')
}


const answerCheck = (button, userAnswer) => {
    if (roundAnswered()) {
        return;
    }

    if (userAnswer === questions[currentQuestionIndex].correctAnswer) {
        button.style.backgroundColor = '#8bc34ae6'; // GREEN COLOR
        roundWon = true;
        correctAnswers++;
    } else {
        button.style.backgroundColor = '#ec1749eb' // RED COLOR
        roundLost = true;
        falseAnswers++;
    }
    
    buttonA.style.cursor = 'initial';
    buttonB.style.cursor = 'initial';
    buttonC.style.cursor = 'initial';
    buttonD.style.cursor = 'initial';
    toggleButtonStatus(nextButton, 'active');

    if (jokerUsed === false && roundLost === true) {
        toggleButtonStatus(jokerButton, 'active');
    }
}

const toggleButtonStatus = (button, status) => {
    const buttonToSet = button;
    if (status === 'active') {
        buttonToSet.style.cursor = 'pointer';
        buttonToSet.classList.remove("inactiveButton")
        buttonToSet.classList.add("activeButton")
    } else if (status === 'inactive') {
        buttonToSet.style.cursor = 'initial';
        buttonToSet.classList.remove("activeButton")
        buttonToSet.classList.add("inactiveButton")
    }
}

jokerButton.onclick = () => {
    if (jokerUsed === false && roundLost === true) {
        resetButtons();
        falseAnswers--;
        jokerUsed = true;
        toggleButtonStatus(jokerButton, 'inactive');
        jokerButton.innerText = 'Try Again* (used)';
    }
}

nextButton.onclick = () => {
    if (currentQuestionIndex === (questions.length - 1) && roundAnswered()) {
        showScore();
    } else if (roundAnswered()) {
        currentQuestionIndex++;
        startNextQuestion();
    }
}

restartQuizButton.onclick = () => {
    startQuiz();
}

const showScore = () => {
    questionContainer.style.display = 'none';
    gameButtonContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    jokerButtonNote.style.display = 'none';
    correctAnswersButton.innerText = correctAnswers;
    falseAnswersButton.innerText = falseAnswers;
}

const loadQuestionHtml = (question) => {
    questionTitle.innerText = question.questionTitle;
    questionText.innerText = question.questionText;
    buttonA.innerText = question.answerA;
    buttonB.innerText = question.answerB;
    buttonC.innerText = question.answerC;
    buttonD.innerText = question.answerD;
}

const hideEmptyAnswers = (button) => {
    if (button.innerHTML === 'undefined') {
        button.style.display = 'none'
    }
}

const updateNextButton = () => {
    if (currentQuestionIndex === (questions.length - 1)) {
        nextButton.innerText = 'Show final score'
    }
}

const resetButtons = () => {
    buttonA.style.cursor = 'pointer';
    buttonB.style.cursor = 'pointer';
    buttonC.style.cursor = 'pointer';
    buttonD.style.cursor = 'pointer';
    buttonA.style.backgroundColor = '#fbfbfb';
    buttonB.style.backgroundColor = '#fbfbfb';
    buttonC.style.backgroundColor = '#fbfbfb';
    buttonD.style.backgroundColor = '#fbfbfb';
    buttonA.style.display = '';
    buttonB.style.display = '';
    buttonC.style.display = '';
    buttonD.style.display = '';
    hideEmptyAnswers(buttonA);
    hideEmptyAnswers(buttonB);
    hideEmptyAnswers(buttonC);
    hideEmptyAnswers(buttonD);
    toggleButtonStatus(jokerButton, 'inactive')
    toggleButtonStatus(nextButton, 'inactive')
    roundLost = false;
    roundWon = false;
}

const startQuiz = () => {
    currentQuestionIndex = 0;
    loadQuestionHtml(questions[currentQuestionIndex]);
    resetButtons();
    jokerUsed = false;
    correctAnswers = 0;
    falseAnswers = 0;
    correctAnswersButton.innerText = correctAnswers;
    falseAnswersButton.innerText = falseAnswers;
    jokerButton.innerText = 'Try Again*'
    jokerButtonNote.style.display = ''
    nextButton.innerText = "Next Question"
    questionContainer.style.display = 'block';
    gameButtonContainer.style.display = '';
    scoreContainer.style.display = 'none';
}

const startNextQuestion = () => {
    loadQuestionHtml(questions[currentQuestionIndex]);
    resetButtons();
}

startQuiz();