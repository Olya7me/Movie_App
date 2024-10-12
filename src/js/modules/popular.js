import { showSkeleton } from './skeletons';
import { fetchFromApi } from './fetchApi';

export const apiPopularMoviesUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=2";
export const popularMoviesTitle = document.querySelector(".popular-movies__title");
export const popularMoviesItems = document.querySelector(".popular-movies__items");

export const apiSeasonUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=VAMPIRE_THEME&page=1";
export const seasonTitle = document.querySelector(".season-theme__title");
export const seasonItems = document.querySelector(".season-theme__items ");

export const apiComicsUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=COMICS_THEME&page=1";
export const comicsTitle = document.querySelector(".comics-movies__title");
export const comicsItems = document.querySelector(".comics-movies__items ");


const apiKey = "a72994a0-2897-409b-943f-b58b813ec6ce";
let allMovies = [];


export async function getMovies(url, title, container) {
    try {
        showSkeleton(container);
        const data = await fetchFromApi(url, apiKey, title);
        allMovies = data;
        renderMovies(allMovies, container);
    } catch (error) {
        title.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}
function renderMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = createUniversalMovieEl(movie);
        container.appendChild(movieElement);
    });
}
function createUniversalMovieEl(movie) {
    const movieElement = document.createElement("a");
    movieElement.classList.add("movies-item");

    const movieType = movie.type === 'FILM' ? 'Фильм' : (movie.type === 'TV_SERIES' ? 'Сериал' : 'Шоу');

    movieElement.innerHTML = `
        <img class="item-image" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        <h3 class="item-title">${movie.nameRu}</h3>
        <div class="item-info">
            <div class="item-description">
                <p class="item-year">${movie.year},</p>
                <p class="item-type">${movieType}</p>
            </div>
            <p class="item-genre">${movie.genres.map(genre => `${genre.genre}`).join(', ')}</p>
        </div>
    `;
    return movieElement;
}