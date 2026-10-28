let total = 0;        
const cache = {};  

async function getQuestion(index) {
  if (cache[index]) {
    return cache[index]; }

const response = await fetch(`/api/question/${index}`);

  if (!response.ok) { throw new Error("HTTP " + response.status); }

const data = await response.json();
cache[index] = data;
return data;
}

let currentQuestion = 0;
const userAnswers = [];


function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion] = choiceIndex;
}


function goNext() {
  if (currentQuestion < total - 1) {
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
  currentQuestion = total - 1;
  renderQuestion();
}



async function calculateScore() {
  let score = 0;

  for (let i = 0; i < total; i++) {
    if (userAnswers[i] === (await getQuestion(i)).answer) {
      score++;
    }
  }
  return score;
}



function calculatePercentage(score) {
  const percentage =
    Math.round((score / total) * 100);
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



async function buildCorrection() {
  let correction = "";

  for (let i = 0; i < total; i++) {
    
    const q = await getQuestion(i);
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



async function submitQuiz() {

  const score =
    await calculateScore();

  const percentage =
    calculatePercentage(score);

  const message =
    getPerformanceMessage(percentage);

  const correction =
    await buildCorrection();

  showResults(
    score,
    percentage,
    message,
    correction
  );
}

async function renderQuestion() {
const loading = document.getElementById("loading");
const error = document.getElementById("error");

loading.hidden = false;
error.hidden = true;
   try {

    const q = await getQuestion(currentQuestion);

    document.getElementById("progress").textContent =
      `Question ${currentQuestion + 1} of ${total}`;

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

      if (userAnswers[currentQuestion] === i) {
        radio.checked = true;
      }

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
    currentQuestion === total - 1;

  document.getElementById("lastBtn").disabled =
    currentQuestion === total - 1;

  }
  catch (err) {
    error.textContent = err.message;
    error.hidden = false; }

  finally {
    loading.hidden = true; }
}



function showResults(
  score,
  percentage,
  message,
  correction
) {


  document.getElementById("quizPanel").style.display =
    "none";


  document.getElementById("resultsPanel").style.display =
    "block";


  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${total}`;



  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;


  document.getElementById("performanceText").textContent =
    message;


  document.getElementById("correction").textContent =
    correction;
}


async function init() {
const loading = document.getElementById("loading");
const error = document.getElementById("error");

loading.hidden = false;
error.hidden = true;

  try {
    const response = await fetch("/api/questions/count");

    if (!response.ok) {
      throw new Error( "HTTP " + response.status); }

    const data = await response.json();
    total = data.count;

    await renderQuestion();
  } 
  catch (err) {
    error.textContent = err.message;
    error.hidden = false; }

  finally {loading.hidden = true; }
}
init();
