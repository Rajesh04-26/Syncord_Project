# Syncord 💬

A simple chat application built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS templates**.
It supports creating, reading, updating, and deleting chats with proper error handling and middleware setup.

---

## 🚀 Features

* View all chats (`/chats`)
* Create a new chat
* View a single chat (`/chats/:id`)
* Edit and update chat messages
* Delete chats
* Custom error handling with `ExpressError`
* Middleware for async error wrapping (`asyncWrap`)
* Validation error handling for Mongoose

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Templating Engine:** EJS
* **Styling:** Public static files (CSS, JS, Images)
* **Other:** Method Override, Custom Error Handling

---

## ⚙️ Installation & Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start MongoDB (make sure it's running on `mongodb://127.0.0.1:27017/Syncord`):

   ```bash
   mongod
   ```

3. Run the app:

   ```bash
   node app.js
   ```

   App runs on **[http://localhost:8000](http://localhost:8000)**

---

## 📝 API & Routes

| Method | Route             | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/`               | Home page             |
| GET    | `/chats`          | View all chats        |
| GET    | `/chats/:id`      | View a specific chat  |
| POST   | `/chats`          | Create a new chat     |
| GET    | `/chats/:id/edit` | Edit chat form        |
| PUT    | `/chats/:id`      | Update a chat message |
| DELETE | `/chats/:id`      | Delete a chat         |

---

## 🔧 Error Handling

* **Custom `ExpressError` class** used for consistent error handling.
* **Async wrapper (`asyncWrap`)** ensures all async routes properly forward errors.
* **Mongoose validation error handling** for invalid data.
