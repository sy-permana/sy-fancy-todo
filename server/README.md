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
                },
                {
                "id": 2,
                "title": "sample title 2",
                "description": "sample title 2",
                "status": false,
                "due_date": "2020-11-30T16:00:00.000Z",
                "createdAt": "2020-08-31T09:26:19.670Z",
                "updatedAt": "2020-08-31T09:26:45.039Z"
                }
            ]
        }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "error" : 'internal server error'
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
        "status" : "boolean",
        "due_date" : "timestamp"
    }
  ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:**
    ```json
    {
        "msg": "creating new Todo success",
        "todo": {
            "id": "integer",
            "title": "string",
            "description": "string",
            "status": "boolean",
            "due_date": "timestamp",
            "updatedAt": "timestamp",
            "createdAt": "timestamp"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
    {
        "error" : "error message"
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

  * **Code:** 500 <br />
    **Content:** `{ error : "Log in" }`

