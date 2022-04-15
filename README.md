# Chirp

[Chirp](https://dylank09.github.io/chirp/)

_(if you wish to see what the app is like in phone format on your browser, right click on the page and go to inspect, from there click on the phone icon to the top left of the inspector)_

## Description:

This is my Final Year Project to obtain a BSc. Computer Systems at the University of Limerick.

Deadline management application where students can track, manage and communicate with group members about projects in college.
Users can also track their own personal projects by not adding any members to the project.

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

1. Install dependencies with npm
   `npm install`

2. Start server with npm
   `npm start`

3. This should open a tab on your browser. On the left side of this page, observe the options available to you. If you wish to open the app in the browser, click web. Otherwise if you have an android emulator open, you can click on the android option.
