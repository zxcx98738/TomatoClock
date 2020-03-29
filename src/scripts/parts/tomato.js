import $ from 'jquery';

function init(){
    console.log('Hello World! Tomato!');
}

window.onload=now_date;
function now_date(){
    var now_datetime = new Date();
    var now_datetime_front=document.getElementById("now-datetime_front");
    var now_datetime_back=document.getElementById("now-datetime_back");

    var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");

    now_datetime_front.innerHTML = now_datetime.getFullYear() + "."
        + (now_datetime.getMonth() <10 ? '0' : '') + (now_datetime.getMonth()+1) + "."
        + (now_datetime.getDate() <10 ? '0' : '') + now_datetime.getDate();

    now_datetime_back.innerHTML = weekdays[now_datetime.getDay()]
        + (now_datetime.getHours() <10 ? '0' : '') + now_datetime.getHours() + ":"
        + (now_datetime.getMinutes() <10 ? '0' : '') + now_datetime.getMinutes()+"///"+now_datetime.getSeconds();;
    setTimeout("now_date()", 1000);
}       //load the initial time, didnt update, test by +"///"+now_datetime.getSeconds()


$("#orangePlay").click(function(){
    changeState(1);
    
    orangeGreenMode = true;
    countDownGoing = 0;
    startCount();
});
$("#orangePause").click(function(){
    changeState(2);
    stopCount();
});
function changeState(param){
    if(param == 1){
        $("#orangePause").show();
        $("#orangePlay").hide();
    }else{
        $("#orangePause").hide();
        $("#orangePlay").show();
    }
}
$("#orangeCancel").click(function(){
    countDownNumber=1500;
    countDownTime.innerHTML = "25:00";
    stopCount();
    $("#orangePause").hide();
    $("#orangePlay").show();
});

var countDownNumber = 3;
var countDownID;
var countDownGoing = 0;
//var startTime = new Date().getTime();
var countDownTime = document.getElementById("clock");
var orangeGreenMode = true;

function countDownfunc() {

    if (countDownNumber == 0) {
        //alert("倒數結束");
        countDownTime.innerHTML = "00:00";
        clearTimeout(countDownID);
        if (orangeGreenMode) {
            countDownNumber = 5;
            countDownTime.innerHTML = "05:00";
            orangeGreenMode = false;
            greenMode();
        }else {
            countDownNumber = 10;
            countDownTime.innerHTML = "25:00";
            orangeMode();
        }
        
    }else {
        countDownNumber--;

        var countDownMin = Math.floor(countDownNumber / 60);
        var countDownSec = countDownNumber % 60
        countDownTime.innerHTML= (countDownMin <10 ? '0' : '') + countDownMin + ":"
            + (countDownSec <10 ? '0' : '') + countDownSec;
    
        countDownID = setTimeout(countDownfunc,1000);
    }
}

function startCount() {
    if (!countDownGoing) {
        countDownGoing = 1;
        countDownfunc();
    }
}

function stopCount() {
    clearTimeout(countDownID);
    countDownGoing = 0;
}

function greenMode() {
    
    $("#orangeTomatoImg").hide();
    $("#greenTomatoImg").show();
    $("#orangeCancel").hide();
    $("#greenCancel").show();
    $("#orangePause").hide();
    $("#greenPlay").show();
    
}

$("#greenPlay").click(function(){
    greenChangeState(1);
    
    countDownGoing = 0;
    startCount();
    //orangeGreenMode = true;
});
$("#greenPause").click(function(){
    greenChangeState(2);
    stopCount();
});

function greenChangeState(param){
    if(param == 1){
        $("#greenPause").show();
        $("#greenPlay").hide();
    }else{
        $("#greenPause").hide();
        $("#greenPlay").show();
    }
}
function orangeMode() {
    $("#greenPause").hide();
    $("#orangePlay").show();
    $("#greenTomatoImg").hide();
    $("#orangeTomatoImg").show();
}

export {
    init
};