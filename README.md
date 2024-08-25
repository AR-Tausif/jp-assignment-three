# Co-Working Space Meeting Room Booking System

This is a Co-Working Space Meeting Room Booking System built with Node.js, Express, and MongoDB. It allows users to book meeting rooms by selecting available time slots. Admins can manage rooms, slots, and bookings.

## Features

- **User Registration & Authentication**

  - User sign-up, login, and secure JWT-based authentication.
  - Role-based access control (User, Admin).

- **Room Management (Admin Only)**

  - Create, update, and delete meeting rooms.
  - View details of all available rooms.

- **Slot Management (Admin Only)**

  - Create slots for a room on a specific date and time.
  - Manage slot availability and booking status.

- **Booking Management**
  - Users can book available slots for meeting rooms.
  - Admins can view all bookings and manage their status.
  - Bookings can be confirmed or canceled by admins.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Zod

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AR-Tausif/meeting-room-booking-system.git
   cd meeting-room-booking-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```bash
   NODE_ENV="development"
   PORT=5000
   LOCAL_DATABASE_URL="mongodb://localhost:27017/your_local_db"
   DATABASE_URL="your_mongodb_atlas_url"
   BCRYPT_SALT_ROUND=10
   JWT_ACCESS_SECRET_TOKEN="your_unique_access_secret_key"
   JWT_ACCESS_SECRET="your_unique_access_secret_key"
   JWT_REFRESH_SECRET="your_unique_refresh_secret_key"
   JWT_ACCESS_EXPIRES_IN="1h"
   JWT_REFRESH_EXPIRES_IN="7d"
   FRONTEND_ORIGIN="http://localhost:3000,http://your-production-frontend-url.com"
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

### API Endpoints

#### Authentication

- **POST** `/api/auth/signup` - Register a new user.
- **POST** `/api/auth/login` - Login with email and password.

#### Room Management (Admin Only)

- **POST** `/api/rooms` - Create a new room.
- **GET** `/api/rooms` - Get all rooms.
- **GET** `/api/rooms/:id` - Get room by ID.
- **PUT** `/api/rooms/:id` - Update room details.
- **DELETE** `/api/rooms/:id` - Delete a room (soft delete).

#### Slot Management (Admin Only)

- **POST** `/api/slots` - Create slots for a room.
- **GET** `/api/slots/availability` - Get all slots for a specific room.

#### Booking Management

- **POST** `/api/bookings` - Book slots for a room.
- **PUT** `/api/bookings/:id` - Confirm a booking (Admin Only).
- **DELETE** `/api/bookings/:id` - Delete a booking by ID (User/Admin).
- **GET** `/api/bookings` - Get all bookings (Admin Only).
- **GET** `/api/bookings/my-bookings` - Get bookings by userID.

## Project Structure

```plaintext

.
├── src
|   ├── app
|   |   ├── config
|   |   |   ├── index.ts
|   |   ├── errors
|   |   |   ├── AppErrors.ts
|   |   ├── helper
|   |   |   ├── compareHashedText.ts
|   |   |   ├── jwtVerify.ts
|   |   |   ├── toTitleCase.ts
|   |   ├── interface
|   |   |   ├── index.ts
|   |   ├── middlewares
|   |   |   ├── auth.ts
|   |   |   ├── globalErrorHandlers.ts
|   |   |   ├── NotFound.ts
|   |   |   ├── validateRequest.ts
|   |   ├── modules
|   |   |   ├── auth
|   |   |   |   ├── auth.constant.ts
|   |   |   |   ├── auth.controller.ts
|   |   |   |   ├── auth.route.ts
|   |   |   |   ├── auth.service.ts
|   |   |   |   ├── auth.utils.ts
|   |   |   |   ├── auth.validation.ts
|   |   |   ├── Booking
|   |   |   |   ├── booking.interface.ts
|   |   |   |   ├── booking.controller.ts
|   |   |   |   ├── booking.model.ts
|   |   |   |   ├── booking.route.ts
|   |   |   |   ├── booking.service.ts
|   |   |   |   ├── booking.validation.ts
|   |   |   ├── Rooms
|   |   |   |   ├── rooms.interface.ts
|   |   |   |   ├── rooms.controller.ts
|   |   |   |   ├── rooms.model.ts
|   |   |   |   ├── rooms.route.ts
|   |   |   |   ├── rooms.service.ts
|   |   |   |   ├── rooms.validation.ts
|   |   |   ├── Slots
|   |   |   |   ├── booking.constants.ts
|   |   |   |   ├── booking.interface.ts
|   |   |   |   ├── booking.controller.ts
|   |   |   |   ├── booking.model.ts
|   |   |   |   ├── booking.route.ts
|   |   |   |   ├── booking.service.ts
|   |   |   |   ├── booking.validation.ts
|   |   |   ├── Users
|   |   |   |   ├── users.interface.ts
|   |   |   |   ├── users.model.ts
|   |   |   |   ├── users.validation.ts
|   |   ├── routes
|   |   |   ├── index.ts
|   |   ├── utils
|   |   |   ├── catchAsync.ts
|   |   |   ├── sendResponse.ts
│   ├── app.ts
|   ├── server.ts
├── .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

```

## Demo

Check out the live demo: [Co-Working Space Meeting Room Booking System](https://meeting-room-booking-system-nu.vercel.app)

## API Documentation

Explore the API with Postman: [Postman API Documentation](https://documenter.getpostman.com/view/28459031/2sAXjF8utX)
