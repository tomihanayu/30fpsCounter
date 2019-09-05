(function(){
    "use strict";
    var timer = document.getElementById("timer");
    var start_stop = document.getElementById("start_stop");
    var reset = document.getElementById("reset");

    var startTime;
    var elapsedTime = 0;
    var timerId;
    var timeToadd = 0;

    function updateTimetText(){

        var m = Math.floor(elapsedTime / 60000);
        var s = Math.floor(elapsedTime % 60000 / 1000);
        var ms = elapsedTime % 1000;
        m = ("0" + m).slice(-2); 
        s = ("0" + s).slice(-2);
        ms = ("0" + ms).slice(-3);

        //HTMLのid　timer部分に表示させる　
        timer_time.textContent = m + ":" + s + ":" + ms;
        timer_FPS.textContent = Math.floor(elapsedTime / 33.33333333333333)+ " Frame";
    }


    //再帰的に使える用の関数
    function countUp(){
        timerId = setTimeout(function(){
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()
            countUp();
        },10);
    }

    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    start_stop.addEventListener("click",function(){
        if (start_stop.value == "start"){
            start_stop.value = "stop";
            startTime = Date.now();
            countUp();
        }else{
          start_stop.value = "start";  
           clearTimeout(timerId);
           timeToadd += Date.now() - startTime;
        } 
    });

    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    reset.addEventListener("click",function(){
        elapsedTime = 0;
        timeToadd = 0;
        updateTimetText();
    });
})();
