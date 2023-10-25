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

const requestAuthURL = 'http://0.0.0.0:4040/api/v1/auth/token/'
const requestUsersURL = 'http://0.0.0.0:4040/api/v1/users/'
const bearerToken ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJpZCI6MSwiYWNjZXNzIjo0Mjk0OTY3Mjk1LCJleHAiOjE2OTgzMTgxMjd9.ueaZT6KMmn07z9xnBHDmg6ycXCfd0HY9MGFjCO-jgb4'
const bodyInf = {
    username: 'alfasatcom',
    password: 'alfasatcom'
}



function f1(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestURL);

    xhr.onload = function(){
        console.log(xhr.status);
        console.log(xhr.response);
    }

    xhr.send()
}
//f1();

function f2(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestUsersURL);
    xhr.setRequestHeader('Authorization', bearerToken)

    xhr.onload = function(){
        console.log(xhr.status);
        //console.log(xhr.response);
        const data = JSON.parse(xhr.response);
        const responseKeys = {
            'id': 'userId',

        }
        console.log(data);
        document.getElementById("statusCode").innerHTML = `StatusCode: ${xhr.status}`;
        document.getElementById("userId").innerHTML = `User ID: ${data[0]['id']}`;
        document.getElementById("userLogin").innerHTML = `User login: ${data[0]['login']}`;
        document.getElementById("userName").innerHTML = `User name: ${data[0]['name']}`;
        document.getElementById("userRoleId").innerHTML = `User role id: ${data[0]['role_id']}`;
        document.getElementById("userStatus").innerHTML = `User status: ${data[0]['status']}`;
    }

    xhr.send();
}
//f2()


