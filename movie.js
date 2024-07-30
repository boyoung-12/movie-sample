const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2JiNGJhZDg4YmQ1NDNlNmRmZWU3OGI2MTI2ODM1ZSIsIm5iZiI6MTcyMjE3OTU1Mi41NzI2MTksInN1YiI6IjY2YTM3Y2U1M2RlMjEwMjExMjA4ZjJjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V6YPXswoWlGluDoxMvsRIuVBINEXtUzUDpEKfe8IQ1c'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const movieContainer = document.getElementById('movie-container');
    console.log(movieContainer);
    movies.forEach(movie => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
  })
  .catch(err => console.error(err));

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
        <img class="card-image"src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="container"> 
        <h3 class="theme">${movie.title}</h3>
        <div class="contents">
        <p>${movie.overview}</p>
        </div>
        <span class="rate">Rating: ${movie.vote_average}</span>
        </div>
      `;
  card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
  return card;
}


document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.toLowerCase();
  const movieCards = document.querySelectorAll('.card');
  movieCards.forEach(card => {
    const title = card.querySelector('h3').innerHTML.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });


});
