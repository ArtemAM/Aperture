// Подключаем ScrollTrigger из GSAP
gsap.registerPlugin(ScrollTrigger)

// Функция для анимации секции "Gear Cage"
function animateGearCage() {
  // Инициализация элементов для анимации
  const elements = initElements()

  // Создаём объект matchMedia для адаптивных анимаций в зависимости от ширины экрана
  const mm = gsap.matchMedia()

  // Устанавливаем анимацию для экранов с минимальной шириной 768px
  mm.add("(min-width: 769px)", () => {

    // Устанавливаем начальные стили перед анимацией
    setInitialStyles(elements)

    // Создаём анимацию появления левой и правой частей при прокрутке
    createRevealAnimation(elements)

    // Создаём анимацию фиксации правой части при прокрутке
    createPinAnimation(elements)

    // Создаём анимацию смены изображений при прокрутке
    createImageSwitchingAnimation(elements)
  })

  mm.add("(max-width: 768px)", () => {
    elements.items.forEach(item => {
      gsap.fromTo(item, {
        autoAlpha: 0,
        x: -100
      }, {
        autoAlpha: 1,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: "top 30%",
          end: "bottom",
        },
        duration: 1,
      })
   })
  })

  //Инициализация элементов в секции "Gear Cage"
function initElements() {
  const rootElement = document.querySelector('.gear-cage')

  return {
    rootElement,
    right: rootElement.querySelector('.gear-cage__right'),
    left: rootElement.querySelector('.gear-cage__left'),
    wrapperRight: rootElement.querySelector('.gear-cage__wrapper-right'),
    photos: gsap.utils.toArray('.gear-cage__img:not(:first-child)'),
    contents: gsap.utils.toArray('.gear-cage__item:not(:first-child)'),
    items: gsap.utils.toArray('.gear-cage__wrapper--mobile .gear-cage__item')
  }
}

// Устанавливает начальные стили перед анимацией
function setInitialStyles(elements) {
  gsap.set(elements.left, { xPercent: -50, autoAlpha: 0 })
  gsap.set(elements.right, { xPercent: 50, autoAlpha: 0 })
  gsap.set(elements.photos, { yPercent: 101 })
}

// Создаёт анимацию появления левой и правой частей при прокрутке
function createRevealAnimation(elements) {
  const reveal = gsap.timeline({
    scrollTrigger: {
      trigger: elements.rootElement,
      start: 'top center',
      end: 'bottom bottom',
    },
    defaults: { duration: 1.2, ease: 'power3.inOut' }
  })

  reveal
    .to(elements.left, { xPercent: 0, autoAlpha: 1 })
    .to(elements.right, { xPercent: 0, autoAlpha: 1 }, '<')
}

// Создаёт анимацию для фиксации правой части при прокрутке
function createPinAnimation(elements) {
  ScrollTrigger.create({
    trigger: elements.rootElement,
    start: 'top top',
    end: 'bottom 90%',
    pin: elements.wrapperRight,
    pinSpacing: false
  })
}

// Создаёт анимацию смены изображений при прокрутке
function createImageSwitchingAnimation(elements) {
  elements.contents.forEach((item, index) => {
    gsap.to(elements.photos[index], {
      yPercent: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: "20% 80%",
        end: "top 10%",
        scrub: true
      }
    })
  })
}
}

export default animateGearCage