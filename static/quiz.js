// ======================================================
// QUESTIONS
// ======================================================
//
// All quiz questions are stored inside one array.
//
// Each question is represented by a JavaScript object.
//
// Every object contains:
//
// question:
// The question shown to the user.
//
// choices:
// An array containing the possible answers.
//
// answer:
// The index of the correct choice.
//
// explanation:
// A short explanation shown in the correction.
//
// IMPORTANT:
// Array indexes start at 0.
//
// Example:
// choices: ["A", "B", "C", "D"]
//
// Index:
// 0 = A
// 1 = B
// 2 = C
// 3 = D
// ======================================================

const questions = [

  // ====================================================
  // QUESTION 1 - VARIABLES
  // ====================================================

  {
    question:
      "Which keyword declares a block-scoped variable that can later be reassigned?",

    choices: [
      "var",
      "let",
      "const",
      "static"
    ],

    // Correct choice = let
    // let is at index 1.
    answer: 1,

    explanation:
      "let declares a block-scoped variable whose value can later be reassigned."
  },


  // ====================================================
  // QUESTION 2 - STRICT EQUALITY
  // ====================================================

  {
    question:
      "Which JavaScript operator tests strict equality?",

    choices: [
      "=",
      "==",
      "===",
      "!="
    ],

    // === is at index 2.
    answer: 2,

    explanation:
      "The === operator compares both the value and the data type."
  },


  // ====================================================
  // QUESTION 3 - ARRAY INDEX
  // ====================================================

  {
    question:
      "What is the index of the first element in a JavaScript array?",

    choices: [
      "0",
      "1",
      "-1",
      "2"
    ],

    // JavaScript arrays start at index 0.
    answer: 0,

    explanation:
      "JavaScript arrays start at index 0, so the first element has index 0."
  },


  // ====================================================
  // QUESTION 4 - ARRAY LENGTH
  // ====================================================

  {
    question:
      "Which property gives the number of elements in a JavaScript array?",

    choices: [
      "size",
      "count",
      "length",
      "number"
    ],

    // length is at index 2.
    answer: 2,

    explanation:
      "The length property returns the number of elements stored in an array."
  },


  // ====================================================
  // QUESTION 5 - IF STATEMENT
  // ====================================================

  {
    question:
      "Which statement is used to execute code only when a condition is true?",

    choices: [
      "if",
      "for",
      "return",
      "break"
    ],

    // if is at index 0.
    answer: 0,

    explanation:
      "An if statement executes a block of code when its condition is true."
  },


  // ====================================================
  // QUESTION 6 - FOR LOOP
  // ====================================================

  {
    question:
      "Which JavaScript structure is commonly used to repeat code a known number of times?",

    choices: [
      "if",
      "for",
      "return",
      "const"
    ],

    // for is at index 1.
    answer: 1,

    explanation:
      "A for loop is commonly used when code needs to repeat a known number of times."
  },


  // ====================================================
  // QUESTION 7 - FUNCTIONS
  // ====================================================

  {
    question:
      "Which keyword is used to declare a traditional JavaScript function?",

    choices: [
      "method",
      "function",
      "define",
      "func"
    ],

    // function is at index 1.
    answer: 1,

    explanation:
      "The function keyword is used to declare a traditional JavaScript function."
  },


  // ====================================================
  // QUESTION 8 - STRINGS
  // ====================================================

  {
    question:
      "Which of the following is a JavaScript string?",

    choices: [
      "25",
      "true",
      "\"Hello\"",
      "[1, 2, 3]"
    ],

    // "Hello" is at index 2.
    answer: 2,

    explanation:
      "A string is text written inside quotation marks, such as \"Hello\"."
  },


  // ====================================================
  // QUESTION 9 - OBJECTS
  // ====================================================

  {
    question:
      "Which of the following correctly creates a JavaScript object?",

    choices: [
      "const student = { name: \"Elie\", age: 21 };",
      "const student = [ name: \"Elie\", age: 21 ];",
      "const student = ( name: \"Elie\", age: 21 );",
      "const student = < name: \"Elie\", age: 21 >;"
    ],

    // JavaScript objects use { }.
    answer: 0,

    explanation:
      "JavaScript objects use curly braces and store information as property-value pairs."
  },


  // ====================================================
  // QUESTION 10 - OBJECT PROPERTY
  // ====================================================

  {
    question:
      "If const student = { name: \"Elie\", age: 21 }, how can you access the student's name?",

    choices: [
      "student(name)",
      "student.name",
      "student->name",
      "student:name"
    ],

    // student.name is at index 1.
    answer: 1,

    explanation:
      "Dot notation such as student.name is used to access a property of an object."
  }

];



