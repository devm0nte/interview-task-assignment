# Interview Task APIs

## Description

APIs Document of Interview Task API Service

## Servers

-   **Version 1:** [http://localhost:3000/v1/](http://localhost:3000/v1/)

## Tags

-   **Authentication:** Authentication and User APIs
-   **Interviews:** Interview APIs
-   **Comments:** Comments API

## Paths

### /api/auth/signin

-   **POST /api/auth/signin**
    -   Tags: Authentication
    -   Summary: User SignIn
    -   Description: SignIn user with email and password
    -   Responses:
        -   200: OK
    -   Request Body:
        -   Required: true
        -   Content:
            -   application/json:
                -   Example:
                    ```json
                    {
                        "email": "test@example.com",
                        "password": "testtest"
                    }
                    ```

### /api/auth/signup

-   **POST /api/auth/signup**
    -   Tags: Authentication
    -   Summary: User SignUp
    -   Description: SignUp user with email, password, and name
    -   Responses:
        -   201: Created
        -   422: Unprocessable Entity
    -   Request Body:
        -   Required: true
        -   Content:
            -   application/json:
                -   Example:
                    ```json
                    {
                        "email": "test@example.com",
                        "password": "testtest",
                        "name": "test"
                    }
                    ```

### /api/auth/users

-   **GET /api/auth/users**
    -   Tags: Authentication
    -   Summary: Get all users "FOR ADMIN ROLE ONLY"
    -   Description: Get all users from the database
    -   Parameters:
        -   take (query, number): limit data rows [default: 3]
        -   skip (query, number): skip data rows [default: 0]
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth

### /api/auth/profile

-   **GET /api/auth/profile**
    -   Tags: Authentication
    -   Summary: Get user profile
    -   Description: Get user profile, require Token for authentication
    -   Responses:
        -   200: OK
    -   Security:
        -   Bearer Auth

### /api/interviews/

-   **GET /api/interviews/**

    -   Tags: Interviews
    -   Summary: Get all interviews
    -   Description: Get all interviews from the database
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity

-   **POST /api/interviews/**
    -   Tags: Interviews
    -   Summary: Create interview
    -   Description: Create an interview task
    -   Responses:
        -   201: Created
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth
    -   Request Body:
        -   Required: true
        -   Content:
            -   application/json:
                -   Example:
                    ```json
                    {
                        "subject": "test topic",
                        "description": "test description",
                        "status": "Todo"
                    }
                    ```

### /api/interviews/{id}

-   **GET /api/interviews/{id}**

    -   Tags: Interviews
    -   Summary: Get interviews details by ID
    -   Description: Get an interviews details
    -   Parameters:
        -   id (path, string, required): Interview ID
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity

-   **PUT /api/interviews/{id}**
    -   Tags: Interviews
    -   Summary: Update interview
    -   Description: Update an interview details
    -   Parameters:
        -   id (path, string, required): Interview ID
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth
    -   Request Body:
        -   Required: true
        -   Content:
            -   application/json:
                -   Example:
                    ```json
                    {
                        "subject": "test topic2",
                        "description": "test description2",
                        "status": "Todo"
                    }
                    ```

### /api/interviews/archive/{id}

-   **PUT /api/interviews/archive/{id}**
    -   Tags: Interviews
    -   Summary: Archive an interview
    -   Description: Archive an interview task (like soft delete from the database)
    -   Parameters:
        -   id (path, string, required): Interview ID
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth

### /api/comments/

-   **GET /api/comments/**

    -   Tags: Comments
    -   Summary: Get all comments "FOR ADMIN ROLE ONLY"
    -   Description: Get all comments from the database
    -   Parameters:
        -   take (query, number): limit data rows [default: 3]
        -   skip (query, number): skip data rows [default: 0]
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth

-   **POST /api/comments/**
    -   Tags: Comments
    -   Summary: Create a new comment
    -   Description: Create a new comment in the interview
    -   Responses:
        -   201: Created
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth
    -   Request Body:
        -   Required: true
        -   Content:
            -   application/json:
                -   Example:
                    ```json
                    {
                        "interview_id": 1,
                        "message": "test message"
                    }
                    ```

### /api/comments/interview/{interview_id}

-   **GET /api/comments/interview/{interview_id}**
    -   Tags: Comments
    -   Summary: Get all comments by interview Id
    -   Description: Get all comments by interview Id from the database
    -   Parameters:
        -   interview_id (path, string, required): Interview ID
        -   take (query, number): limit data rows [default: 3]
        -   skip (query, number): skip data rows [default: 0]
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity

### /api/comments/{id}

-   **PUT /api/comments/{id}**

    -   Tags: Comments
    -   Summary: Update a comment by ID
    -   Description: Update a comment
    -   Parameters:
        -   id (path, string, required): Comment ID
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth
    -   Request Body:
        -   Required: true
        -   Content:
            -   application/json:
                -   Example:
                    ```json
                    {
                        "message": "test message2"
                    }
                    ```

-   **DELETE /api/comments/{id}**
    -   Tags: Comments
    -   Summary: Delete a comment by ID
    -   Description: Delete a comment by ID
    -   Parameters:
        -   id (path, string, required): Comment ID
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth

### /api/comments/archive/{id}

-   **PUT /api/comments/archive/{id}**
    -   Tags: Comments
    -   Summary: Archive a comment
    -   Description: Archive a comment (like soft delete from the database)
    -   Parameters:
        -   id (path, string, required): Comment ID
    -   Responses:
        -   200: OK
        -   422: Unprocessable Entity
    -   Security:
        -   Bearer Auth

## Schema

### User

-   `id` (integer) - User ID
-   `name` (string) - User name
-   `email` (string) - User email
-   `password` (string) - User password
-   `role` (string) - User role (enum: User, Admin)
-   `is_active` (boolean) - User activity status
-   `created_at` (string, format: date-time) - User creation timestamp
-   `updated_at` (string, format: date-time) - User update timestamp
-   `deleted_at` (string, format: date-time) - User deletion timestamp
-   `interview` (array of Interview) - User interviews
-   `interview_change_log` (array of InterviewChangeLog) - User interview change logs
-   `comment` (array of Comment) - User comments

### Interview

-   `id` (integer) - Interview ID
-   `subject` (string) - Interview subject
-   `description` (string) - Interview description
-   `status` (string, enum: Todo, InProgress, Done) - Interview status
-   `author_id` (integer) - ID of the user who authored the interview
-   `created_at` (string, format: date-time) - Interview creation timestamp
-   `updated_at` (string, format: date-time) - Interview update timestamp
-   `archived_at` (string, format: date-time) - Interview archival timestamp
-   `interview_change_log` (array of InterviewChangeLog) - Interview change logs
-   `comment` (array of Comment) - Interview comments

### InterviewChangeLog

-   `id` (integer) - Interview change log ID
-   `interview_id` (integer) - ID of the interview associated with the change log
-   `subject` (string) - Change log subject
-   `description` (string) - Change log description
-   `status` (string, enum: Todo, InProgress, Done) - Change log status
-   `editor_id` (integer) - ID of the user who edited the interview
-   `updated_at` (string, format: date-time) - Change log update timestamp
-   `archived_at` (string, format: date-time) - Change log archival timestamp

### Comment

-   `id` (integer) - Comment ID
-   `interview_id` (integer) - ID of the interview associated with the comment
-   `author_id` (integer) - ID of the user who authored the comment
-   `message` (string) - Comment message
-   `created_at` (string, format: date-time) - Comment creation timestamp
-   `updated_at` (string, format: date-time) - Comment update timestamp
-   `deleted_at` (string, format: date-time) - Comment deletion timestamp
