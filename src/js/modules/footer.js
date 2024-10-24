export function loadFooter() {
  const footerHTML = `
      <div class="footer__rights">
        Все права защищены Милой и Олей © 2024
      </div>
    `;

  document.querySelector(".footer").innerHTML = footerHTML;
}