// ======================================================
// APPLICATION STATE
// ======================================================
//
// These variables remember where the user is
// and which answers were selected.
// ======================================================


// currentQuestion contains the index of the question
// currently displayed.
//
// 0 = Question 1
// 1 = Question 2
// 2 = Question 3
// etc.
let currentQuestion = 0;


// Create an array with the same number of positions
// as the questions array.
//
// At first, the positions are empty because
// the user has not answered anything yet.
const userAnswers = new Array(questions.length);


// Example:
//
// If there are 10 questions:
//
// userAnswers:
//
// [empty, empty, empty, empty, empty,
//  empty, empty, empty, empty, empty]
//
// If the user selects choice index 1 for Question 1:
//
// [1, empty, empty, ...]
//
// This allows the application to remember answers
// while the user navigates between questions.



// ======================================================
// SAVE AN ANSWER
// ======================================================

function saveAnswer(choiceIndex) {

  // currentQuestion tells us which question
  // the user is currently viewing.
  //
  // choiceIndex tells us which answer was selected.
  //
  // Store that selected answer inside userAnswers.

  userAnswers[currentQuestion] = choiceIndex;
}


// Example:
//
// currentQuestion = 0
// choiceIndex = 1
//
// userAnswers[0] = 1
//
// This means:
//
// Question 1 → selected answer index 1.



// ======================================================
// NAVIGATION
// ======================================================


// ======================================================
// GO TO NEXT QUESTION
// ======================================================

function goNext() {

  // questions.length gives the total number
  // of questions.
  //
  // Because indexes start at 0,
  // the last question index is:
  //
  // questions.length - 1
  //
  // Only move forward if the user is not
  // already on the last question.

  if (currentQuestion < questions.length - 1) {

    // Increase the question index by 1.
    currentQuestion++;

    // Display the new question.
    renderQuestion();
  }
}



// ======================================================
// GO TO PREVIOUS QUESTION
// ======================================================

function goPrevious() {

  // The first question has index 0.
  //
  // Only move backward if the current index
  // is greater than 0.

  if (currentQuestion > 0) {

    // Decrease the question index by 1.
    currentQuestion--;

    // Display the previous question.
    renderQuestion();
  }
}



// ======================================================
// GO TO FIRST QUESTION
// ======================================================

function goFirst() {

  // The first element in an array always
  // has index 0.

  currentQuestion = 0;

  // Display Question 1.
  renderQuestion();
}



// ======================================================
// GO TO LAST QUESTION
// ======================================================

function goLast() {

  // questions.length is the number of questions.
  //
  // Because indexes begin at 0,
  // the final question is:
  //
  // questions.length - 1

  currentQuestion = questions.length - 1;

  // Display the final question.
  renderQuestion();
}



// ======================================================
// CALCULATE SCORE
// ======================================================

function calculateScore() {

  // Start with a score of 0.
  let score = 0;


  // Go through all questions one by one.
  for (let i = 0; i < questions.length; i++) {

    // Compare:
    //
    // user's selected answer
    //
    // with
    //
    // correct answer stored in the question object.

    if (userAnswers[i] === questions[i].answer) {

      // If they are exactly equal,
      // add one point.
      score++;
    }
  }


  // After checking every question,
  // return the final score.
  return score;
}


// Example:
//
// userAnswers[0] = 1
//
// questions[0].answer = 1
//
// 1 === 1
//
// Therefore:
//
// score increases by 1.



// ======================================================
// CALCULATE PERCENTAGE
// ======================================================

function calculatePercentage(score) {

  // Percentage formula:
  //
  // score
  // ---------------------- × 100
  // number of questions
  //
  // Math.round() rounds the result
  // to the nearest whole number.

  const percentage =
    Math.round((score / questions.length) * 100);


  // Return the calculated percentage.
  return percentage;
}


// Example:
//
// Score = 7
//
// Questions = 10
//
// 7 / 10 × 100
//
// = 70%



