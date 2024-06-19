var buttonColours = ["red", "blue", "green", "yellow"]
var randomnumber;
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
if(level === 0){
    $(document).one("keydown",nextsequence);
}

function nextsequence(){
    userClickedPattern = [];
    randomnumber =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    level++;
    $("h1").text("Level " + level);
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + userChosenColour +".mp3" );
    audio.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
    
});
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }else{
        $("h1").text("Game Over, Press any key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();
        gamePattern = [];
        level = 0;
        
        $(document).one("keydown",nextsequence);
        
    }
}




