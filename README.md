# Travel Planner App
This is the capstone project of the Udacity Front End Developer Nanodegree.

## Project Ovierview
The goal of the project was to build a Travel App that allows users to get weather forecast or prediction for a location and date they have submitted via the app. 
The Geonames API is used to obtain the latitude and longitude of the location.
The Weatherbit API is used to obtain the weather forecast if the selected date is in the next 16 days. Historical data for the selected date is pulled in case it is more than 16 days away to give a prediction of the expected weather.
The Pixabay API is used to display an image of the city. 

The project is created using HTML, CSS and ES6 JavaScript.

### Extended options
An image for the country is pulled from the Pixabay API when the entered location brings up no results (i.e. in case of obscure localities).

#### Running the App

You need to have 'node.js' and 'npm' installed in order to run the project.
To build the project, open terminal and run the following commands:
 - Run 'npm install' to install all dependencies
 - Run 'npm run build-prod' to build production version
 - Run 'npm run build-dev' to start webpack dev server
 - Split the terminal and run 'npm start' to start express server

##### Development
The goal of this project was to apply knowledge of:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls. 
