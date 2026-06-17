# Real-Time Chat Application

A real-time chat application built with Node.js, Express.js, MySQL, and JWT Authentication.

## Features

* User Registration
* User Login
* JWT Authentication
* Send Messages
* View Chat History
* Secure Password Hashing
* MySQL Database Integration
* RESTful API Architecture

## Tech Stack

* Node.js
* Express.js
* MySQL
* JWT (JSON Web Token)
* bcrypt.js
* dotenv


```

### Start Server

```bash
npm start
```

or

```bash
node server.js
```

Server will run on:

```text
http://localhost:4000
```

## API Endpoints

### Authentication

#### Register User

```http
(http://localhost:4000/user/signup)```

#### Login User

```http
http://localhost:4000/user/signup```

### Messages

#### Send Message

```http
http://localhost:4000/message/send```

#### Get Messages

```http
http://localhost:4000/message/conversations/all

```


