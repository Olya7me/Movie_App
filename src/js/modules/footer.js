export function loadFooter() {
  const footerHTML = `
  <nav class="footer__nav">
        <ul class="footer__nav-list">
          <li class="footer__nav-item">
            <a href="#" class="footer__nav-link">Главная</a>
          </li>
          <li class="footer__nav-item">
            <a href="#" class="footer__nav-link">Фильмы</a>
          </li>
          <li class="footer__nav-item">
            <a href="#" class="footer__nav-link">Сериалы</a>
          </li>
          <li class="footer__nav-item">
            <a href="#" class="footer__nav-link">Популярные</a>
          </li>
        </ul>
      </nav>
      <div class="footer__rights">
        Все права защищены © 2024
      </div>
      
    `;

  document.querySelector(".footer").innerHTML = footerHTML;
}
