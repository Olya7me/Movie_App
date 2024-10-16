import { fetchFromApi } from './fetchApi'

const movieContainer = document.querySelector(".movie__content");
const movieContent = document.querySelector(".movie");

const apiMoviesUrl =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const apiKey = "b6027775-465a-49ee-aecc-0731f7b27b31";

let movies = [];
let currentMovieIndex = 0;

//Функция получения фильмов
export async function getRotateMovies() {
  try {
    movies = await fetchFromApi(apiMoviesUrl, apiKey, movieContent);
    renderMovie(movies[currentMovieIndex]);
    startMovieRotation();
  } catch (error) {
    movieContent.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
  }
}

//Ф-ия создания разметки под фильм
function createMovieElement(movie) {
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie__content");

  const bgImage = document.createElement("div");
  bgImage.classList.add("movie__bg-image");
  bgImage.style.backgroundImage = `url(${movie.posterUrl})`;

  movieElement.innerHTML = `
      <h1 class="movie__title">${movie.nameRu}</h1>
      <p class="movie__description">${movie.description || "Описание отсутствует."}</p>
      <a href="#" class="movie__watch-btn">Смотреть</a>
  `;
  const watchBtn = movieElement.querySelector(".movie__watch-btn");
  watchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = `/src/html/movie_card.html?movieId=${movie.kinopoiskId}`;
  });

  movieContent.appendChild(bgImage);
  return movieElement;
}

//Ф-ия рендера фильмов
function renderMovie(movie) {
  movieContainer.innerHTML = "";
  const movieElement = createMovieElement(movie);
  movieContainer.appendChild(movieElement);
}
//Ф-ия запуска показов фильмов через интревал
function startMovieRotation() {
  setInterval(() => {
    currentMovieIndex = (currentMovieIndex + 1) % movies.length;
    renderMovie(movies[currentMovieIndex]);
  }, 100000);
}

