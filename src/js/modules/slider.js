const nextArrows = document.querySelectorAll(".next-arrow");
const prevArrows = document.querySelectorAll(".prev-arrow");
const moviesLists = document.querySelectorAll(".movies-items");

const visibleMoviesCount = 5;

export function initMovieScrolling() {
    // Количество фильмов, видимых на экране одновременно
    nextArrows.forEach((arrow, index) => {
        arrow.addEventListener("click", () => {
            const moviesList = moviesLists[index];
            const movie = moviesList.querySelector(".movies-item");
            const movieWidth = movie.offsetWidth + parseInt(getComputedStyle(movie).marginRight);
            const maxScrollLeft = moviesList.scrollWidth - moviesList.clientWidth;

            const newScrollLeft = Math.min(moviesList.scrollLeft + movieWidth * visibleMoviesCount, maxScrollLeft);

            moviesList.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        });
    });

    prevArrows.forEach((arrow, index) => {
        arrow.addEventListener("click", () => {
            const moviesList = moviesLists[index];
            const movie = moviesList.querySelector(".movies-item");
            const movieWidth = movie.offsetWidth + parseInt(getComputedStyle(movie).marginRight);

            // Прокрутка на 5 фильмов назад
            const newScrollLeft = Math.max(moviesList.scrollLeft - movieWidth * visibleMoviesCount, 0);

            moviesList.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        });
    });
}
