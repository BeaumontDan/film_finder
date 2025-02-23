const tmdbKey = '60ae79f7ce4178548997e1d72c7d3612';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// Get Genres
const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

    try {
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const genre = jsonResponse.genres;
        return genre;
      }
    } catch(error) {
      console.log(error);
    }
  };

// Get Movies
const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
        return movies;
      }
    } catch(error) {
      console.log(error);
    }
  };


  // Get Movie Info
  const getMovieInfo = async(movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    
    try {
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const movieInfo = jsonResponse;
        return movieInfo;
      }
    } catch(error) {
      console.log(error);
    }
  };

  // Get Movie Cast
  const getCast = async (movie) => {
    const movieId = movie.id
    const movieEndpoint = `/movie/${movieId}/credits`
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams
  
    try {
      const response = await fetch(urlToFetch)
      if (response.ok) {
        const movieCast = await response.json()
        const actorsNames = movieCast.cast
          .map((actor) => actor.name.trim())
          .slice(0, 5)
          .join(', ')
        return actorsNames
      }
    } catch (error) {
      console.log(error)
    }
  }

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');

    if (movieInfo.childNodes.length > 0) {
      clearCurrentMovie();
    };
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    const cast = await getCast(randomMovie);
    displayMovie(info, cast);
  };

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;