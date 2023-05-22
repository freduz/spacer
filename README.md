# Newroom Media Coding Challenge

Your goal today is to complete our coding challenge. You will find all the information you need below. Good luck and have fun!

## Criteria

1. The coding challenge is designed to be solvable in a *maximum of 2 hours*.
2. Only solutions written with *Node.js*/*TypeScript* will be accepted.

## Prerequisites

* Node.js >= 16

## Introduction

You are part of the earth defense force and are responsible for monitoring the earth's atmosphere for unusual activities.
You take a deep sip out of your coffee cup. Suddenly you hear an alarm: a space invader ship appeared on your radar.

After a moment, you realize that the space invaders want to communicate with you; they are sending data to your systems. Unfortunately, you were not able to interpret the sent data immediately, but were at least able to fetch the data and export it into a file for further inspection.

Fortunately, you have an early version of a system for space invader communication. It was recovered from a previous space exploration mission where the team found a ship very similar to the one now showing up on your radar. Extend the unfinished system to fulfill the requirements and pay attention to any communication access controls already in place.\
You figured out that the system consists of two parts: A backend and a frontend.\
The backend is a **Node application** that uses the **Express** framework and communicates with a **local database** in the `backend` directory. The frontend is an **Angular application** located in the `frontend` directory.

Now it is your turn: Use the given application to decode, interpret and visualize the data in order to understand and communicate with the space invaders.

## Task Description

You will find the task description for each section of the two tasks below.

### Backend task (`backend/`):

1. Take a look at the file located at `data/gibberish.enc`. This is the data you fetched from the space invaders. Read in the given data, decode it **in code** and load it into a global variable `database` at the application start. This variable will be used as an "in-memory database". If you are unable to decode the file, you can use the file `data/gibberish-decoded.json` instead.
2. Extend the endpoint `GET /messages` where you return the messages from the "in-memory database".
3. Create an endpoint `POST /messages` where message objects are received and saved to the "in-memory database".

### Frontend task (`frontend/`):

4. In the frontend, there is a pre-existing service called `AlienService` located at `src/app/services/alien.service.ts`. This service has an empty method called `getData()`. Complete this method so that it makes an HTTP request to the `GET /messages` endpoint of your backend application and returns the fetched data.
5. In the `AppComponent`, consume the data from the `getData()` method introduced in *task 4*. Is there already an existing template that can be used to visualize the data? Re-use that template to visualize the data.
6. There is another empty method called `sendData()` in the `AlienService`. Complete this method so that it sends a `POST` request to the backend endpoint you created in *task 3*. Make sure that the message you send matches with the database schema. If the space invaders want a communication code from you, it would be better to add it as an `x-api-key` header to the `POST` requests to not make them angry.
7. It seems like there is no way to send messages via the user interface. We want to send messages by hitting the `Enter` key after entering the message we want to send. Implement this functionality.
8. **Optional**: For a better user experience, we want to display the datetime a message was sent inside the message. The format should be `dd.MM.yy hh:mm`, as shown in the image below.

![Frontend Task 5](assets/chat-date-time.png)

## Submission

To submit your solution, please create a repository on a Git hosting provider (e.g. GitHub, GitLab, Bitbucket) of your choice with an initial commit containing the initial coding challenge we sent to you.
Afterwards, push your solution in one or more commits to your repository. When you are done, please send us the link to your repository.
**Please make sure to set correct access permissions so that we can access your repository.**
If you don't use a Git hosting provider, you can also send us the solution as a ZIP file over e-mail. If you need any help or want to send us the solution over e-mail, feel free to contact us at [bewerbung@newroom-media.de](mailto:bewerbung@newroom-media.de).

## Suggestions

We are constantly trying to improve our coding challenge for our applicants. If you have any suggestions for how we can improve our coding challenge, feel free to send us an e-mail at [bewerbung@newroom-media.de](mailto:bewerbung@newroom-media.de).
