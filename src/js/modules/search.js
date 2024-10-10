const apiSearchUrl = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const apiRecommendedUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const apiGenresUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=";
const apiKey = "a72994a0-2897-409b-943f-b58b813ec6ce";
const keywordPattern = /^[а-яА-ЯёЁ0-9\s]+$/gi;

const searchForm = document.querySelector(".search-page__form");
const searchInput = document.querySelector(".search-page__input");
const clearInput = document.getElementById('clearInput');
const recommendTitle = document.querySelector('.recommend h2.recommend__title');
const recommendItems = document.querySelector('.recommend__items');
const recommendButton = document.querySelector(".recommend__button");
const scrollToTopButton = document.querySelector(".search-page__scroll-to-top");
const searchHistoryContainer = document.getElementById('searchHistory');
const genreItems = document.querySelectorAll('.genres__item');

let allMovies = [];
let currentIndex = 0;
const moviesPerPage = 10;

const MAX_HISTORY = 10;
let searchHistory = [];

let allGenreMovies = [];


//Ф-ия обновления истории запроса
function updateHistoryDisplay() {
    searchHistoryContainer.innerHTML = '';

    if (searchHistory.length > 0) {
        const title = document.createElement('p');
        title.textContent = 'Недавно искали :';
        searchHistoryContainer.appendChild(title);
    }

    searchHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
            searchInput.value = item;
            searchMovies(item);
            searchHistoryContainer.classList.remove('visible');
        });
        searchHistoryContainer.appendChild(li);
    });

    const icon = document.createElement('li');
    icon.id = 'clear-search-query';
    icon.innerHTML = `
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    searchHistoryContainer.appendChild(icon);

    if (searchHistory.length === 0) {
        icon.style.visibility = 'hidden';
    } else {
        icon.style.visibility = 'visible';
    }

    icon.addEventListener('click', () => {
        searchHistory = [];
        updateHistoryDisplay();
    });

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

//Ф-ия сохранения истории запроса
export function loadHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
        updateHistoryDisplay();
    }
}


//Универсальная ф-я запроса АПИ
async function fetchFromApi(url) {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        const dataKeys = ['items', 'films', 'genres'];
        const data = dataKeys.find(key => Array.isArray(responseData[key]) && responseData[key].length > 0);

        if (!data) {
            throw new Error("Ничего не найдено");
        }

        return responseData[data];

    } catch (error) {
        if (error.message.includes("Ошибка HTTP")) {
            recommendTitle.innerHTML = `Ошибка при запросе к API: ${error.message}`;
        } else {
            recommendTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
        }
        return [];
    }
}
//Функция поиска фильмов
export async function searchMovies(keyword) {
    try {
        recommendTitle.innerHTML = "Поиск по совпадениям";
        const data = await fetchFromApi(apiSearchUrl + keyword);
        allMovies = data;

        recommendItems.innerHTML = '';
        renderMovies(allMovies);
        recommendTitle.textContent = allMovies.length > 0 || undefined ? "Результаты поиска" : "По запросу ничего не найдено";

    } catch (error) {
        recommendTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}
//Ф-ия получения рекомендаций
export async function getRecommendMovies() {
    try {
        showSkeleton();
        const data = await fetchFromApi(apiRecommendedUrl);
        allMovies = data;
        recommendItems.innerHTML = '';
        renderMovies(allMovies);
        recommendTitle.textContent = "Рекомендуем";
    } catch (error) {
        recommendTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}

//Ф-ия отображения склетов фильмов при загрузке
function showSkeleton() {
    recommendItems.innerHTML = `
    <div class="recommend__skeleton-wrapper">
        <div class="recommend__skeleton-container">
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
            <div class="recommend__skeleton-item"></div>
        </div>
    </div>
    `;
}
//Ф-ия поиска по жанру
async function searchByGenre(genre, genreText) {
    try {
        allMovies = [];
        currentIndex = 0;
        recommendItems.innerHTML = '';
        recommendTitle.innerHTML = `${genreText}`;
        showSkeleton();

        let filteredMovies = [];

        for (let page = 1; page <= 5; page++) {
            const data = await fetchFromApi(apiGenresUrl + page);
            filteredMovies = filteredMovies.concat(data);
        }

        allMovies = filteredMovies.filter(movie =>
            movie.genres.some(movieGenre => movieGenre.genre === genre)
        );

        recommendItems.innerHTML = '';

        if (allMovies.length > 0) {
            recommendTitle.textContent = `${genreText}`;
        }

        renderMovies(allMovies);

    } catch (error) {
        recommendTitle.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}

//ф-ия рендера карточек
export function renderMovies(movies) {
    const moviesToShow = movies.slice(currentIndex, currentIndex + moviesPerPage);

    moviesToShow.forEach(movie => {
        const movieElement = createMovieElement(movie);
        recommendItems.appendChild(movieElement);
    });

    currentIndex += moviesPerPage;

    toggleButtonVisibility(currentIndex < movies.length);
}

//Ф-ия создания карточки фильма
function createMovieElement(movie) {
    const movieElement = document.createElement("a");
    movieElement.classList.add("recommend__item");

    const movieType = movie.type === 'FILM' ? 'Фильм' : (movie.type === 'TV_SERIES' ? 'Сериал' : 'Шоу');

    movieElement.innerHTML = `
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        <h3 class="recommend__item-title">${movie.nameRu}</h3>
        <div class="recommend__item-info">
            <div class="recommend__item-description">
                <p class="recommend__item-year">${movie.year},</p>
                <p class="recommend__item-type">${movieType}</p>
            </div>
            <p class="recommend__item-genre">${movie.genres.map(genre => `${genre.genre}`).join(', ')}</p>
        </div>
    `;
    return movieElement;
}

//Ф-ия показа кнопок
function toggleButtonVisibility(isVisible) {
    recommendButton.style.display = isVisible ? 'block' : 'none';
    scrollToTopButton.style.display = isVisible ? 'none' : 'block';
}

//Ф-ия  инициализации обработчиков
export function initEventListeners() {
    recommendButton.addEventListener("click", () => renderMovies(allMovies));

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        const isVisible = window.scrollY > 600;
        scrollToTopButton.style.display = isVisible ? 'block' : 'none';
    });

    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.trim();

        if (!keyword) {
            currentIndex = 0;
            recommendItems.innerHTML = '';
            getRecommendMovies();
            return;
        }

        if (!keywordPattern.test(keyword)) {
            recommendItems.innerHTML = "";
            recommendTitle.textContent = "Поиск по запросу не дал результатов";
            return;
        }


        searchMovies(keyword);
        currentIndex = 0;
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const keyword = searchInput.value.trim();

            if (keyword) {
                if (!searchHistory.includes(keyword)) {
                    if (searchHistory.length >= MAX_HISTORY) {
                        searchHistory.pop();
                    }
                    searchHistory.unshift(keyword);
                    updateHistoryDisplay();
                }
                searchMovies(keyword);
                searchHistoryContainer.classList.remove('visible');
            }
        }
    });

    clearInput.addEventListener('click', () => {
        searchInput.value = '';
        recommendItems.innerHTML = '';
        currentIndex = 0;
        getRecommendMovies();
    });

    searchInput.addEventListener('focus', () => {
        if (searchHistory.length > 0) {
            searchHistoryContainer.classList.add('visible');
        }
        searchInput.classList.add('search-page__input--modified');

        genreItems.forEach(item => item.classList.remove('genres__item--selected'));
    });

    document.addEventListener('click', (event) => {
        const isClickInside = searchInput.contains(event.target) || searchHistoryContainer.contains(event.target);
        if (!isClickInside) {
            searchHistoryContainer.classList.remove('visible');
            searchInput.classList.remove('search-page__input--modified');
        }
    });

    genreItems.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            genreItems.forEach(item => item.classList.remove('genres__item--selected'));

            link.classList.add('genres__item--selected');

            const genreText = link.querySelector('.genres__text').textContent;

            const genreMapping = {
                "комедии": "комедия",
                "мелодрамы": "мелодрама",
                "боевики": "боевик",
                "семейные": "семейный",
                "ужасы": "ужасы",
                "криминальные": "криминал",
                "драмы": "драма",
                "фэнтези": "фэнтези",
                "триллеры": "триллер",
                "приключения": "приключения"
            };

            const genreForSearch = genreMapping[genreText.toLowerCase()];

            if (genreForSearch) {
                searchByGenre(genreForSearch, genreText);
            }
        });
    });

}