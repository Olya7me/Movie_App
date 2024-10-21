import { fetchFromApi } from "./fetchApi.js";
import { loadNavBar, toggleBtn } from "./nav_bar.js";
import { loadSidebar } from "./sidebar.js";
import { renderMovies } from "./search_page.js";
import { loadFooter } from "./footer.js";

const apiKey = "a72994a0-2897-409b-943f-b58b813ec6ce";

const filmsTitle = document.querySelector(
  ".movies-page__films h2.movies-page__films-title"
);
const filmsItems = document.querySelector(".movies-page__films-items");
const filmsButton = document.querySelector(".movies-page__films-button");
const scrollToTopButton = document.querySelector(".movies-page__scroll-to-top");

let allMovies = [];
let currentIndex = 0;
const moviesPerPage = 10;
let totalPagesLoaded = 0;

async function getAllMovies() {
  try {
    showSkeleton();

    let page = 1;
    const totalPages = 5;

    while (page <= totalPages) {
      const apiUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`;
      const data = await fetchFromApi(apiUrl, apiKey, filmsTitle);

      const movies = data.filter((movie) => movie.type === "FILM");

      allMovies = allMovies.concat(movies);
      page++;
      totalPagesLoaded = page - 1;
    }

    filmsItems.innerHTML = "";
    currentIndex = 0;
    renderMovies(
      allMovies,
      filmsItems,
      filmsButton,
      scrollToTopButton,
      createMovieElement
    );
    filmsTitle.textContent = "Есть что посмотреть";
  } catch (error) {
    filmsTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
  }
}

//Ф-ия отображения склетов фильмов при загрузке
function showSkeleton() {
  filmsItems.innerHTML = `
    <div class="movies-page__films-skeleton-wrapper">
        <div class="movies-page__films-skeleton-container">
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
            <div class="movies-page__films-skeleton-item"></div>
        </div>
    </div>
    `;
}

function createMovieElement(movie) {
  const movieElement = document.createElement("a");
  movieElement.classList.add("movies-page__films-item");

  movieElement.href = `/src/html/movie_card.html?movieId=${movie.kinopoiskId}`;

  movieElement.innerHTML = `
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        <h3 class="movies-page__films-item-title">${movie.nameRu}</h3>
        <div class="movies-page__films-item-info">
            <div class="movies-page__films-item-description">
                <p class="movies-page__films-item-year">${movie.year},</p>
                <p class="movies-page__films-item-type">Фильм</p>
            </div>
            <p class="movies-page__films-item-genre">${movie.genres
              .map((genre) => `${genre.genre}`)
              .join(", ")}</p>
        </div>
    `;
  return movieElement;
}

export function initEventListeners() {
  filmsButton.addEventListener("click", () =>
    renderMovies(
      allMovies,
      filmsItems,
      filmsButton,
      scrollToTopButton,
      createMovieElement
    )
  );

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    const isVisible = window.scrollY > 600;
    scrollToTopButton.style.display = isVisible ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  loadNavBar();
  toggleBtn();
  loadSidebar();
  initEventListeners();
  getAllMovies();
  loadFooter();
});
