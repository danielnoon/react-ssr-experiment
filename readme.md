# React SSR Experiment

As an exercise to better understand React rendering and hydration, I've created a very simple implementation of a React app that renders in a web server and hydrates on the client.

I have used minimal dependencies to build it as close to bare metal as possible. The only dependencies are React, ReactDOM, Fastify, and TypeScript.

This app is NOT intended to be used in production. It is a proof of concept and a learning exercise.

In the future, I may add on-demand TypeScript compilation for each request (with caching), but for now, it works and illustrates the concept.

## Running the app

- Ensure node.js is installed
- Install dependencies with `npm install`
- Build the app with `npm run build`
- Run the app with `npm start`
- Open the app in your browser at `http://localhost:3000`
