const apiPremieresUrl =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=DECEMBER";
const apiKey = "b6027775-465a-49ee-aecc-0731f7b27b31";
const premieresItems = document.querySelector(".premieres__items");
const premieresTitle = document.querySelector(".premieres h2.premieres__title");
const premieresButton = document.querySelector(".premieres__button");
const scrollToTopButton = document.querySelector(
  ".premieres-page__scroll-to-top"
);
let currentIndex = 0;
const moviesPerPage = 10;

async function fetchFromApi(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    const data = responseData.films || responseData.items;

    if (!data || data.length === 0) {
      throw new Error("Ничего не найдено");
    }

    return data;
  } catch (error) {
    premieresTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    return [];
  }
}
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

  const movieType =
    movie.type === "FILM"
      ? "Фильм"
      : movie.type === "TV_SERIES"
      ? "Сериал"
      : "Шоу";

  movieElement.innerHTML = `
    <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
    <h3 class="premieres__item-title">${movie.nameRu}</h3>
    <div class="premieres__item-info">
        <div class="premieres__item-description">
            <p class="premieres__item-year">${movie.year},</p>
            <p class="premieres__item-type">${movieType}</p>
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
    const data = await fetchFromApi(apiPremieresUrl);
    premieresItems.innerHTML = "";
    rendMovies(data);
    premieresTitle.textContent = "Премьеры";
  } catch (error) {
    premieresTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
  }
}
function rendMovies(movies) {
  const moviesToShow = movies.slice(currentIndex, currentIndex + moviesPerPage);

  moviesToShow.forEach((movie) => {
    const movieElement = createMovieElement(movie);
    premieresItems.appendChild(movieElement);
  });

  currentIndex += moviesPerPage;
}

function toggleButtonVisibility(isVisible) {
  premieresButton.style.display = isVisible ? "block" : "none";
  scrollToTopButton.style.display = isVisible ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
  getPremieresMovies();
});

export function initialEventListeners() {
  premieresButton.addEventListener("click", () => rendMovies(allMovies));

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    const isVisible = window.scrollY > 600;
    scrollToTopButton.style.display = isVisible ? "block" : "none";
  });
}
