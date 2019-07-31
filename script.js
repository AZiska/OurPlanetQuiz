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
const answerContainer = document.getElementById('answerContainer');

const questions = [
    {
        questionTitle: 'Question 1:',
        questionText: 'What is the largest ocean on our planet?',
        answers: ['Indian Ocean', 'Atlanctic Ocean', 'Pacific Ocean', 'Antarctic Ocean'],
        correctAnswerIndex: 2
    },
    {
        questionTitle: 'Question 2:',
        questionText: 'How many legs do insects have?',
        answers: ['2 like humans', '4', '6', '8', 'more than 10'],
        correctAnswerIndex: 2
    },
    {
        questionTitle: 'Question 3:',
        questionText: 'What is the smallest continent?',
        answers: ['Africa', 'Europe', 'South America', 'Australia'],
        correctAnswerIndex: 3
    },
    {
        questionTitle: 'Question 4:',
        questionText: 'When standing on the equator you weigh less than when standing on one of the poles.',
        answers: ['true', 'false'],
        correctAnswerIndex: 0
    },
    {
        questionTitle: 'Question 5:',
        questionText: 'How old is the Earth?',
        answers: ['4.54 million years', '8.54 million years', '4.54 billion years', '8.54 billion years'],
        correctAnswerIndex: 2
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

const answerCheck = (button, userAnswer) => {
    if (roundAnswered()) {
        return;
    }

    if (userAnswer === questions[currentQuestionIndex].correctAnswerIndex) {
        button.style.backgroundColor = '#8bc34ae6'; // GREEN COLOR
        roundWon = true;
        correctAnswers++;
    } else {
        button.style.backgroundColor = '#ec1749eb' // RED COLOR
        roundLost = true;
        falseAnswers++;
    }

    setButtonCursor('initial')
    toggleButtonStatus(nextButton, 'active');

    if (!jokerUsed && roundLost === true) {
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
    if (jokerUsed){
        return
    } else if (!jokerUsed && roundLost === true) {
        resetButtons();
        falseAnswers--;
        jokerUsed = true;
        toggleButtonStatus(jokerButton, 'inactive');
        jokerButton.innerText = 'Try Again* (used)';
    }
    setButtonCursor('pointer')
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

const questionIndexToLetter = (questionIndex) => {
    return String.fromCharCode(questionIndex + 65);
}

const loadQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex]

    questionTitle.innerText = currentQuestion.questionTitle;
    questionText.innerText = currentQuestion.questionText;

    const answersToLoad = currentQuestion.answers

    answerContainer.innerHTML = '';
    for (let i = 0; i < answersToLoad.length; i++) {
        const currentLetter = questionIndexToLetter(i)
        const currentAnswer = answersToLoad[i]
        const answerButton = document.createElement('button');
        answerButton.innerText = `${currentLetter}: ${currentAnswer}`;
        answerButton.classList.add('answerButton');
        answerButton.onclick = () => { answerCheck(answerButton, i) };
        answerContainer.appendChild(answerButton);
    }
}

const updateNextButton = () => {
    if (currentQuestionIndex === (questions.length - 1)) {
        nextButton.innerText = 'Show final score'
    }
}

const setButtonCursor = (cursorInput) => {
    const buttons = answerContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        if (cursorInput === 'initial') {
            buttons[i].style.cursor = cursorInput
        } else if (cursorInput === 'pointer') {
            buttons[i].style.cursor = cursorInput
            buttons[i].style.backgroundColor = '#fbfbfb'
        }
    }
}

const resetButtons = () => {
    setButtonCursor('pointer')
    toggleButtonStatus(jokerButton, 'inactive')
    toggleButtonStatus(nextButton, 'inactive')
    roundLost = false;
    roundWon = false;
}

const startQuiz = () => {
    currentQuestionIndex = 0;
    loadQuestion();
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
    loadQuestion();
    resetButtons();
}

startQuiz();