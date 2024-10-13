import { loadHeader } from "./header.js";
import { toggleBtn } from "./home.js";
import { loadSidebar } from "./sidebar.js";
import { loadFooter } from "./footer.js";


// Константы и переменные
const apiKey = "a72994a0-2897-409b-943f-b58b813ec6ce";
const apiUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films/`;
const movieId = new URLSearchParams(window.location.search).get('movieId');
const movieContent = document.querySelector(".movie-card__content-container");
const trailerContainer = document.querySelector(".movie-card__container-for-trailer");
const movieTitle = document.querySelector(".movie-card__title");
const loadingIndicator = createLoadingIndicator();

// Вспомогательные функции
function createLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('loading-indicator');
    indicator.textContent = 'Загрузка...';
    return indicator;
}

function setInnerHTML(selector, html) {
    document.querySelector(selector).innerHTML = html;
}

async function fetchFromApi(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        movieTitle.textContent = error.message;  // Выводим ошибку в заголовок
        throw error;  // Пробрасываем ошибку дальше
    }
}

// Функция для рендеринга деталей фильма
async function renderMovieDetails(movieId) {
    const movie = await fetchFromApi(`${apiUrl}${movieId}`);
    const countries = movie.countries?.map(c => c.country).join(', ') || 'Страна не указана';
    const genres = movie.genres?.map(g => g.genre).join(', ') || 'Жанры не указаны';

    movieContent.innerHTML = `
            <div class="movie-card__image"></div>
            <h1 class="movie-card__title">${movie.nameRu} (${movie.year})</h1>
            <div class="movie-card__wrapper">
                <div class="movie-card__context">
                    <h2 class="movie-card__context-title">Сюжет</h2>
                    <p class="movie-card__context-description">${movie.description || 'Описание отсутствует'}</p>
                </div>
                <div class="movie-card__info">
                    <h2 class="movie-card__info-title">Информация</h2>
                    <div class="movie-card__info-wrapper">
                        <div class="movie-card__info-country"><p class="gray">Страна</p><p>${countries}</p></div>
                        <div class="movie-card__info-rating"><p class="gray">Рейтинг</p><p>${movie.ratingKinopoisk || 'Рейтинг отсутствует'}</p></div>
                        <div class="movie-card__info-genre"><p class="gray">Жанр</p><p>${genres}</p></div>
                    </div>
                </div>
            </div>
            <div class="movie-card__container-for-trailer"></div>
        `;
    const bgImage = document.querySelector('.movie-card__image');
    bgImage.style.setProperty('--poster-url', `url(${movie.posterUrl})`);
}

// Функция для получения трейлеров
async function fetchMovieVideos(movieId) {
    try {
        const videos = await fetchFromApi(`${apiUrl}${movieId}/videos`);
        return videos.items.find(v => v.site === 'YOUTUBE');
    } catch (error) {
        movieTitle.textContent = error.message;  // Выводим ошибку в заголовок
        throw error;  // Пробрасываем ошибку дальше
    }
}

// Функция для извлечения ID видео из URL
function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

// Функция для загрузки данных о фильме и трейлере
async function loadMovieData(movieId) {
    movieContent.appendChild(loadingIndicator);
    try {
        const trailer = await fetchMovieVideos(movieId);
        const videoId = getYouTubeVideoId(trailer.url);

        if (videoId) {
            const trailerHtml = `
                <iframe class="movie-card__trailer" src="https://www.youtube.com/embed/${videoId}" width="500" height="500" frameborder="0" allowfullscreen></iframe>
            `;
            setInnerHTML('.movie-card__container-for-trailer', trailerHtml);
        } else {
            setInnerHTML('.movie-card__container-for-trailer', '<p>Не удалось получить ID видео из ссылки.</p>');
        }
    } catch (error) {
        movieTitle.textContent = error.message;
    } finally {
        loadingIndicator.remove();
    }
}

// Вызов функций
document.addEventListener("DOMContentLoaded", async () => {
    loadHeader();
    toggleBtn();
    loadSidebar();

    if (movieId) {
        await renderMovieDetails(movieId);
        await loadMovieData(movieId);
    }

    loadFooter();
});
