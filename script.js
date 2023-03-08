const quizContainer = document.getElementById("quiz-container");
const startContainer = document.getElementById("start-container");
const gameOverContainer = document.getElementById("game-over-container");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionElement = document.getElementById("question");
const answerForm = document.getElementById("answer-form");
const answersElement = document.getElementById("answers");
const messageElement = document.getElementById("message");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const initialsElement = document.getElementById("initials");
const scoreForm = document.getElementById("score-form");

const quizTime = 60; // total time for quiz in seconds
let timer; // timer variable
let timeLeft = quizTime; // time left in quiz
let score = 0; // current score
let currentQuestionIndex = 0; // index of current question
let shuffledQuestions; // array of shuffled questions

// questions array
const questions = [
  {
    question: "What is HTML used for?",
    answers: [
      { text: "Structuring content on web pages", correct: true },
      { text: "Creating visual designs on web pages", correct: false },
      { text: "Storing data on web servers", correct: false },
      { text: "All of the above", correct: false },
    ],
  },
  {
    question: "What is CSS used for?",
    answers: [
      { text: "Adding interactivity to web pages", correct: false },
      { text: "Structuring content on web pages", correct: false },
      { text: "Creating visual designs on web pages", correct: true },
      { text: " All of the above", correct: false },
    ],
  },
  {
    question: "What is JavaScript used for?",
    answers: [
      { text: "Structuring content on web pages", correct: false },
      { text: "Creating visual designs on web pages", correct: false },
      { text: "Adding interactivity to web pages", correct: true },
      { text: "All of the above", correct: false },
    ],
  },
];

// start button click event
startButton.addEventListener("click", startQuiz);

// answer form submit event
answerForm.addEventListener("submit", submitAnswer);

// score form submit event
scoreForm.addEventListener("submit", saveScore);

nextButton.addEventListener("click", submitAnswer);

// start quiz function
function startQuiz() {
  // hide start container and show quiz container
  startContainer.style.display = "none";
  quizContainer.style.display = "block";

  // shuffle questions
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  // start timer
  startTimer();

  // show first question
  showQuestion();
}

// show question function
function showQuestion() {
  // get current question
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // set question text
  questionElement.innerText = currentQuestion.question;

  // clear answers
  answersElement.innerHTML = "";

  // loop through answers and create radio buttons
  currentQuestion.answers.forEach((answer) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const span = document.createElement("span");

    input.type = "radio";
    input.name = "answer";
    input.value = answer.correct;
    input.required = true;
    span.innerText = answer.text;

    li.appendChild(input);
    li.appendChild(span);
    answersElement.appendChild(li);
  });
}

// submit answer function
function submitAnswer(event) {
  event.preventDefault();

  // get selected answer
  const selectedAnswer = answerForm.querySelector(
    "input[name='answer']:checked"
  );

  // check if answer is correct
  if (selectedAnswer && selectedAnswer.value === "true") {
    messageElement.innerText = "Correct!";
    score++;
  } else {
    messageElement.innerText = "Incorrect!";
    timeLeft -= 10; // subtract 10 seconds from time
  }

  // increment current question index
  currentQuestionIndex++;

  // check if quiz is over

  if (currentQuestionIndex >= shuffledQuestions.length || timeLeft <= 0) {
    gameOver();
  } else {
    // show next question
    showQuestion();
  }
}

// start timer function
function startTimer() {
  // set initial time display
  timerElement.innerText = timeLeft;

  // start timer
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    // check if time is up
    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);
}

// game over function
function gameOver() {
  // stop timer
  clearInterval(timer);

  // hide quiz container and show game over container
  quizContainer.style.display = "none";
  gameOverContainer.style.display = "block";

  // set score display
  scoreElement.innerText = score;
}

