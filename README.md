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

## Captain API Endpoints

### 1. Register Captain

- **Endpoint:** `POST /captain/register`
- **Body:**
  ```json
  {
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "captain@example.com",
    "password": "yourpassword",
    "vehicle": {
        "color": "black",
        "vehicleNumber": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
  }
  ```
- **Success Response:**
  ```json
  {
    "captain": {
      "_id": "...",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "captain@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "black",
        "vehicleNumber": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "JWT_TOKEN"
  }
  ```
- **Error Responses:**
  ```json
  { "error": [ { "msg": "Invalid Email" } ] }
  ```
  ```json
  { "error": [ { "msg": "First name must be at least 3 character long!" } ] }
  ```
  ```json
  { "error": [ { "msg": "password must be at least 6 character long!" } ] }
  ```
  ```json
  { "error": [ { "msg": "vehicle Number must be at least 4 character long!" } ] }
  ```
  ```json
  { "error": [ { "msg": "Vehicle type must be car or bike!" } ] }
  ```
  ```json
  { "message": "captain already exist!" }
  ```

### Vehicle Types
- car
- bike

### Captain Status
- active
- inactive
- 
- ### 2. Login Captain

- **Endpoint:** `POST /captain/login`
- **Body:**
  ```json
  {
    "email": "captain@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  ```json
  {
    "captain": {
      "_id": "...",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "captain@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "black",
        "vehicleNumber": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "JWT_TOKEN"
  }
  ```
- **Error Responses:**
  ```json
  { "error": [ { "msg": "invalid email!" } ] }
  ```
  ```json
  { "message": "invalid credential!" }
  ```
  ```json
  { "message": "fill all the required fields!" }
  ```
  