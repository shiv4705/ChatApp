# ChatApp

_COMPANY_: CODTECH IT SOLUTIONS

_NAME_: SHIV PATEL

_INTERN ID_: CT06DL588

_DOMAIN_: MERN STACK WEB DEVELOPMENT

_DURATION_: 6 WEEKS

_MENTOR_: NEELA SANTOSH

ChatApp is a real-time chat application featuring individual and group chats. Built with React, Chakra UI, Node.js, Express, MongoDB, and Socket.io, this project demonstrates real-time communication and group management with a beautiful and responsive interface.

## Features

- **Real-Time Messaging:**
  - Instant communication using Socket.io.
  - Join individual or group chat rooms.
- **User Authentication:**
  - Secure sign up and login.
  - Password encryption using bcrypt.
- **Group Chat Management:**
  - Create and update group chats.
  - Add or remove users from groups.
  - View group information via an interactive modal.
- **Responsive UI:**
  - User-friendly interface built with Chakra UI.
  - Responsive design for desktop and mobile devices.

## Technologies Used

- **Frontend:** React, Chakra UI, Axios, Socket.io-client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io
- **Authentication:** JSON Web Tokens (JWT), bcrypt

## Installation

### Prerequisites

- Node.js installed on your machine.
- MongoDB (either locally or via services like MongoDB Atlas).

### Backend Setup

1. Navigate to the backend folder:
   ```shell
   cd ChatApp/backend
   ```
2. Install backend dependencies:
   ```shell
   npm install
   ```
3. Create a `.env` file in the backend folder and add your environment variables:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```shell
   npm run dev
   ```
   or
   ```shell
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```shell
   cd ChatApp/frontend
   ```
2. Install frontend dependencies. If you encounter dependency conflicts (e.g., with `react-scrollable-feed`), use:
   ```shell
   npm install --legacy-peer-deps
   ```
3. Start the frontend development server:
   ```shell
   npm start
   ```

## Usage

1. Register for a new account or log in if you already have one.
2. Use the search functionality to find other users and start chatting.
3. Create group chats using the “New Group Chat” button.
4. In a group chat, click on the eye icon to view group info or the update button to edit group details.
5. Enjoy seamless, real-time messaging!

## API Endpoints Overview

- **User Routes:** `/api/user`
- **Chat Routes:** `/api/chat`
- **Message Routes:** `/api/message`

For more details on API endpoints, refer to the documentation in the backend routes folder.

## Screenshots

Below are some screenshots of the ChatApp in action:

![Login Screen](./screenshots/login-screen.png)
_The login screen where users can sign in or register._

![Chat Interface](./screenshots/chat-interface.png)
_The chat interface demonstrating individual and group chat functionalities._

![Group Info Modal](./screenshots/group-info-modal.png)
_The group info modal that displays group details and members._

## Troubleshooting

- If you see dependency conflicts during installation, try using:
  ```shell
  npm install --legacy-peer-deps
  ```
- Ensure your backend server (default port 5000) is running.
- Confirm your MongoDB connection string and JWT secret are correctly set in your `.env` file.

## Acknowledgements

- [Chakra UI](https://chakra-ui.com/)
- [Socket.io](https://socket.io/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
