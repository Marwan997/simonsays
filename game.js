//Colors
var button_colors = ["red", "blue", "green", "yellow"];

//Simon's pattern
var game_pattern = [];
//Player's pattern
var clicked_pattern = [];
//Game status
var started = false;
//Stage
var stage = 0;

//Function to start the game
$(document).keypress(function() {
  if (!started) {
    $("#stage-title").text("Stage " + stage);
    next_sequence();
    started = true;
  }
});

//Event handler for user clicks
$(".btn").click(function() {

  var chosen_color = $(this).attr("id");
  clicked_pattern.push(chosen_color);

  play_sound(chosen_color);
  animate_press(chosen_color);

  check_ans(clicked_pattern.length-1);
});

//function to check answer again Simon's sequence
function check_ans(current_stage) {

    if (game_pattern[current_stage] === clicked_pattern[current_stage]) {
      if (clicked_pattern.length === game_pattern.length){
        setTimeout(function () {
          next_sequence();
        }, 1000);
      }
    } else {
      play_sound("wrong");
      $("body").addClass("game-over");
      $("#stage-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      start_over();
    }
}

//Function to generate random sequence
function next_sequence() {
  clicked_pattern = [];
  stage++;
  $("#stage-title").text("stage " + stage);
  var rand_number = Math.floor(Math.random() * 4);
  var rand_chosen_color = button_colors[rand_number];
  game_pattern.push(rand_chosen_color);

  $("#" + rand_chosen_color).fadeIn(100).fadeOut(100).fadeIn(100);
  play_sound(rand_chosen_color);
}

//Function to animate press
function animate_press(current_color) {
  $("#" + current_color).addClass("pressed");
  setTimeout(function () {
    $("#" + current_color).removeClass("pressed");
  }, 100);
}

//Function to play sound
function play_sound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to start again
function start_over() {
  stage = 0;
  game_pattern = [];
  started = false;
}
