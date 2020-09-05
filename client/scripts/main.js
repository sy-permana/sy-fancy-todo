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
    $('#todo-add-form').hide()
    $('#todo-edit-form').hide()
    if(localStorage.token) {
        $('#home-page').show()
        $('#todos-container').show();
        profileSet()
        fetchTodo();
    } else {
        $('#sign-page').show()
    }
}

function profileSet(){
    $('#profilePic').css("background-image",`url(${localStorage.picture})`);
    $('#profileCredential').empty().append(`
    <span>${localStorage.email}</span><br>
    <small><a href="#" onclick="signOut()">Sign Out</a></small>
    `)
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
            localStorage.setItem('email', data.email)
            localStorage.setItem('picture', data.picture)
            auth()
        })
        .fail(err => {
            errorHandler(err)
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
    $.ajax({
        url : `${baseUrl}/users/googleSign`,
        method : 'post',
        data : {
            id_token
        } 
    })
    .done(data => {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('picture', data.picture)
        auth()
    })
    .fail(err => {
        errorHandler(err)
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
        errorHandler(err)
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
            let date = item.due_date.slice(0,10).split('-')[2];
            let month = item.due_date.slice(0,10).split('-')[1];
            let year = item.due_date.slice(0,10).split('-')[0];
            let button = 'danger';
            if (item.status === true) { button = 'success' }
            $('#todos-container-inner').append(`
            <tr>
                <th scope="row">
                <button class="btn btn-${button} btn-sm" onclick="toggleTodo(${item.id})" ><img src="./assets/1x/baseline_done_black_18dp.png" ></button>
                </th>
                <td style="min-width: 300px;" class="text-left font-weight-bold text-capitalize">${item.title}</td>
                <td><small>${date}/${month}/${year}</small></td>
                <td class="text-right">
                <div class="btn-group">
                    <button class="btn btn-info btn-sm" onclick="fetchOne(${item.id})" >view detail</button>
                    <button class="btn btn-warning btn-sm" onclick="editTodoForm(${item.id})" ><img src="./assets/baseline_edit_black_18dp.png">edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTodo(${item.id})"><img src="./assets/baseline_delete_black_18dp.png" >delete</button>
                </div>
                </td>
            </tr>
            `)
        })
    })
    .fail(err => {
        errorHandler(err)
    })
}

function fetchOne (id){
    $.ajax({
        url : `${baseUrl}/todos/${id}`,
        method : 'get',
        headers : {
            access_token : localStorage.token
        }
    })
    .done(data => {
        let date = data.todo.due_date.slice(0,10).split('-')[2];
        let month = data.todo.due_date.slice(0,10).split('-')[1];
        let year = data.todo.due_date.slice(0,10).split('-')[0];
        swal(`
        Description : ${data.todo.description}

        Due Date : ${date} - ${month} - ${year}
        `, {
            title : data.todo.title,
        });
    })
    .fail(err => {
        errorHandler(err)
    })
}

function addTodo() {
    $('#todos-container').hide();
    $('#todo-add-form').show()
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
        auth()
    })
    .fail(err => {
        errorHandler(err)
    })
    .always(_=> {
        $('input').val('')
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
        errorHandler(err)
    })
    .always(_=> {

    })
}

// PUT

function editTodoForm(id){
    $('#todos-container').hide();
    let access_token = localStorage.token;
    $.ajax({
        url : `${baseUrl}/todos/${id}`,
        method : 'get',
        headers : {
            access_token
        }
    })
    .done(data => {
        console.log(data.todo)
        let dateParse = data.todo.due_date.slice(0,10).split('-')
        let date = dateParse[2]
        let month = dateParse[1];
        let year = dateParse[0];
        $('#put-title').val(data.todo.title);
        $('#put-description').val(data.todo.description);
        $('#put-status').val(`${data.todo.status}`).change();
        $('#put-due-date').val(`${year}-${month}-${date}`);
        $('#edit-form-put').attr('onsubmit',`putTodo(${data.todo.id})`)
        $('#todo-edit-form').show()
    })
    .fail(err => {
        errorHandler(err);
    })
}

function putTodo(id) {
    let access_token = localStorage.token;
    let title = $('#put-title').val()
    let status = $('#put-status').val()
    let description = $('#put-description').val()
    let due_date = $('#put-due-date').val()
    $.ajax({
        url : `${baseUrl}/todos/${id}`,
        method : 'put',
        headers : {
            access_token
        },
        data : {
            title,
            status,
            description,
            due_date
        }
    })
    .done(data => {
        swal(`
            description : ${data.todo.description}
        `,{
            icon : "success",
            title : data.todo.title,
            timer : 1500,
            button : false
        });
        fetchTodo();
        auth();
    })
    .fail(err => {
        errorHandler(err);
    })
}

// FETCH
function toggleTodo(id) {
    $.ajax({
        url : `${baseUrl}/todos/${id}`,
        method : `patch`,
        headers : {
            access_token : localStorage.token
        },
        data : {
            status : true
        }
    })
    .done(data => {
        console.log(data)
        swal({
            icon : "success",
            title : data.todo.title,
            timer : 1500,
            button : false
        });
        fetchTodo();
    })
    .fail(err => {
        errorHandler(err)
    })
}

function errorHandler(err) {
    swal(err.responseJSON.errors.join(', '), {
        title : 'Errors',
        className: 'red-bg',
    });
}