'use strict';

const stopwatch = document.getElementById('stopwatch');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let state = 'start';
let timerId;
let elapsedMs = 0;

//ミリ秒、秒、分の定義と文字列化する関数
function timeToString(millis){
    const ms = millis % 1000;
    const s = Math.floor(millis / 1000)　% 60;
    const m = Math.floor(millis / 1000 /60);
    
    const formattedMs = ms.toString().padStart(3,'0');
    const formattedS = s.toString().padStart(2,'0');
    const formattedM = m.toString().padStart(2,'0');

    return `${formattedM}:${formattedS}.${formattedMs}`;
};

//スタートボタンを押した時の処理
start.addEventListener('click', () => {
        start.textContent = 'リスタート';
    
        let startMs = Date.now();  //開始時間（ミリ秒）
        startMs-= elapsedMs;  //スタートもしくはリスタートのための開始時間が定義される
    
        timerId = setInterval(() => {
            const nowMs = Date.now();
            elapsedMs = nowMs - startMs;
            
            stopwatch.textContent = timeToString(elapsedMs);
        }, 10);
        
        start.disabled = true;
        stop.disabled = false;
        reset.disabled = false;
    
});

//ストップボタンを押した時の処理
stop.addEventListener('click', () => {
    clearInterval(timerId);
    
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
});

//リセットボタンボタンを押した時の処理
reset.addEventListener('click', () => {
    clearInterval(timerId);
    start.textContent = 'スタート';
    elapsedMs = 0;
    stopwatch.textContent = '00:00.000'
    
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
});