import { loadNavBar, toggleBtn } from "./nav_bar.js";
import { loadSidebar } from "./sidebar.js";
import { loadFooter } from "./footer.js";
import { fetchFromApi } from "./fetchApi.js";
import { renderMovies } from "./search_page.js";

const apiPremieresUrl =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=DECEMBER";
const apiKey = "b6027775-465a-49ee-aecc-0731f7b27b31";
const premieresItems = document.querySelector(".premieres__items");
const premieresTitle = document.querySelector(".premieres h2.premieres__title");
const premieresButton = document.querySelector(".premieres__button");
const scrollToTopButton = document.querySelector(
  ".premieres-page__scroll-to-top"
);

let allMovies = [];

function showSkeleton() {
  premieresItems.innerHTML = `
    <div class="premieres__skeleton-wrapper">
      <div class="premieres__skeleton-container">
        ${'<div class="premieres__skeleton-item"></div>'.repeat(10)}
      </div>
    </div>
  `;
}

function createMovieElement(movie) {
  const movieElement = document.createElement("a");
  movieElement.classList.add("premieres__item");
  movieElement.href = `/src/html/movie_card.html?movieId=${movie.kinopoiskId}`;

  movieElement.innerHTML = `
    <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
    <h3 class="premieres__item-title">${movie.nameRu}</h3>
    <div class="premieres__item-info">
      <div class="premieres__item-description">
        <p class="premieres__item-year"></p>
        <p class="premieres__item-type">${movie.premiereRu}</p>
      </div>
      <p class="premieres__item-genre">${movie.genres
      .map((genre) => genre.genre)
      .join(", ")}</p>
    </div>
  `;
  return movieElement;
}

export async function getPremieresMovies() {
  try {
    showSkeleton();
    const data = await fetchFromApi(apiPremieresUrl, apiKey, premieresTitle);
    premieresItems.innerHTML = "";
    allMovies = data;
    console.log(allMovies);

    const movies = data.items || data;

    allMovies = movies.filter(
      (movie) => movie.year === 2024 || movie.year === 2025
    );

    renderMovies(
      allMovies,
      premieresItems,
      premieresButton,
      scrollToTopButton,
      createMovieElement
    );
    premieresTitle.textContent = "Премьеры";
  } catch (error) {
    premieresTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
  }
}

export function initialEventListeners() {
  premieresButton.addEventListener("click", () => {
    renderMovies(
      allMovies,
      premieresItems,
      premieresButton,
      scrollToTopButton,
      createMovieElement
    );
  });

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
  getPremieresMovies();
  initialEventListeners();
  loadFooter();
});
