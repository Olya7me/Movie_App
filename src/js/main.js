import { loadNavBar, toggleBtn } from "./modules/nav_bar";
import { loadSidebar } from "./modules/sidebar";
import { getRotateMovies } from "./modules/rotate_main_movie";
import {
  getMovies,
  popularMoviesTitle,
  popularMoviesItems,
  apiPopularMoviesUrl,
  apiSeasonUrl,
  seasonTitle,
  seasonItems,
  apiComicsUrl,
  comicsTitle,
  comicsItems,
} from "./modules/main_movies";
import { initMovieScrolling } from "./modules/slider";
import { loadFooter } from "./modules/footer";

document.addEventListener("DOMContentLoaded", async () => {
  loadNavBar();
  loadSidebar();
  getRotateMovies();
  getMovies(apiPopularMoviesUrl, popularMoviesTitle, popularMoviesItems);
  getMovies(apiSeasonUrl, seasonTitle, seasonItems);
  getMovies(apiComicsUrl, comicsTitle, comicsItems);
  toggleBtn();
  initMovieScrolling();
  loadFooter();
});