// save score function
function saveScore(event) {
  event.preventDefault();

  // get initials input value
  const initials = initialsElement.value.trim();

  // validate initials input
  if (!initials) {
    alert("Please enter your initials.");
    return;
  }

  // create score object
  const scoreObject = {
    initials,
    score,
  };

  // get saved scores from local storage
  const savedScores = JSON.parse(localStorage.getItem("scores")) || [];

  // add new score to saved scores
  savedScores.push(scoreObject);

  // sort saved scores by score in descending order
  savedScores.sort((a, b) => b.score - a.score);

  // save updated scores to local storage
  localStorage.setItem("scores", JSON.stringify(savedScores));

  // redirect to high scores page
  window.location.href = "high-scores.html";
}
// const quizContainer = document.getElementById("quiz-container");
// const startContainer = document.getElementById("start-container");
// const gameOverContainer = document.getElementById("game-over-container");
// const startButton = document.getElementById("start-button");
// const questionElement = document.getElementById("question");
// const answerForm = document.getElementById("answer-form");
// const answersElement = document.getElementById("answers");
// const messageElement = document.getElementById("message");
// const timerElement = document.getElementById("time");
// const scoreElement = document.getElementById("score");
// const initialsElement = document.getElementById("initials");
// const scoreForm = document.getElementById("score-form");
// const nextButton = document.createElement("button"); // create next button element

// const quizTime = 60; // total time for quiz in seconds
// let timer; // timer variable
// let timeLeft = quizTime; // time left in quiz
// let score = 0; // current score
// let currentQuestionIndex = 0; // index of current question
// let shuffledQuestions; // array of shuffled questions

// // questions array
// const questions = [
//   {
//     question: "What is the capital of France?",
//     answers: [
//       { text: "Paris", correct: true },
//       { text: "London", correct: false },
//       { text: "Madrid", correct: false },
//       { text: "Rome", correct: false },
//     ],
//   },
//   {
//     question: "What is the largest planet in our solar system?",
//     answers: [
//       { text: "Earth", correct: false },
//       { text: "Mars", correct: false },
//       { text: "Jupiter", correct: true },
//       { text: "Saturn", correct: false },
//     ],
//   },
//   {
//     question: "What is the smallest country in the world?",
//     answers: [
//       { text: "Monaco", correct: false },
//       { text: "San Marino", correct: false },
//       { text: "Vatican City", correct: true },
//       { text: "Liechtenstein", correct: false },
//     ],
//   },
// ];

// // start button click event
// startButton.addEventListener("click", startQuiz);

// // answer form submit event
// answerForm.addEventListener("submit", submitAnswer);

// // score form submit event
// scoreForm.addEventListener("submit", saveScore);

// // next button click event
// nextButton.addEventListener("click", showNextQuestion);

// // start quiz function
// function startQuiz() {
//   // hide start container and show quiz container
//   startContainer.style.display = "none";
//   quizContainer.style.display = "block";

//   // shuffle questions
//   shuffledQuestions = questions.sort(() => Math.random() - 0.5);

//   // start timer
//   startTimer();

//   // show first question
//   showQuestion();
// }

// // show question function
// function showQuestion() {
//   // get current question
//   const currentQuestion = shuffledQuestions[currentQuestionIndex];

//   // set question text
//   questionElement.innerText = currentQuestion.question;

//   // clear answers
//   answersElement.innerHTML = "";

//   // loop through answers and create radio buttons
//   currentQuestion.answers.forEach((answer) => {
//     const li = document.createElement("li");
//     const input = document.createElement("input");
//     const span = document.createElement("span");

//     input.type = "radio";
//     input.name = "answer";
//     input.value = answer.correct;
//     input.required = true;
//     span.innerText = answer.text;

//     li.appendChild(input);
//     li.appendChild(span);
//     answersElement.appendChild(li);
//   });

//   // add next button
//   nextButton.innerText = "Next Question";
//   answerForm.appendChild(nextButton);
// }

// // show next question function
// function showNextQuestion();
