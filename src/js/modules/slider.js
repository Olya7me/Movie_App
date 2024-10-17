const nextArrows = document.querySelectorAll(".next-arrow");
const prevArrows = document.querySelectorAll(".prev-arrow");
const moviesLists = document.querySelectorAll(".movies-items");

const getVisibleMoviesCount = () => {
    if (window.innerWidth < 490) {
        return 1;
    } else if (window.innerWidth < 940) {
        return 3;
    } else if (window.innerWidth < 1030) {
        return 4;
    }
    return 5;
};

//Ф-ия инициализации прокрутки
export function initMovieScrolling() {
    let visibleMoviesCount = getVisibleMoviesCount();

    window.addEventListener('resize', () => {
        visibleMoviesCount = getVisibleMoviesCount();
    });

    nextArrows.forEach((arrow, index) => {
        arrow.addEventListener("click", () => {
            const moviesList = moviesLists[index];
            const movie = moviesList.querySelector(".movies-item");
            const movieWidth = movie.offsetWidth;
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
            const movieWidth = movie.offsetWidth;

            const newScrollLeft = Math.max(moviesList.scrollLeft - movieWidth * visibleMoviesCount, 0);

            moviesList.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        });
    });

    moviesLists.forEach((moviesList) => {
        let startX;
        let scrollLeft;

        moviesList.addEventListener("touchstart", (e) => {
            startX = e.touches[0].pageX;
            scrollLeft = moviesList.scrollLeft;
        });

        moviesList.addEventListener("touchmove", (e) => {
            const x = e.touches[0].pageX;
            const walk = (x - startX) * 2;
            moviesList.scrollLeft = scrollLeft - walk;
        });
    });
}
