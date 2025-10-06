# MERN-STACK project, like Uber

## User API Endpoints

### 1. Register User

- **Endpoint:** `POST /user/register`
- **Body:**
  ```json
  {
    "fullName": {
        "firstName": "John",
        "lastName": "Doe" 
    },
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "_id": "...",
      "fullName": { 
        "firstName": "John", 
        "lastName": "Doe"
        },
      "email": "john@example.com"
      // other fields
    },
    "token": "JWT_TOKEN"
  }
  ```
- **Error Response:**
  ```json
  { "error": [ { "msg": "invalid email!", ... } ] }
  ```
- **Error Response:**
  ```json
  { "error": [ { "msg": "User already exists!", ... } ] }
  ```
  - **Endpoint:** `POST /user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  ```json
  {
    "user": {
      "_id": "...",
      "fullName": { 
        "firstName": "John", 
        "lastName": "Doe" 
        },
      "email": "john@example.com",
      // other fields
    },
    "token": "JWT_TOKEN"
  }
  ```
- **Error Response:**
  ```json
  { "message": "invalid credential!" }
  ```
  - **Endpoint:** `GET /user/profile`
- **Headers:**
  ```
  Authorization: Bearer JWT_TOKEN
  ```
  -Success Response:
  ```json
  {
    "_id": "...",
    "fullName": { 
        "firstName": "John", 
        "lastName": "Doe" 
        },
    "email": "john@example.com",
    // other fields
  }
  ```
- **Error Response:**
  ```json
  { "message": "unauthorized!" }
  ```
- **Logout User**
  - **Endpoint:** `POST /user/logout`
- **Headers:**
  ```
  Authorization: Bearer JWT_TOKEN
  ```
- **Success Response:**
  ```json
  { "message": "User Logged out" }
  ```
- **Error Response:**
  ```json
  { "message": "unauthorized!" }
  ```