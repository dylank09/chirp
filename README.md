# Chirp

[Chirp (web)](https://dylank09.github.io/chirp/)
[Demo Video](https://vimeo.com/showcase/9399953/video/693470978)
[User Testing Google Form](https://forms.gle/yY5wgByFyWvAT4mH6)

_(if you wish to see what the app is like in phone format on your browser, right click on the page and go to inspect, from there click on the phone icon to the top left of the inspector)_

## Description:

This is my Final Year Project to obtain a BSc. Computer Systems at the University of Limerick.

This is a simplistic flexible project management tool with a flexible chat feature. Users can collaborate on projects with other members or have their own independent projects. Users can create chats to communicate with one or more members for any purpose such as projects, modules, social, etc.

#### Project Management Feature Notes

Each project shows how much time is left until the deadline.
When finished the project, mark it done by clicking the done (x) icon on the top right
Create To-Dos and assign them to other members of the project. When the To-Do is done, mark it as done or delete it.

## Comments

For comments to help understand the code, please see the following files:

Authentication: `AuthContainer.js`, `Login.js`, `Register.js`

Firestore collection reference and query: `ChirpGroups.js`

Firestore document reference: `ChirpChat.js`

How Firestore is used throughout the app: `ChirpGroups.js`

How the Real-Time database effect is achieved: `ChirpGroups.js`

How the Real-Time database effect is achieved (document): `ChirpChat.js`

Updating firestore document: `ChirpGroups.js`

How a "back" event is handled: `ChirpChat.js`

Alert example: `ChirpProject.js`

Profile image: `ChirpProfile.js`

## How to launch

0. Navigate to this directory

1. Install dependencies with npm
   `npm install`

2. Start server with npm
   `npm start`

3. This should open a tab on your browser. On the left side of this page, observe the options available to you. If you wish to open the app in the browser, click web. Otherwise if you have an android emulator open, you can click on the android option.

## How to test

0. Navigate to this directory

1. Run jest test script with
   `npm test`
