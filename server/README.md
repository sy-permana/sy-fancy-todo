# Fancy Todo
  #### `*A simple web app portofolio to manage your todo list.*`

## Usere Sign-In and Sign-Up

**User Sign Up**
----
  Sign Up new user to gain access

* **URL**

  `/users/signup`

* **Method:**
  
  `POST`

* **URL Params**

   `none`

* **Data Params**

  ```json
    {
        "email" : "email@example.com",
        "password" : "yourPassword",
    }
  ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:**
    ```json
    {
      "msg": "sign up success",
      "user": {
          "id": 1,
          "email": "example@email.com"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "email is required"
      ]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "internal server error"
        ]
    }
    ```

**User Sign In**
----
  Sign In to access

* **URL**

  `/users/signin`

* **Method:**
  
  `POST`

* **URL Params**

   `none`

* **Data Params**

  ```json
    {
        "email" : "email@example.com",
        "password" : "yourPassword",
    }
  ```

* **Success Response:**

  * **Code:** 200 SIGN IN SUCCESS <br />
    **Content:**
    ```json
    {
      "access_token": "returningYourJWTAccessToken",
      "email": "example@email.com",
      "picture": "image-url"
    }
    ```

* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "invalid email or password"
      ]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "internal server error"
        ]
    }
    ```

**Google Sign In**
----
  OAuth Google

* **URL**

  `/users/googleSign`

* **Method:**
  
  `POST`

* **URL Params**

   `none`

* **Data Params**

  `id_token`

  *you need to successfully signed in using your google account to automatically get `id_token`*

* **Success Response:**

  * **Code:** 200 SIGN IN SUCCESS <br />
    **Content:**
    ```json
    {
      "access_token": "returningYourJWTAccessToken",
      "email": "example@email.com",
      "picture": "image-url"
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "internal server error"
        ]
    }
    ```

<hr>

## Todo Endpoint

**Show All User's Todos**
---
  Returns all todo List as array of object. ordered by status, false first.

* **URL**

  `/todos`

* **Method:**
  
  `GET`

* **Headers**

  `access_token`


* **URL Params**

  `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
        {
            "todos": [
                {
                "id": 1,
                "title": "sample title 1",
                "description": "sample description 1",
                "status": true,
                "due_date": "2020-11-30T16:00:00.000Z",
                "createdAt": "2020-08-31T09:02:13.476Z",
                "updatedAt": "2020-08-31T09:22:55.951Z"
                }
            ]
        }
    ```
 
* **Error Response:**

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "authentication failed"
      ]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "error message"
        ]
    }
    ```

**Get One User's Todos**
---
  Returns one todo

* **URL**

  `/todos/:id`

* **Method:**
  
  `GET`

* **Headers**

  `access_token`


* **URL Params**

   **Required:**
    *Todo's id*
   `id=[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "todo": {
        "id": 17,
        "title": "test todo",
        "description": "testing todo",
        "status": true,
        "due_date": "2020-09-23T16:00:00.000Z",
        "userId": 1,
        "createdAt": "2020-09-03T05:18:16.660Z",
        "updatedAt": "2020-09-04T16:13:45.339Z"
      }
    }
    ```

* **Error Response:**

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "authentication failed"
      ]
    }
    ```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "not authorized"
      ]
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "errors": [
        "todo not found"
      ]
    }
    ```

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "error message"
        ]
    }
    ```

**Create New Todo**
----
  Create new todo
* **URL**

  `/todos`

* **Method:**
  
  `POST`

* **Headers**

  `access_token`

* **URL Params**

   `none`

* **Data Params**

  ```json
    {
        "title" : "[string]",
        "description" : "[string]",
        "due_date" : "[date]"
    }
  ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    ```json
    {
        "msg": "creating todo success"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "title is required"
      ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "authentication failed"
      ]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "internal server error"
        ]
    }
    ```


**Update Todo**
----
  update your todo, you can update the title, description, due date and status

* **URL**

  `/todos/:id`

* **Method:**
  
  `PUT`
  
* **URL Params**

   **Required:**
    *Todo's id*
   `id=[integer]`

* **Data Params**

  ```json
    {
        "title" : "string",
        "description" : "string",
        "status" : "boolean",
        "due_date" : "timestamp"
    }
  ```

* **Success Response:**

  * **Code:** 200 UPDATED <br />
    **Content:** 
    ```json
    {
    "msg": "update todo with id 'integer' success"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "title is required"
      ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "authentication failed"
      ]
    }
    ```
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "not authorized"
      ]
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "errors": [
        "todo not found"
      ]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "internal server error"
        ]
    }
    ```

**Toggle Todo Status**
----
  toggle your todo status `true or false`
* **URL**

  `/todos/:id`

* **Method**
  
  `PATCH`

* **Headers**

  `access_token`

* **URL Params**

   **Required:**
    *Todo's id*
   `id=[integer]`

* **Data Params**

  ```json
  {
    "status" : "boolean",
  }
  ```

* **Success Response:**

  * **Code:** 200 UPDATED <br />
    **Content:** 
    ```json
    {
      "msg": "todo has been updated!",
      "todo": {
        "id": 17,
        "title": "Edited Title",
        "description": "Hey, i eddited this one",
        "status": true,
        "due_date": "2020-12-11T16:00:00.000Z",
        "userId": 1,
        "createdAt": "2020-09-03T05:18:16.660Z",
        "updatedAt": "2020-09-04T16:36:11.314Z"
      }
    }
    ```

* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "title is required"
      ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "authentication failed"
      ]
    }
    ```
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "not authorized"
      ]
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "errors": [
        "todo not found"
      ]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "internal server error"
        ]
    }
    ```


**Delete Todo**
----
  Delete one of your Todo

* **URL:**

  `/todos/:id`

* **Method:**

  `DELETE`

* **Headers:**

  `access_token`

* **URL Params**

   **Required:**
    *Todo's id*
   `id=[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "msg": "success delete"
    }
    ```

* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "title is required"
      ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "authentication failed"
      ]
    }
    ```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "errors": [
        "not authorized"
      ]
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "errors": [
        "todo not found"
      ]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors" : [
          "internal server error"
        ]
    }
    ```