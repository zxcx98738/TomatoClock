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
        + (now_datetime.getMinutes() <10 ? '0' : '') + now_datetime.getMinutes();
    setTimeout("now_date()", 1000);
}

$("#play").click(function(){
    changeState(1);
    countdownfunc();
});
$("#pause").click(function(){
    changeState(2);
});
function changeState(param){
    if(param == 1){
        $("#pause").show();
        $("#play").hide();
    }else{
        $("#pause").hide();
        $("#play").show();
    }
}


var countdownnumber=90;
var countdownid;

function countdownfunc(){
    
    var x=document.getElementById("clock");
    var min=Math.floor(countdownnumber/60);
    var sec=countdownnumber%60
    x.innerHTML= (min<10 ? '0' : '')+min+":"+(sec<10 ? '0' : '')+sec;
     
    if (countdownnumber==0){
        //alert("倒數結束");
        x.innerHTML= "00:00";
        clearTimeout(countdownid);
    }else{
        countdownnumber--;
        if(countdownid){
            clearTimeout(countdownid);
        }
        countdownid=setTimeout(countdownfunc,1000);
    }
}



export {
    init
};