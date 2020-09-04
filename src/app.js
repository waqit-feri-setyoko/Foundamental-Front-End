import "regenerator-runtime";
import "./style/style.css";

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){
    const masukanKataKunci = document.querySelector('.input-keyword');
    const movies = await getMovie(masukanKataKunci.value);
    updateUI(movies)
});
     
function getMovieDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=2e7d5b39&i=' + imdbid)
    .then(response => response.json())
    .then(movies => movies);
}

function updateUIDetail (movies) {
    const movieDetail = showDetails(movies);
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetail;
}

function getMovie (keyword) {
    return fetch('http://www.omdbapi.com/?apikey=2e7d5b39&s=' + keyword)
    .then(response => response.json())
    .then(response => response.Search);
};   

function updateUI (movies){
    let cards = '';
        movies.forEach(movies => cards += appMovie(movies));
        const movieContainer = document.querySelector('#movie-container');
        movieContainer.innerHTML = cards;
}

function appMovie(movie){
   return `<div class="col-md-3 my-5">
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetails" data-imdbid="${movie.imdbID}" >Show Details</a>
                </div>
        </div>
    </div> `
};

function showDetails(movies){
    return `
        <div class="container-flid">
            <div class="row">
                <div class="col-md-5">
                    <img src="${movies.Poster}" alt="${movies.Title}">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h4>${movies.Title}(${movies.Released})</h4></li>
                    <li class="list-group-item"><strong>Genre : </strong>${movies.Genre}</li>
                    <li class="list-group-item"><strong>Director : </strong>${movies.Director}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${movies.Writer}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${movies.Actors}</li>
                    <li class="list-group-item"><strong>Production : </strong>${movies.Production}</li>
                    <li class="list-group-item"><strong>Plot : </strong>${movies.Plot}</li>
                    </ul>
                </div>
            </div>
        </div>`
};
