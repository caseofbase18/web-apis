alert("Welcome to my very special Javascript Quiz. Click OK to begin!");

var place = 0;
var correct = 0;
var test, test_status, question, choice, choices;


var counter = 60
var myTimer = function() {
    counter--;
    document.querySelector("h1").innerHTML=counter;

        if (counter === 0) {
            clearInterval(interval);
        }
};
interval = setInterval(myTimer,1000);


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

function get(x){
    return document.getElementById(x);
  }

  // this function supplies questions one at a time
function supplyQuestion(){
    test = get("test");
    if(place >= myQuestions.length){
      test.innerHTML = "<h2>You got "+correct+" of "+myQuestions.length+" questions correct!</h2>";
      get("test_status").innerHTML = "You completed my special Javascript quiz!!!";

      clearInterval(interval);

      var scoreStorage = localStorage.getItem("myQuestions");
      console.log (scoreStorage);
      
      if (scoreStorage < correct) {
        localStorage.setItem("myQuestions", correct);
      }



      // resets the variable to allow users to restart the test
      place = 0;
      correct = 0;
      // stops rest of renderQuestion function running when test is completed
      return false;

    }
    get("test_status").innerHTML = "Question "+(place+1)+" of "+myQuestions.length;
    
    question = myQuestions[place].question;
    answerA = myQuestions[place].a;
    answerB = myQuestions[place].b;
    answerC = myQuestions[place].c;
    answerD = myQuestions[place].d;
    // displays the question
    test.innerHTML = "<h2>"+question+"</h2>";
    // displays the choices for answers
    // the += appends to the data we started on the line above
    test.innerHTML += "<label> <input type='radio' name='choices' value='a'> "+answerA+"</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='b'> "+answerB+"</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='c'> "+answerC+"</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='d'> "+answerD+"</label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}



var correct = 0;

function checkAnswer(){
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for(var i=0; i<choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
      }
    }
    // checks if answer matches the correct choice
    if(choice == myQuestions[place].answer){
      //each time there is a correct answer this value increases
      correct++;
    } else {
        counter-=5;
    }
    // changes position of which character user is on
    place++;
    // then the renderQuestion function runs again to go to next question
    supplyQuestion();

    
  }

  window.addEventListener("load", supplyQuestion);

