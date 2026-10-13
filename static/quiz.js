const questions = [

  // question 1 

  {
    question:
      "Which keyword declares a block-scoped variable that can later be reassigned?",
    choices: [
      "var",
      "let",
      "const",
      "static"
    ],
    answer: 1,
    explanation:
      "let declares a block-scoped variable whose value can later be reassigned."
  },

  // question 2 

  {
    question:
      "Which JavaScript operator tests strict equality?",
    choices: [
      "=",
      "==",
      "===",
      "!="
    ],
    answer: 2,
    explanation:
      "The === operator compares both the value and the data type."
  },

  // question 3 

  {
    question:
      "What is the index of the first element in a JavaScript array?",
    choices: [
      "0",
      "1",
      "-1",
      "2"
    ],
    answer: 0,
    explanation:
      "JavaScript arrays start at index 0, so the first element has index 0."
  },

  // question 4 

  {
    question:
      "Which property gives the number of elements in a JavaScript array?",
    choices: [
      "size",
      "count",
      "length",
      "number"
    ],
    answer: 2,
    explanation:
      "The length property returns the number of elements stored in an array."
  },

  // question 5 

  {
    question:
      "Which statement is used to execute code only when a condition is true?",
    choices: [
      "if",
      "for",
      "return",
      "break"
    ],
    answer: 0,
    explanation:
      "An if statement executes a block of code when its condition is true."
  },

  // question 6 

  {
    question:
      "Which JavaScript structure is commonly used to repeat code a known number of times?",
    choices: [
      "if",
      "for",
      "return",
      "const"
    ],
    answer: 1,
    explanation:
      "A for loop is commonly used when code needs to repeat a known number of times."
  },

  // question 7 

  {
    question:
      "Which keyword is used to declare a traditional JavaScript function?",
    choices: [
      "method",
      "function",
      "define",
      "func"
    ],
    answer: 1,
    explanation:
      "The function keyword is used to declare a traditional JavaScript function."
  },

// question 8

{
  question:
    "Which of the following is a JavaScript string?",
  choices: [
    "25",
    "true",
    "\"Hello\"",
    "[1, 2, 3]"
  ],
  answer: 2,
  explanation:
    "A string is text written inside quotation marks, such as \"Hello\"."
},

// question 9

{
  question:
    "Which of the following correctly creates a JavaScript object?",
  choices: [
    "const student = { name: \"Elie\", age: 21 };",
    "const student = [ name: \"Elie\", age: 21 ];",
    "const student = ( name: \"Elie\", age: 21 );",
    "const student = < name: \"Elie\", age: 21 >;"
  ],
  answer: 0,
  explanation:
    "JavaScript objects use curly braces and store information as property-value pairs."
},

// question 10

{
  question:
    "If const student = { name: \"Elie\", age: 21 }, how can you access the student's name?",
  choices: [
    "student(name)",
    "student.name",
    "student->name",
    "student:name"
  ],
  answer: 1,
  explanation:
    "Dot notation such as student.name is used to access a property of an object."
}
];

// application state

let currentQuestion = 0;
const userAnswers = new Array(questions.length);


function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion] = choiceIndex;
}


function goNext() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
}

function goPrevious() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function goFirst() {
  currentQuestion = 0;
  renderQuestion();
}

function goLast() {
  currentQuestion = questions.length - 1;
  renderQuestion();
}



function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}



function calculatePercentage(score) {
  const percentage =
    Math.round((score / questions.length) * 100);
  return percentage;
}



function getPerformanceMessage(percentage) {
  if (percentage >= 80) {
    return "Excellent";
  }
  else if (percentage >= 60) {
    return "Good";
  }
  else if (percentage >= 50) {
    return "Pass";
  }
  else {
    return "Needs improvement";
  }
}



function buildCorrection() {
  let correction = "";

  for (let i = 0; i < questions.length; i++) {
    
    const q = questions[i];
    const userChoice = userAnswers[i];


    let userAnswerText;

    if (userChoice === undefined) {
      userAnswerText = "Not answered";
    }
    else {
      userAnswerText = q.choices[userChoice];
    }


    const correctAnswerText =
      q.choices[q.answer];


    let result;

    if (userChoice === q.answer) {
      result = "Correct";
    }

    else {
      result = "Incorrect";
    }


    correction +=
      "Question " + (i + 1) + "\n";

    correction +=
      q.question + "\n";

    correction +=
      "Your answer: " +
      userAnswerText +
      "\n";

    correction +=
      "Correct answer: " +
      correctAnswerText +
      "\n";

    correction +=
      "Result: " +
      result +
      "\n";

    correction +=
      "Explanation: " +
      q.explanation +
      "\n";

    correction += "\n";
  }
  return correction;
}



function submitQuiz() {

  const score =
    calculateScore();

  const percentage =
    calculatePercentage(score);

  const message =
    getPerformanceMessage(percentage);

  const correction =
    buildCorrection();

  showResults(
    score,
    percentage,
    message,
    correction
  );
}


function renderQuestion() {
  const q =
    questions[currentQuestion];


  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;


  document.getElementById("questionText").textContent =
    q.question;


  const choicesContainer =
    document.getElementById("choices");

  choicesContainer.innerHTML = ""; 

  for (let i = 0; i < q.choices.length; i++) {


    const label =
      document.createElement("label"); 

    label.className = "choice"; 


    const radio =
      document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;

    // restore saved answer

    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }

    // save answer when clicked

    radio.onclick = function () {
      saveAnswer(i);
    };

    label.appendChild(radio);

    label.appendChild(
      document.createTextNode(
        " " + q.choices[i]
      )
    );

   

    choicesContainer.appendChild(label);
  }

  

  document.getElementById("firstBtn").disabled =
    currentQuestion === 0;

  document.getElementById("previousBtn").disabled =
    currentQuestion === 0;

  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;

  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}


function showResults(
  score,
  percentage,
  message,
  correction
) {

  // hide quiz panel

  document.getElementById("quizPanel").style.display =
    "none";

  // show results panel

  document.getElementById("resultsPanel").style.display =
    "block";


  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;



  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;


  document.getElementById("performanceText").textContent =
    message;


  document.getElementById("correction").textContent =
    correction;
}

// start application

renderQuestion();
