# Getting Started with movie-fix App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to setup in Local

In the project directory, you can run:

### `npm i`
to install all necessary packages

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Technology Used
* `React Js` `CSS` for UI development
* `Redux` for state management and caching the data to reduce repetative api calls
* `axios` for api integration
* used some optimisation technique called `Debouncing` while searching, `Throttling` while scrolling and `caching data` using redux to reduce repetative api calls and 
  removing old movie list from DOM to avoid jitters while scrolling

## features covered
### Layout and UI
 * Create custom UI components for the app, using React.
 * Display a list of movies sorted in descending order of popularity.
 * Show the movie title, image, genre, rating and a short description related
   to the movie in each information card.

 ### Default page load state
  * Load a total of only 20 movies for each year 
  * By default, when a user lands on the page, display a list of movies of the year 2012
  * Implement smooth scrolling behavior to load more movies as the user scrolls in any direction 
  * As and when the user scrolls and movies are added to the list, make sure that
   this interaction is smooth and doesn’t cause any jitters.  

### Genre Filter
 * Provide a filter UI that allows users to filter movies by genre.
 * When a user selects one or more genres, the list should only display movies of the selected genres.
### Bonus (Optional)
* Ensuring smooth scrolling even when more and more movies are loaded in the DOM.
  **(achived by removing the list of movies which are not in viewPort from DOM)**.
* Implement a search bar which searches for the movie based on the search string
  and displays an infinite loading list of movies which matches the search.

## Screen shots from local 
   ![image](https://github.com/Akshaykumar4524/movie-fix/assets/102145959/5842541c-4680-4ea2-9a75-9e64e3b4312c)
   ![image](https://github.com/Akshaykumar4524/movie-fix/assets/102145959/dc6279a9-640b-436d-93e6-94aaec71dd27)





