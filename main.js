const requestAuthURL = 'http://0.0.0.0:4040/api/v1/auth/token/'
const requestUsersURL = 'http://0.0.0.0:4040/api/v1/users/'
const requestMyUserInf = 'http://0.0.0.0:4040/api/v1/users/me/'
let bearerToken = ''
//const form1 = document.getElementById('form');
// function retrieveFormValue(event) {
//     event.preventDefault();

//     const id = form1.querySelector('[name="userIdForm"]')
//     const role = form1.querySelector('[name="userRoleForm"]')
//     const formValues = {
//         id: id.value,
//         role: role.value
//     }
//     console.log(formValues)
//     return formValues
// }

//form.addEventListener('submit', retrieveFormValue);


const auth = {
    bearer: '',
    isAuth: false,
}




const
    saveAuthorizeResponse = (res) => {
        console.log(res)
        const keys = Object.keys(res)
        console.log(keys)
        for (const [key, value] of Object.entries(res)) {
            localStorage.setItem(key, value);
            console.log(key, value)
          }
        console.log(localStorage.getItem('access_token'))
        auth.bearer = `Bearer ${localStorage.getItem('access_token')}`
        return true
    },

    /**
     * Отправка авторизации
     * @param {string} username - логин
     * @param {string} password - пароль
     * @return {Promise<boolean>}
     */
    authorize = async (username, password) => {
            const body = new FormData();
            body.append("username", username);
            body.append("password", password);
        
            const response = await fetch(requestAuthURL, {
              method: 'POST',
              body
            });
            if (!response) {
                alert(`Ошибка получения ответа!`)
                return false
            }
            if (response.status!==200){
                if (response.status === 401){
                    alert(`Ошибка авторизации!`)
                    return false
                }
                alert(`Получен статус ошибки ${response.status}!`)
                return false
            }
            saveAuthorizeResponse(await response.json())
            return true
},

    /**
     * Реакция на отправку формы
     * @param {Event} e
     * @param {string} username - логин
     * @param {string} password - пароль
     * @return {Promise<boolean>}
     */
    onSend = async (e, username, password) => {
        e.preventDefault()
        if(!password || !username) {
            alert('А правильно ли ты ввёл?')
            return false
        }
        await authorize(username, password)
        return true
    }

/**
 * Форма
 */
const form = document.forms?.formElem || null
if(form){
    const
        un = form?.username,
        pw = form?.password
    form.addEventListener("submit", (e) => onSend(e, un.value, pw.value));
}


function f1(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestUsersURL);

    xhr.onload = function(){
        console.log(xhr.status);
        console.log(xhr.response);
    }

    xhr.send()
}


function f2(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestUsersURL);
    xhr.setRequestHeader('Authorization', auth.bearer);


    xhr.onload = function(){
        console.log(xhr.status);
        console.log(xhr.response);
        const data = JSON.parse(xhr.response);
        const responseKeys = {
            'id': 'userId',

        }
        console.log(data);
        document.getElementById("statusCode").innerHTML = `StatusCode: ${xhr.status}`;
        document.getElementById("userId").innerHTML = `User ID: ${data[2]['id']}`; 
        document.getElementById("userLogin").innerHTML = `User login: ${data[2]['login']}`;
        document.getElementById("userName").innerHTML = `User name: ${data[2]['name']}`;
        document.getElementById("userRoleId").innerHTML = `User role id: ${data[2]['role_id']}`;
        document.getElementById("userStatus").innerHTML = `User status: ${data[2]['status']}`;
    }

    xhr.send();
}




function f3(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestMyUserInf);
    xhr.setRequestHeader('Authorization', auth.bearer)

    xhr.onload = function(){
        console.log(xhr.status);
        console.log(xhr.response);
        const data = JSON.parse(xhr.response);
        const responseKeys = {
            'id': 'userId',

        }
        console.log(data);
        document.getElementById("statusCodeMyInf").innerHTML = `StatusCode: ${xhr.status}`;
        document.getElementById("myId").innerHTML = `User ID: ${data['id']}`;
        document.getElementById("userLoginMyInf").innerHTML = `User login: ${data['login']}`;
        document.getElementById("userRoleIdMyInf").innerHTML = `User role: ${data['role_id']}`;
        document.getElementById("userStatusMyInf").innerHTML = `User status: ${data['status']}`;
        document.getElementById("userMaxSessionsMyInf").innerHTML = `User max sessions: ${data['max_sessions']}`;
        document.getElementById("userDarkThemeMyInf").innerHTML = `User dark theme: ${data['dark_theme']}`;
        document.getElementById("userRoleDescriptionMyInf").innerHTML = `User role description: ${data['role_description']}`;
        document.getElementById("userRoleAccessMyInf").innerHTML = `User role access: ${data['role_access']}`;
    }

    xhr.send();
}


