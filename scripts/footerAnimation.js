// Анимирует элементы footer при его появлении в области видимости.

function animateFooter() {
  const footerElement = document.querySelector('.footer')

  // Получаем ссылки на элементы подвала
  const elements = {
    logo: footerElement.querySelector('.footer__logo'),
    desctiption: footerElement.querySelector('.footer__description'),
    menu: footerElement.querySelector('.footer__menu'),
    footerItems: gsap.utils.toArray('.footer__item'),
    subscribe: footerElement.querySelector('.subscribe'),
    subscribeTitle: footerElement.querySelector('.subscribe__title'),
    subscribeText: footerElement.querySelector('.subscribe__text'),
    copyright: footerElement.querySelector('.footer__copyright'),
    socialItems: gsap.utils.toArray('.social__item')
  }

  // Начальное скрытие и смещение элементов
  gsap.set(elements.logo, { autoAlpha: 0, x: -120 })
  gsap.set(elements.desctiption, { autoAlpha: 0, x: -120 })
  gsap.set(elements.menu, { autoAlpha: 0, x: 120 })
  gsap.set(elements.footerItems, { autoAlpha: 0, y: -60 })
  gsap.set(elements.subscribe, { autoAlpha: 0, y: -60 })
  gsap.set(elements.subscribeTitle, { autoAlpha: 0, x: 120 })
  gsap.set(elements.subscribeText, { autoAlpha: 0, x: 120 })
  gsap.set(elements.copyright, { autoAlpha: 0, y: 120 })
  gsap.set(elements.socialItems, { autoAlpha: 0, x: 120 })

  // Создание анимации с триггером на скролл
  const reveal = gsap.timeline({
    scrollTrigger: {
      trigger: footerElement,
      start: 'top 70%',
      end: 'bottom'
    },
    defaults: { duration: 1.2, ease: 'power3.inOut' }
  })

  // Последовательная анимация элементов
  reveal
    .to(elements.logo, { autoAlpha: 1, x: 0 })
    .to(elements.desctiption, { autoAlpha: 1, x: 0 }, '<0.08')
    .to(elements.menu, { autoAlpha: 1, x: 0 }, '<')
    .to(elements.footerItems, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8 }, '<0.5')
    .to(elements.subscribe, { autoAlpha: 1, y: 0 }, '<0.2')
    .to(elements.subscribeTitle, { autoAlpha: 1, x: 0 }, '<0.1')
    .to(elements.subscribeText, { autoAlpha: 1, x: 0 }, '<0.05')
    .to(elements.copyright, { autoAlpha: 1, y: 0 }, '<0.1')
    .to(elements.socialItems, { autoAlpha: 1, x: 0, stagger: -0.1, duration: 0.8 }, '<0.15')
}

export default animateFooter