// ======================================================
// PERFORMANCE MESSAGE
// ======================================================

function getPerformanceMessage(percentage) {

  // --------------------------------------------------
  // 80% - 100%
  // --------------------------------------------------

  if (percentage >= 80) {

    return "Excellent";
  }


  // --------------------------------------------------
  // 60% - 79%
  // --------------------------------------------------

  else if (percentage >= 60) {

    return "Good";
  }


  // --------------------------------------------------
  // 50% - 59%
  // --------------------------------------------------

  else if (percentage >= 50) {

    return "Pass";
  }


  // --------------------------------------------------
  // BELOW 50%
  // --------------------------------------------------

  else {

    return "Needs improvement";
  }
}



// ======================================================
// BUILD COMPLETE CORRECTION
// ======================================================
//
// This function examines every question.
//
// For each question it displays:
//
// - question number
// - question text
// - user's answer
// - correct answer
// - Correct or Incorrect
// - explanation
//
// If the user did not answer:
//
// "Not answered"
// ======================================================

function buildCorrection() {

  // Create an empty string.
  //
  // We will keep adding correction information
  // to this string.
  let correction = "";


  // Go through every question.
  for (let i = 0; i < questions.length; i++) {


    // Store the current question object
    // inside a shorter variable called q.
    const q = questions[i];


    // Get the answer selected by the user.
    const userChoice = userAnswers[i];



    // ==================================================
    // USER ANSWER TEXT
    // ==================================================

    let userAnswerText;


    // If the user never selected an answer,
    // the value is undefined.

    if (userChoice === undefined) {

      // This wording matches the checklist.
      userAnswerText = "Not answered";
    }


    else {

      // userChoice contains an index.
      //
      // Example:
      //
      // userChoice = 2
      //
      // q.choices[2]
      //
      // gives us the actual answer text.

      userAnswerText = q.choices[userChoice];
    }



    // ==================================================
    // CORRECT ANSWER TEXT
    // ==================================================

    // q.answer contains the index
    // of the correct answer.
    //
    // q.choices[q.answer]
    //
    // converts that index into the actual answer.

    const correctAnswerText =
      q.choices[q.answer];



    // ==================================================
    // CORRECT OR INCORRECT
    // ==================================================

    let result;


    // Compare the user's answer index
    // with the correct answer index.

    if (userChoice === q.answer) {

      result = "Correct";
    }


    else {

      result = "Incorrect";
    }



    // ==================================================
    // ADD INFORMATION TO CORRECTION
    // ==================================================

    // Question number
    correction +=
      "Question " + (i + 1) + "\n";


    // Question text
    correction +=
      q.question + "\n";


    // User answer
    correction +=
      "Your answer: " +
      userAnswerText +
      "\n";


    // Correct answer
    correction +=
      "Correct answer: " +
      correctAnswerText +
      "\n";


    // Correct / Incorrect
    correction +=
      "Result: " +
      result +
      "\n";


    // Explanation
    correction +=
      "Explanation: " +
      q.explanation +
      "\n";


    // Empty line between questions.
    correction += "\n";
  }


  // Return the complete correction string.
  return correction;
}



// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
//
// This section connects the JavaScript logic
// to the HTML page.
// ======================================================



// ======================================================
// SUBMIT QUIZ
// ======================================================

function submitQuiz() {

  // --------------------------------------------------
  // STEP 1
  // Calculate the score.
  // --------------------------------------------------

  const score =
    calculateScore();


  // --------------------------------------------------
  // STEP 2
  // Calculate the percentage.
  // --------------------------------------------------

  const percentage =
    calculatePercentage(score);


  // --------------------------------------------------
  // STEP 3
  // Determine the performance message.
  // --------------------------------------------------

  const message =
    getPerformanceMessage(percentage);


  // --------------------------------------------------
  // STEP 4
  // Generate the full correction.
  // --------------------------------------------------

  const correction =
    buildCorrection();


  // --------------------------------------------------
  // STEP 5
  // Display everything on the webpage.
  // --------------------------------------------------

  showResults(
    score,
    percentage,
    message,
    correction
  );
}



// ======================================================
// RENDER QUESTION
// ======================================================
//
// This function displays the current question,
// possible answers, and navigation buttons.
//
// This is part of the provided interface code.
// ======================================================

