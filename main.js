const counterElement = document.querySelector('#counter')
let counter = 0
let timerID


const btnStart = document.querySelector('#start')
btnStart.onclick = function () {
    console.log('btnStart')
    timerID = setInterval(function(){
        counter++;
        counterElement.innerText = counter;
    }, 1000)
};

const btnStop = document.querySelector('#pause');
btnStop.onclick = function (){
    console.log('btnStop');
    clearInterval(timerID);
};

const btnReset = document.querySelector('#reset');
btnReset.onclick = function (){
    console.log('btnReset');
    counter = 0;
    counterElement.innerText = counter;
    clearInterval(timerID);
};

