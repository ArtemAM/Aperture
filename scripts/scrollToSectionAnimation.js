import closeMenu from "./utils/closeMenu.js"

// Регистрируем GSAP ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin)

function animateScrollToSection() {
  // Получаем ссылки из header и footer
  const headerLinks = gsap.utils.toArray('.header__link')
  const footerLinks = document.querySelectorAll('.footer__nav')[1].querySelectorAll('.footer__link')

  // Объединяем ссылки в один массив
  const allLinks = [...headerLinks, ...footerLinks]

  // Навешиваем обработчик клика на каждую ссылку
  allLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      closeMenu() // Закрываем мобильное меню (если открыто)
      event.preventDefault() // Предотвращаем стандартный переход по ссылке

      const targetId = link.getAttribute('href') // Получаем ID целевой секции
      const targetElem = document.querySelector(targetId) // Находим соответствующий элемент

      // Анимируем прокрутку к нужному элементу
      gsap.to(window, {
        duration: 0,
        scrollTo: { y: targetElem },
        immediateRender: false
      })
    })
  })
}

export default animateScrollToSection