function renderQuestion() {

  // Get the question object that corresponds
  // to currentQuestion.

  const q =
    questions[currentQuestion];



  // ==================================================
  // QUESTION NUMBER
  // ==================================================

  // Example:
  //
  // Question 1 of 10

  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;



  // ==================================================
  // QUESTION TEXT
  // ==================================================

  // Display the actual question.

  document.getElementById("questionText").textContent =
    q.question;



  // ==================================================
  // CHOICES
  // ==================================================

  // Find the HTML element:
  //
  // <div id="choices"></div>

  const choicesContainer =
    document.getElementById("choices");


  // Remove the previous question's choices.

  choicesContainer.innerHTML = "";



  // Go through every possible answer
  // for the current question.

  for (let i = 0; i < q.choices.length; i++) {


    // ------------------------------------------------
    // CREATE LABEL
    // ------------------------------------------------

    const label =
      document.createElement("label");


    // Give the label the CSS class "choice".

    label.className = "choice";



    // ------------------------------------------------
    // CREATE RADIO BUTTON
    // ------------------------------------------------

    const radio =
      document.createElement("input");


    // Make the input a radio button.

    radio.type = "radio";


    // All answers use the same name
    // so only one answer can be selected
    // for a question.

    radio.name = "answer";


    // Store the answer index as the value.

    radio.value = i;



    // ==================================================
    // RESTORE SAVED ANSWER
    // ==================================================

    // If the user already answered this question,
    // make the previously selected radio button
    // checked again.

    if (userAnswers[currentQuestion] === i) {

      radio.checked = true;
    }



    // ==================================================
    // SAVE ANSWER WHEN CLICKED
    // ==================================================

    radio.onclick = function () {

      // Send the selected answer index
      // to saveAnswer().

      saveAnswer(i);
    };



    // ==================================================
    // ADD RADIO BUTTON TO LABEL
    // ==================================================

    label.appendChild(radio);



    // ==================================================
    // ADD ANSWER TEXT
    // ==================================================

    label.appendChild(

      document.createTextNode(
        " " + q.choices[i]
      )

    );



    // ==================================================
    // ADD COMPLETE CHOICE TO PAGE
    // ==================================================

    choicesContainer.appendChild(label);
  }



  // ==================================================
  // NAVIGATION BUTTONS
  // ==================================================


  // --------------------------------------------------
  // FIRST BUTTON
  // --------------------------------------------------
  //
  // Disable First if already on Question 1.

  document.getElementById("firstBtn").disabled =
    currentQuestion === 0;



  // --------------------------------------------------
  // PREVIOUS BUTTON
  // --------------------------------------------------
  //
  // Disable Previous if already on Question 1.

  document.getElementById("previousBtn").disabled =
    currentQuestion === 0;



  // --------------------------------------------------
  // NEXT BUTTON
  // --------------------------------------------------
  //
  // Disable Next if already on the last question.

  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;



  // --------------------------------------------------
  // LAST BUTTON
  // --------------------------------------------------
  //
  // Disable Last if already on the last question.

  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}



// ======================================================
// DISPLAY RESULTS
// ======================================================
//
// This function hides the quiz and displays:
//
// - score
// - percentage
// - performance message
// - complete correction
//
// This is part of the provided interface code.
// ======================================================

function showResults(
  score,
  percentage,
  message,
  correction
) {


  // ==================================================
  // HIDE QUIZ PANEL
  // ==================================================

  document.getElementById("quizPanel").style.display =
    "none";



  // ==================================================
  // SHOW RESULTS PANEL
  // ==================================================

  document.getElementById("resultsPanel").style.display =
    "block";



  // ==================================================
  // DISPLAY SCORE
  // ==================================================

  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;



  // ==================================================
  // DISPLAY PERCENTAGE
  // ==================================================

  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;



  // ==================================================
  // DISPLAY PERFORMANCE MESSAGE
  // ==================================================

  document.getElementById("performanceText").textContent =
    message;



  // ==================================================
  // DISPLAY COMPLETE CORRECTION
  // ==================================================

  document.getElementById("correction").textContent =
    correction;
}



// ======================================================
// START APPLICATION
// ======================================================
//
// When quiz.js loads, immediately display
// the first question.
// ======================================================

renderQuestion();