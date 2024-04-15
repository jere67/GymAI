# Gym.ai
Developed as my submission for the 2024 Google x MHacks Hackathon.

## Getting Started
First, run the development environment:

    npm run dev
Run the flask backend:

    flask run

Open [http://localhost:5000](http://localhost:3000/) with your browser to see the result.

## Inspiration
Beginner lifters are often overwhelmed by the technical details of lifting. I was no stranger. When I first started going to the gym, there were so many elements I had to remember to perform single exercise correctly. Fortunately, I had the blessing of having a father with many years of lifting experience to train me, but many people do not have access to high-quality, affordable feedback. Gemini's 1 million token window and its ability to process videos gave me the idea to develop Gym.ai, a personalized fitness trainer where individuals no longer have to worry about hiring expensive personal trainers and quickly learn best practices in lifting form in numerous exercises.

## What it does
Using Google's novel Gemini 1.5 Pro technology, Gym.ai revolutionizes the way you train. With cutting-edge AI analysis, Gym.ai allows individuals to upload their own lifting videos and get personalized feedback on your exercise form. It can help you optimize your workouts, prevent injuries, and reach your fitness goals faster.

## How I built it
React for the frontend and Flask in the backend to handle all of the API requests made to the Gemini API.


## Challenges I ran into
* Connecting Flask in the backend to the React frontend. I especially had some formatting issues with the output. 
* Ran into some server-sided problems with Flask when interacting with the Gemini API. 
* The GET method kept making API requests indefinitely, causing constant rate limits.
* Persistent white screen after making some changes.

## Accomplishments that I am proud of
* I can go from 0 knowledge of full-stack development to having a fully fleshed out application with real implications for the fitness community.
* Aesthetic looking webpage
* Figuring out how to connect Gemini API to Flask, then Flask to React

## What I learned
* I'm not a quitter.
* Fullstack development
* React
* Tailwind
* Flask
* GET/POST
* JSON
* API Requests
* Gemini API

## What's next for Gym.ai
* Mobile App Development (iOS, Android)
* Better UX when uploading video
* Enabling user prompt engineering
* Additional features, such as short-term plan, long-term plan, nutrition guide, etc.
* External page linking
* Adding chat history to track improvement overtime
