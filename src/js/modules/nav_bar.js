export function loadNavBar() {
  const headerHTML = `
      <div class="header__logo">MovieSearch
    </div>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item">
          <a href="../../../index.html" class="header__nav-link">Главная</a>
        </li>
        <li class="header__nav-item">
          <a href="../../src/html/movies_page.html" class="header__nav-link">Фильмы</a>
        </li>
        <li class="header__nav-item">
          <a href="../../src/html/series_page.html" class="header__nav-link">Сериалы</a>
        </li>
        <li class="header__nav-item">
          <a href="#popular-movies" class="header__nav-link">Популярные</a>
        </li>
        <li class="header__nav-item item">
          <a href="/src/html/search.html" class="header__nav-link header__search" id="search">
            <svg class="header__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </a>
      </ul>
    </nav>
    <div class="header__burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="header__toggle">
      <input type="checkbox" id="theme-toggle" class="header__toggle-checkbox" />
      <label for="theme-toggle" class="header__toggle-label">День</label>
    </div>
`;

  document.querySelector(".header").innerHTML = headerHTML;

  //Переключение на бургер

  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav-list");
  /*const navLinks = document.querySelectorAll(".header__nav-link");*/

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (
      !burger.contains(e.target) &&
      !nav.contains(e.target) &&
      nav.classList.contains("open")
    ) {
      burger.classList.remove("active");
      nav.classList.remove("open");
    }
  });
  //для бургер меню
  /*const navLinks = document.querySelectorAll(".header__nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((link) => {
        if (link.classList.contains("active")) {
          link.classList.remove("active");
        }
      });
      this.classList.add("active");

      burger.classList.remove("active");
      nav.classList.remove("open");
    });
  });*/
}
//Кнопка ч/б темы
export function toggleBtn() {
  const toggleBtn = document.querySelector("#theme-toggle");
  const body = document.body;

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") {
    body.classList.add("toggle");
    toggleBtn.checked = true;
  } else {
    body.classList.remove("toggle");
    toggleBtn.checked = false;
  }

  toggleBtn.addEventListener("change", () => {
    body.classList.toggle("toggle");

    if (toggleBtn.checked) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });
}
