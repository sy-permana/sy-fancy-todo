let baseUrl = 'http://localhost:3000';

$( document ).ready(function() {
    auth()
});

function auth() {
    $('#sign-page').hide()
    $('#home-page').hide()
    $('#signup-page').hide()
    if(localStorage.token) {
        $('#home-page').show()
        fetchTodo();
    } else {
        $('#sign-page').show()
    }
}

function signIn(event){
    event.preventDefault()
        const email = $("#signin-email").val();
        const password = $("#signin-password").val();
        $.ajax({
            url: `${baseUrl}/users/signin`,
            method: 'post',
            data: {
                email,
                password
            }
        })
        .done(data => {
            localStorage.setItem('token', data.token)
            auth()
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
        .always(_=> {
            $("#signin-email").val('');
            $("#signin-password").val('');
        })
}

function signUpShow(event){
    event.preventDefault();
    $('#signup-page').show()
    $('#sign-page').hide()
}

function signUp(event) {
    event.preventDefault();
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();
    console.log(email,password)
    $.ajax({
        url: `${baseUrl}/users/signup`,
        method: 'post',
        data: {
            email,
            password
        }
    })
    .done(data => {
        console.log(data)
        auth()
    })
    .fail(err => {
        console.log(err.responseJSON);
    })
    .always(_=> {
        $("#signup-email").val("");
        $("#signup-password").val("");
    })
}

function signOut() {
    localStorage.clear();
    auth();
}

function fetchTodo() {
    console.log(localStorage.token)
    $.ajax({
        url : `${baseUrl}/todos`,
        method : `get`,
        headers : {
            token: localStorage.token
        }
    })
    .done(data => {
        data.todos.forEach(item => {
            $('#todos-container').append(`
                <li>
                    <p>${item.title}</p>
                    <p>${item.description}</p>
                    <p>${item.due_date}</p>
                </li>
            `)
        })
    })
    .fail(err => {
        console.log(err.responseJSON)
    })
}