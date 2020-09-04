let baseUrl = 'http://localhost:3000';

$( document ).ready(function() {
    $('a').click(function(event){
        event.preventDefault();
    })
    $('form').submit(function(event){
        event.preventDefault();
    })
    auth()
});

function auth() {
    $('#sign-page').hide()
    $('#home-page').hide()
    $('#signup-page').hide()
    $('#post-put-todos').hide()
    if(localStorage.token) {
        $('#home-page').show()
        $('#todos-container').show();
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
            localStorage.setItem('token', data.access_token)
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

// GOOGLE OAUTH
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    $.ajax({
        url : `${baseUrl}/users/googleSign`,
        method : 'post',
        data : {
            id_token
        } 
    })
    .done(data => {
        console.log(data);
        localStorage.setItem('token', data.access_token)
        auth()
    })
    .fail(err => {
        console.log(err)
    })
    .always(err => {
    })
}

function signUp(event) {
    event.preventDefault();
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();
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
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    auth();
}

function fetchTodo() {
    $.ajax({
        url : `${baseUrl}/todos`,
        method : `get`,
        headers : {
            access_token : localStorage.token
        }
    })
    .done(data => {
        $('#todos-container-inner').empty()
        data.todos.forEach(item => {
            $('#todos-container-inner').append(`
            <div class="p-2 row bg-light todo-each">
                <div class="col-sm-1">
                    <button type="button" class="btn btn-success btn-sm">done</button>
                </div>
                <div class="col-sm-7 text-left">
                    <h4>${item.title}</h4>
                </div>
                <div class="col-sm-2 text-left">
                    <small>due : ${item.due_date.slice(0,10)}</small>
                </div>
                <div class="col-sm-2 text-right">
                    <button type="button" onclick="edit(${item.id})" class="btn btn-info btn-sm">edit</button>
                    <button type="button" onclick="deleteTodo(${item.id})" class="btn btn-danger btn-sm"> x </button>
                </div>
            </div>
            `)
        })
    })
    .fail(err => {
        console.log(err.responseJSON)
    })
}
function addTodo() {
    $('#todos-container').hide();
    $('#post-put-todos').show()
}
function postTodo(){
    let title = $('#add-title').val();
    let description = $('#add-description').val();
    let due_date = $('#add-due-date').val();
    let access_token = localStorage.token;
    $.ajax({
        url: `${baseUrl}/todos/`,
        method: 'post',
        headers: {
            access_token
        },
        data : {
            title,
            description,
            due_date
        }
    })
    .done(data => {
        console.log(data)
    })
    .fail(err => {
        console.log(err.responseJSON);
    })
    .always(_=> {
        auth()
    })
}
function deleteTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: 'delete',
        headers: {
            access_token: localStorage.token
        }
    })
    .done(data => {
        fetchTodo()
    })
    .fail(err => {
        console.log(err.responseJSON);
    })
    .always(_=> {

    })
}