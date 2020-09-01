**Show Todos**
----
  Returns all todo List as array of object.

* **URL**

  `/todos`

* **Method:**
  
  `GET`
  
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
                "description": "sample desc 1",
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



**Create Todo**
----
  Create new todo
* **URL**

  `/todos`

* **Method:**
  
  `POST`


*  **URL Params**

   `none`

* **Data Params**

  ```json
    {
        "title" : "string",
        "description" : "string",
        "due_date" : "timestamp"
    }
  ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:**
    ```json
    {
        "msg": "creating todo success",
        "todo": {
            "id": "integer",
            "title": "string",
            "description": "string",
            "status": "boolean",
            "due_date": "timestamp",
            "userId": "integer",
            "updatedAt": "timestamp",
            "createdAt": "timestamp"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "Title cannot empty"
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
          "error message"
        ]
    }
    ```


**Update Todo**
----
  update todo

* **URL**

  `/todos/:id`

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**

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

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "msg": "update todo with id `id` success",
    "todo": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "boolean",
        "due_date": "timestamp",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
      "errors": [
        "Title cannot empty"
      ]
    }
    ```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
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
        "todo not found!"
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

**Delete Todo**
----
  Delete Todo

* **URL**

  `/todos/:id`

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   **Required:**
 
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
        "Title cannot empty"
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
        "todo not found!"
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