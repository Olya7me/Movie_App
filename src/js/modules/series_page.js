import { fetchFromApi } from './fetchApi.js';
import { loadNavBar, toggleBtn } from "./nav_bar.js";
import { loadSidebar } from "./sidebar.js";
import { renderMovies } from "./search_page.js";
import { loadFooter } from "./footer.js";

const apiKey = "a72994a0-2897-409b-943f-b58b813ec6ce";

const seriesTitle = document.querySelector('.tv-series-page__series h2.tv-series-page__series-title');
const seriesItems = document.querySelector('.tv-series-page__series-items');
const seriesButton = document.querySelector(".tv-series-page__series-button");
const scrollToTopButton = document.querySelector(".tv-series-page__scroll-to-top");

let allSeries = [];
let currentIndex = 0;
let totalPagesLoaded = 0;

async function getAllSeries() {
    try {
        showSkeleton();

        let page = 1;
        const totalPages = 5;

        while (page <= totalPages) {
            const apiUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`;
            const data = await fetchFromApi(apiUrl, apiKey, seriesTitle);

            const series = data.filter(item => item.type === 'TV_SERIES');

            allSeries = allSeries.concat(series);
            page++;
            totalPagesLoaded = page - 1;
        }

        seriesItems.innerHTML = '';
        currentIndex = 0;

        renderMovies(allSeries, seriesItems, seriesButton, scrollToTopButton, createSeriesElement);
        seriesTitle.textContent = "Есть что посмотреть";

    } catch (error) {
        seriesTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}

// Функция для отображения скелетов загрузки
function showSkeleton() {
    seriesItems.innerHTML = `
    <div class="tv-series-page__series-skeleton-wrapper">
        <div class="tv-series-page__series-skeleton-container">
            ${[...Array(10)].map(() => `<div class="tv-series-page__series-skeleton-item"></div>`).join('')}
        </div>
    </div>
    `;
}

// Функция создания карточки сериала
function createSeriesElement(series) {
    const seriesElement = document.createElement("a");
    seriesElement.classList.add("tv-series-page__series-item");

    seriesElement.href = `/src/html/movie_card.html?movieId=${series.kinopoiskId}`;

    seriesElement.innerHTML = `
        <img src="${series.posterUrlPreview}" alt="${series.nameRu}">
        <h3 class="tv-series-page__series-item-title">${series.nameRu}</h3> 
        <div class="tv-series-page__series-item-info">
            <div class="tv-series-page__series-item-description">
                <p class="tv-series-page__series-item-year">${series.year},</p> 
                <p class="tv-series-page__series-item-type">Сериал</p>
            </div>
            <p class="tv-series-page__series-item-genre">${series.genres.map(genre => `${genre.genre}`).join(', ')}</p>
        </div>
    `;
    return seriesElement;
}

// Функция инициализации обработчиков событий
export function initEventListeners() {
    seriesButton.addEventListener("click", () => renderMovies(allSeries, seriesItems, seriesButton, scrollToTopButton, createSeriesElement));

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        const isVisible = window.scrollY > 600;
        scrollToTopButton.style.display = isVisible ? 'block' : 'none';
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    loadNavBar();
    toggleBtn();
    loadSidebar();
    initEventListeners();
    getAllSeries();
    loadFooter();
});
