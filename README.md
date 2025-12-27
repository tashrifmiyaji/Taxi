# Taxi (MERN) — API Reference

A ride-hailing application (similar to Uber) with a Node.js/Express backend and a React frontend.

**Base URL:** `http://localhost:5000`  
**Frontend config:** Set `VITE_BASE_URL=http://localhost:5000` in `frontend/.env`

---

## User Endpoints

### 1. Register User

**POST** `/user/register`

**Body:**
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

**Validation:**
- `email`: must be a valid email format
- `fullName.firstName`: must be at least 3 characters
- `password`: must be at least 6 characters

**Success (200):**
```json
{
  "user": {
    "_id": "...",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "token": "JWT_TOKEN"
}
```

**Errors:**
- Invalid email format
- User already exists
- Validation errors from above

---

### 2. Login User

**POST** `/user/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Validation:**
- `email`: must be a valid email format

**Success (200):**
```json
{
  "user": {
    "_id": "...",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "token": "JWT_TOKEN"
}
```

**Errors:**
- Invalid email format
- Invalid credentials (email/password mismatch)

---

### 3. Get User Profile

**GET** `/user/profile`

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Success (200):**
```json
{
  "_id": "...",
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "john@example.com",
  "socketId": null,
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Errors:**
- Unauthorized (missing or invalid token)

---

### 4. Logout User

**GET** `/user/logout`

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Success (200):**
```json
{
  "message": "User logged out"
}
```
*Token is blacklisted server-side; frontend should remove from localStorage.*

**Errors:**
- Unauthorized (missing or invalid token)

---

## Captain (Driver) Endpoints

### 1. Register Captain

**POST** `/captain/register`

**Body:**
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

**Validation:**
- `email`: must be a valid email
- `fullName.firstName`: at least 3 characters
- `password`: at least 6 characters
- `vehicle.vehicleNumber`: at least 4 characters
- `vehicle.capacity`: at least 1
- `vehicle.vehicleType`: must be `"car"` or `"bike"`

**Success (200):**
```json
{
  "captain": {
    "_id": "...",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "black",
      "vehicleNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "type": "Point",
      "coordinates": [0, 0]
    },
    "socketId": null,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "token": "JWT_TOKEN"
}
```

**Errors:**
- Invalid email
- First name too short
- Password too short
- Vehicle number too short
- Invalid vehicle type
- Captain already exists

---

### 2. Login Captain

**POST** `/captain/login`

**Body:**
```json
{
  "email": "captain@example.com",
  "password": "yourpassword"
}
```

**Validation:**
- `email`: must be a valid email

**Success (200):**
```json
{
  "captain": {
    "_id": "...",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "black",
      "vehicleNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "type": "Point",
      "coordinates": [0, 0]
    },
    "socketId": null,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "token": "JWT_TOKEN"
}
```

**Errors:**
- Invalid email format
- Invalid credentials

---

### 3. Get Captain Profile

**GET** `/captain/profile`

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Success (200):**
```json
{
  "_id": "...",
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "captain@example.com",
  "status": "inactive",
  "vehicle": {
    "color": "black",
    "vehicleNumber": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "type": "Point",
    "coordinates": [0, 0]
  },
  "socketId": null,
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Errors:**
- Unauthorized (missing or invalid token)

---

### 4. Logout Captain

**GET** `/captain/logout`

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Success (200):**
```json
{
  "message": "captain logout successfully."
}
```
*Token is blacklisted server-side; frontend should remove from localStorage.*

**Errors:**
- Unauthorized (missing or invalid token)

---

## Ride Endpoints

### 1. Create Ride

**POST** `/ride/create`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (user)
```

**Body:**
```json
{
  "pickup": "123 Main St, City",
  "destination": "456 Oak Ave, City",
  "vehicleType": "car"
}
```

**Validation:**
- `pickup`: string, at least 3 characters
- `destination`: string, at least 3 characters
- `vehicleType`: must be `"car"` or `"bike"`

**Success (200):**
```json
{
  "ride": {
    "_id": "...",
    "user": "user_id",
    "captain": null,
    "pickup": "123 Main St, City",
    "destination": "456 Oak Ave, City",
    "fare": 250,
    "status": "pending",
    "distance": 5.2,
    "duration": 15,
    "otp": "123456",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 2. Get Fare Estimate

**GET** `/ride/get-fare?pickup=...&destination=...`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (user)
```

**Query Parameters:**
- `pickup`: string, at least 3 characters
- `destination`: string, at least 3 characters

**Success (200):**
```json
{
  "fare": {
    "car": 250,
    "bike": 100,
    "auto": 150
  }
}
```

---

### 3. Confirm Ride (Captain accepts)

**POST** `/ride/confirm`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (captain)
```

**Body:**
```json
{
  "rideId": "mongo_id"
}
```

**Validation:**
- `rideId`: valid MongoDB ObjectId

**Success (200):**
```json
{
  "ride": {
    "_id": "...",
    "user": "user_id",
    "captain": "captain_id",
    "pickup": "123 Main St, City",
    "destination": "456 Oak Ave, City",
    "fare": 250,
    "status": "accepted",
    "otp": "123456",
    ...
  }
}
```

---

### 4. Start Ride

**GET** `/ride/ride-started?rideId=...&otp=...`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (captain)
```

**Query Parameters:**
- `rideId`: valid MongoDB ObjectId
- `otp`: string, exactly 6 characters

**Success (200):**
```json
{
  "ride": {
    "_id": "...",
    "status": "ongoing",
    ...
  }
}
```

---

### 5. End Ride

**POST** `/ride/ride-end`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (captain)
```

**Body:**
```json
{
  "rideId": "mongo_id"
}
```

**Validation:**
- `rideId`: valid MongoDB ObjectId

**Success (200):**
```json
{
  "ride": {
    "_id": "...",
    "status": "completed",
    ...
  }
}
```

---

## Maps Endpoints

### 1. Get Coordinates

**GET** `/maps/coordinates?address=...`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (user)
```

**Query Parameters:**
- `address`: string, at least 3 characters

**Success (200):**
```json
{
  "lat": 40.7128,
  "lng": -74.0060
}
```

---

### 2. Get Distance and Time

**GET** `/maps/distance-time`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (user)
```

**Query Parameters:**
- `origin`: lat,lng (e.g., `40.7128,-74.0060`)
- `destination`: lat,lng

**Success (200):**
```json
{
  "distance": { "text": "5.2 km", "value": 5200 },
  "duration": { "text": "15 mins", "value": 900 }
}
```

---

### 3. Get Address Suggestions

**GET** `/maps/suggestions?input=...`

**Headers:**
```
Authorization: Bearer JWT_TOKEN (user)
```

**Query Parameters:**
- `input`: string, at least 3 characters

**Success (200):**
```json
{
  "suggestions": [
    "123 Main St, City, State",
    "123 Main Ave, City, State",
    ...
  ]
}
```

---

## Authentication & Token Usage

- **Token Format:** JWT
- **Storage:** Frontend should store in `localStorage` under key `token`
- **Header Format:** `Authorization: Bearer <JWT_TOKEN>`
- **Token Expiry:** Captains' tokens expire in 1 day; users' tokens don't expire by default
- **Logout:** Token is blacklisted on the backend; frontend should also remove from `localStorage`

## Notes

- All endpoints use `/api/v1` prefix (check backend `app.js` for routing)
- Ride status flow: `pending` → `accepted` → `ongoing` → `completed` (or `cancel`)
- Captain status: `active` or `inactive` (default)
- Vehicle types: `car` or `bike`
