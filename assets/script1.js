alert("Welcome to my very special Javascript Quiz. Click OK to begin!");

var place = 0;
var correct = 0;
var test, test_status, question, choice, choices;
var highScoreEl = document.getElementById("score_list");
var highScoreButton = document.getElementById("highscorebutton");

//timer for test
var counter = 60
var myTimer = function () {
  counter--;
  document.querySelector("h1").innerHTML = counter;

  if (counter === 0) {
    clearInterval(interval);
  }
};
interval = setInterval(myTimer, 1000);


var myQuestions = [
  {
    question: "1. What is the correct HTML tag where Javascript can be written?",
    a: "Javascript",
    b: "script",
    c: "js.code",
    d: "java",
    answer: "b"

  },
  {
    question: "2. Javascript is the dominant scripting language of the Internet along with HTML and ______",
    a: "CSS",
    b: "Python",
    c: "JQuery",
    d: "Bootstrap",
    answer: "a"
  },
  {
    question: "3. The conditions of an if/else statement must be enclosed in _________.",
    a: "square brackets",
    b: "curly brackets",
    c: "parentheses",
    d: "quotations",
    answer: "c"
  },
  {
    question: "4. The _________ is a very useful tool to debug code in Javascript.",
    a: "Internet",
    b: "for loop",
    c: "array",
    d: "console.log",
    answer: "d"
  },
  {
    question: "5. In Javascript, a ________ is a sequence of characters in quotations that is often found in an array.",
    a: "string",
    b: "loop",
    c: "console.log",
    d: "random number",
    answer: "a"
  }
];

function get(x) {
  return document.getElementById(x);
}

// shows questions individually
function supplyQuestion() {
  test = get("test");
  if (place >= myQuestions.length) {
    test.innerHTML = "<h2>You got " + correct + " of " + myQuestions.length + " questions correct!</h2>";
    get("test_status").innerHTML = "You completed my special Javascript quiz!!!";



    clearInterval(interval);

    var scoreStorage = JSON.parse(localStorage.getItem("myQuestions")) || { correct: 0 };
    console.log(scoreStorage);

    //stores scores and initials in local storage
    if (scoreStorage.correct <= correct) {
      var userInitials = prompt("Congratulations! Type in your initials to log your score!")
      console.log(userInitials);


      var userHighScore = {
        userInitials, correct
      }
      console.log(userHighScore);
      localStorage.setItem("myQuestions", JSON.stringify(userHighScore));

    }
    //high scores go here
    showHighScores();

    // resets the variable, user can restart test
    place = 0;
    correct = 0;
    // stops running renderQuestion function when quiz is completed
    return false;

  }
  get("test_status").innerHTML = "Question " + (place + 1) + " of " + myQuestions.length;

  question = myQuestions[place].question;
  answerA = myQuestions[place].a;
  answerB = myQuestions[place].b;
  answerC = myQuestions[place].c;
  answerD = myQuestions[place].d;
  // displays the question
  test.innerHTML = "<h2>" + question + "</h2>";
  // displays the choices for answers
  // the += appends to the data we started on the line above
  test.innerHTML += "<label> <input type='radio' name='choices' value='a'> " + answerA + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='b'> " + answerB + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='c'> " + answerC + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='d'> " + answerD + "</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}



var correct = 0;
//function checks quiz answers
function checkAnswer() {
  // use getElementsByName because we have an array which it will loop through
  choices = document.getElementsByName("choices");
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }
  // checks if answer matches the correct choice
  if (choice == myQuestions[place].answer) {
    //each time there is a correct answer this value increases
    correct++;
    //each incorrect answer results in 5 seconds removed from timer
  } else {
    counter -= 5;
  }
  // moves position up one
  place++;
  // then the renderQuestion function runs again to go to next question
  supplyQuestion();

//function shows high scores of users
}
function showHighScores() {
  var updatedStorage = JSON.parse(localStorage.getItem("myQuestions"));
  highScoreEl.innerHTML = "The current high score is " + updatedStorage.correct + " and belongs to: " + updatedStorage.userInitials
}
window.addEventListener("load", supplyQuestion);

highScoreButton.addEventListener("click", showHighScores);