const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionNumber = document.getElementById("question-number");
const questionText = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const choicesDisplay = document.querySelector("#choices");
const message = document.getElementById("message");
const timer = document.getElementById("timer");
const timeLeft = document.getElementById("time-left");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-score");
const highScoresContainer = document.querySelector(".high-scores-container");
const feedbackDisplay = document.getElementById("feedbackDisplay");

// Create variables for user initials and score
let userInitials = "";
let userScore = 0;

// Retrieve the existing high scores from Local Storage
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Define an array of quiz questions and answers
const questions = [
  {
    question: "What is JavaScript?",
    choices: ["A programming language", "An interactive script", "A nice cup of coffee"],
    answer: "A programming language",
  },
  {
    question: "What is the result of the expression 2 + 2 in JavaScript?",
    choices: ["4", "22", "22.0"],
    answer: "4",
  },
  {
    question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
    choices: ["var myVar;", "const myVar = 5;", "let 123var;"],
    answer: "let 123var;",
  },
  {
    question: "How do you write a comment in JavaScript?",
    choices: ["<!-- This is a comment -->", "/* This is a comment */", "// This is a comment"],
    answer: "// This is a comment",
  },
  {
    question: "What is the correct way to write an IF statement in JavaScript?",
    choices: ["if i = 5 then", "if (i == 5)", "if i == 5"],
    answer: "if (i == 5)",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    choices: ["JavaFX", "Angular", "C++"],
    answer: "Angular",
  },
  {
    question: "What is the purpose of the console.log() function in JavaScript?",
    choices: ["Display a message to the user", "Add a comment to the code", "Print output to the console for debugging"],
    answer: "Print output to the console for debugging",
  },
  {
    question: "What does the === operator in JavaScript do?",
    choices: ["Assign a value to a variable", "Compare values for equality and type", "Perform addition"],
    answer: "Compare values for equality and type",
  },
  {
    question: "Which of the following is used to create a function in JavaScript?",
    choices: ["function myFunction()", "create function myFunction()", "new function myFunction()"],
    answer: "function myFunction()",
  },
  {
    question: "How can you add a single-line comment in JavaScript?",
    choices: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->"],
    answer: "// This is a comment",
  }
];

// Initialize variables for managing the quiz
let currentQuestionIndex = 0;
let timerInterval;
let time = 60;

// Call the startTimer function to begin the countdown
// startTimer()

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    if (time > 0) {
      time--;
      timer.textContent = "Time: " + time;
    } else {
      clearInterval(timerInterval);
      endQuiz(); // End the quiz when the timer runs out
    }
  }, 1000);
}

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none"; // Hide the start button
  quizContainer.style.display = "block"; // Show the quiz container
  renderQuestion(); // Display the question
  startTimer(); // Start the timer
}

// Function to render a question
function renderQuestion() {
  // Fetch the current question from the questions array
  const currentQuestion = questions[currentQuestionIndex];
  // Update the question number, question text, and answer choices
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}:`;
  console.log(currentQuestionIndex);
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = ""; // Clear the previous answer choices
  choicesDisplay.innerHTML = ""; // Clear the previous feedback message

  // Loop through answer choices and create buttons for each
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const choice = document.createElement("button");
    choice.className = "choice";
    choice.textContent = currentQuestion.choices[i];
    answersContainer.appendChild(choice);

    // Add a click event listener to check the user's answer
    choice.addEventListener("click", function () {
      checkAnswer(this.textContent);
    });
  }
}

// Event listener for handling user's answer choice
choicesDisplay.addEventListener("click", function (event) {
  if (feedbackDisplay.textContent !== "") {
    return; // Prevent answering the same question multiple times
  }

  let userChoice = event.target;

  if (userChoice.textContent === questions[currentQuestionIndex].answer) {
    feedbackDisplay.textContent = "Correct!";
    feedbackDisplay.style.color = "green";
  } else {
    feedbackDisplay.textContent = "Wrong!";
    feedbackDisplay.style.color = "red";
    time -= 10; // Deduct time for a wrong answer
  }

  setTimeout(function () {
    feedbackDisplay.textContent = "";
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      renderQuestion(); // Display the next question
    } else {
      endQuiz(); // End the quiz if all questions are answered
    }
  }, 1000);
});

// Function to check the user's answer
function checkAnswer(userAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  if (userAnswer === currentQuestion.answer) {
    message.textContent = "Correct!";
    userScore += 10;
  } else {
    message.textContent = "Wrong!";
    time -= 10; // Deduct 10 seconds for a wrong answer
  }
  console.log(userScore);
  setTimeout(function () {
    message.textContent = "";
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      renderQuestion(); // Display the next question
    } else {
      endQuiz(); // End the quiz if all questions are answered

      // Add the new score to the highScores array
      highScores.push({ initials: userInitials, score: userScore });

      // Save the updated high scores back to Local Storage
      localStorage.setItem("highScores", JSON.stringify(highScores));

      console.log(highScores);
    }
  }, 1000);
}

submitButton.addEventListener("click", function () {
  // Get user initials from the input field
  userInitials = initialsInput.value;

  // Ensure the initials are not empty
  if (userInitials.trim() !== "") {
    // Add the new score to the highScores array
    highScores.push({ initials: userInitials, score: userScore });

    // Save the updated high scores back to Local Storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // You can do any additional actions here if needed

    console.log(highScores);
  }
})

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none"; // Hide the quiz container
  highScoresContainer.style.display = "block"; // Show the high scores container
  clearButton.style.display = "block"; // Show the clear button at end
  // Implement code to display the final score or other actions as needed
}

// Add a click event listener to the start button to begin the quiz
startButton.addEventListener("click", startQuiz);

