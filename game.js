var buttonColors = ["green", "red", "yellow", "blue"];

var userClickedSequence = [];
var generatedSequence = [];

var started = false;
var level = 0;

$(document).on("keypress", function () {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

$(".btn").on("click", function () {
  var buttonColor = $(this).attr("id");
  userClickedSequence.push(buttonColor);
  animatePress(buttonColor);
  playSound(buttonColor);
  checkAnswer(userClickedSequence.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedSequence[currentLevel] === generatedSequence[currentLevel]) {
    if (userClickedSequence.length === generatedSequence.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    restart();
  }
}

function nextSequence() {
  userClickedSequence = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  generatedSequence.push(randomColor);
  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}

function animatePress(currentButton) {
  $("#" + currentButton).addClass("pressed");

  setTimeout(function () {
    $("#" + currentButton).removeClass("pressed");
  }, 100);
}

function playSound(currentColor) {
  var audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
}

function restart() {
  level = 0;
  generatedSequence = [];
  started = false;
}
