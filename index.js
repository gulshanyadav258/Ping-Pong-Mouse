var bodyWidth = $("body").css("width");
bodyWidth = bodyWidth.slice(0, bodyWidth.length - 2);
var player = $("#player");
var ball = $("#ball");
var enemy = $("#enemy");
var ballLeft;
var ballTop;
var timerId1, timerId2;
jQuery.fn.cssFloat = function (prop) {
    return parseFloat(this.css(prop)) || 0;
};

$("body").mousemove(function (evt) {
    player.css("left", `${evt.pageX}px`);
    if (player.css("right").slice(0, player.css("right").length - 2) <= 0)
        player.css("left", `${bodyWidth - player.css("width").slice(0, player.css("width").length - 2)}px`);
});
var topFlag;
var leftFlag;
var ballInterval = setInterval(function(){
    var ballTrans = ball.cssFloat("transition-duration");
    ballTrans -= 0.01;
    ball.css("transition-duration", `${ballTrans}s`);
    var enemyTrans = enemy.cssFloat("transition-duration");
    enemyTrans += 0.003;
    enemy.css("transtion-duration", `${enemyTrans}s`);
}, 6000);
var interval = setInterval(function(){
    var playerWidth = player.cssFloat("width");
    playerWidth += bodyWidth*0.005;
    player.css("width", `${playerWidth}px`);
    var enemyWidth = enemy.cssFloat("width");
    enemyWidth += bodyWidth*0.005;
    enemy.css("width", `${enemyWidth}px`);
}, 6000);
setTimeout(() => {
    clearInterval(interval);
}, 30000);
setTimeout(() => {
    clearInterval(ballInterval);
}, 60000)
function running() {
    timerId1 = setInterval(function () {
        ballLeft = ball.cssFloat("left");
        ballTop = ball.cssFloat("top");
        if (ball.css("right").slice(0, ball.css("right").length - 2) <= 0)
            leftFlag = false;
        if (ballLeft <= 0)
            leftFlag = true;
        ballTop++;
        if (topFlag)
            ballTop += 50;
        else
            ballTop -= 51;
        ballLeft++;
        if (leftFlag)
            ballLeft += 50;
        else
            ballLeft -= 51;
        if (ball.cssFloat("top") < enemy.cssFloat("height") && ball.cssFloat("top") > 0) {
            if (ball.cssFloat("left") >= enemy.cssFloat("left") && ball.cssFloat("right") >= enemy.cssFloat("right")) {
                topFlag = true;
            }
        }
        else if (ball.cssFloat("top") < -300) {
            clearInterval(timerId1);
            clearInterval(timerId2);
            $("#over").css("display", "block");
            $("body").css("cursor", "default");
            $("#over").text("YOU WIN");
        }
        if (ball.cssFloat("bottom") < player.cssFloat("height") && ball.cssFloat("bottom") > 0) {
            if (ball.cssFloat("left") >= player.cssFloat("left") && ball.cssFloat("right") >= player.cssFloat("right")) {
                topFlag = false;
            }
        }
        else if (ball.cssFloat("bottom") < -300) {
            clearInterval(timerId1);
            clearInterval(timerId2);
            $("#over").css("display", "block");
            $("body").css("cursor", "default");
            $("#over").text("YOU LOSE");
        }
        ball.css("left", `${ballLeft}px`);
        ball.css("top", `${ballTop}px`);
    }, 1);
}
running();
timerId2 = setInterval(() => {
    if (ball.cssFloat("bottom") >= 0)
        $("#enemy").css("left", `${$("#ball").css("left").slice(0, $("#ball").css("left").length - 2) - ($("#enemy").css("width").slice(0, $("#enemy").css("width").length - 2) / 2)}px`);
}, 1);