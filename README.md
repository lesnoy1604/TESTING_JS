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



//const requestURL = 'https://swapi.dev/api/people/1/'

const requestURL = 'http://0.0.0.0:4040/api/v1/users/'

const p = document.getElementById('from-js')



function sendRequest(method, url, body=null) {
    const headers ={
        'Content-Type': 'application/json'
    }
    return fetch(url, {
        method: method,
        //body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return response.json().then(error => {
                const e = new Error('Что-то пошло не так!')
                e.data = error
                throw e
            })
        }
    })
}


sendRequest('GET', requestURL)
   .then(data => console.log(data))
   .catch(err => console.log(err))
