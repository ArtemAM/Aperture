// Анимирует элементы хедера при загрузке страницы
function animateHeader() {
  // Находим элементы хедера
  const headerElement = document.querySelector('.header')

  // Создаём объект с ссылками на все элементы, которые будут анимироваться
  const elements = {
    logo: headerElement.querySelector('.header__logo'),
    linkItems: headerElement.querySelectorAll('.header__item'),
    burgerButton: headerElement.querySelector('.burger-button'),
    overlay: headerElement.querySelector('.header__overlay'),
    overlayWrapper: headerElement.querySelector('.header__overlay-wrapper'),
    overlayBlocks: gsap.utils.toArray('.header__overlay-block'),
    burgerButtonMenu: gsap.utils.toArray('.burger-button__menu'),
    burgerButtonClose: gsap.utils.toArray('.burger-button__close'),
  }

  // Создаём анимационный timeline с настройками по умолчанию
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

  // Анимация логотипа:
  tl.fromTo(elements.logo, 
    { scale: 1 }, 
    { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 }
  )

  // Анимация появления пунктов меню
  const mm = gsap.matchMedia()

  mm.add("(min-width: 769px)", () => {
    tl.fromTo(elements.linkItems, 
      { autoAlpha: 0, x: -50 }, 
      { autoAlpha: 1, stagger: 0.1, x: 0, duration: 0.8 }, 
      '<0.25'
    )
  })

  // Устанавливает начальные настройки для мобильных устройств
  function initSettingsMobile() {
    gsap.set(elements.overlay, { autoAlpha: 0 })
    gsap.set([elements.overlayBlocks[0], elements.overlayBlocks[2]], { xPercent: 100 })
    gsap.set(elements.overlayBlocks[1], { xPercent: -100 })
    gsap.set(elements.linkItems, { autoAlpha: 0, x: -150 })
    gsap.set(elements.burgerButtonClose, { autoAlpha: 0 })
  }

  // Анимация для мобильных устройств
  function animateHeaderMobile() {
    const tl = gsap.timeline({ defaults: { duration: 1.2 }, paused: true, reversed: true })

    // Настройка для появления overlay
    tl.set(elements.overlay, { autoAlpha: 1 })

    // Анимация для кнопок бургер-меню
    tl.to([elements.burgerButtonMenu[1], elements.burgerButtonMenu[2]], {
      transform: 'rotate(-45deg) translateX(150px)',
      autoAlpha: 0
    }, '<')

    // Анимация для первой кнопки бургер-меню
    tl.to(elements.burgerButtonMenu[0], {
      transform: 'rotate(-45deg) translateX(-150px)',
      autoAlpha: 0
    }, '<')

    // Анимация для блоков overlay
    tl.to([elements.overlayBlocks[0], elements.overlayBlocks[2]], { xPercent: 0 }, '<0.2')
    tl.to(elements.overlayBlocks[1], { xPercent: 0 }, '<')

    // Анимация для кнопок бургер-close
    tl.to(elements.burgerButtonClose[0], {
      transform: 'rotate(45deg) translateX(0)', autoAlpha: 1, duration: 0.5
    }, '<')
    tl.to(elements.burgerButtonClose[1], {
      transform: 'rotate(-45deg) translateX(0)', autoAlpha: 1, duration: 0.5
    }, '<')

    // Анимация появления ссылок в меню
    tl.to(elements.linkItems, {
      autoAlpha: 1,
      x: 0,
      ease: 'power3.inOut',
      stagger: 0.1
    }, '<0.1')

    return tl
  }

  // Для мобильных устройств на разрешении до 767px
  mm.add('(max-width: 768px)', () => {
    initSettingsMobile()
    const tl = animateHeaderMobile()

    // Сохраняем ссылку на timeline, чтобы можно было закрывать меню из другого модуля
    window.mobileMenuTimeline = tl

    // Обработчик для переключения состояния меню
    elements.burgerButton.addEventListener('click', () => {
      document.documentElement.classList.toggle('is-lock')
      if (tl.reversed()) {
        tl.play()
      } else {
        tl.reverse()
      }
    })
  })

  return tl
}

export default animateHeader
