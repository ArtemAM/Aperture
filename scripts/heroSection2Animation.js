import createCanvases from "./utils/createCanvases.js";

// Подключаем ScrollTrigger из GSAP
gsap.registerPlugin(ScrollTrigger)

// Функция анимации секции Hero (hero-section-2).
function animateHeroSection2() {
  // Находим секцию Hero и её элементы
  const heroSection = document.querySelector('.hero-section-2');
  const elements = {
    title: heroSection.querySelector('.hero-section__title'),
    description: heroSection.querySelector('.hero-section__description'),
    photoMetadataItems: gsap.utils.toArray('.hero-section-2 .photo-metadata__item'),
    img: heroSection.querySelector('.hero-section__img')
  }

  // Генерируем канвасы (разбитие секции на части) и после их создания запускаем анимацию
  createCanvases(heroSection).then((canvasList) => {
    const canvasContainer = createCanvasContainer(canvasList) // Создаём контейнер для канвасов
    const canvasesAnimation = animateCanvases(canvasList) // Анимация исчезновения канвасов

    initializeHeroSection() // Устанавливаем стартовые стили
    revealAnimation() // Анимация появления элементов
    pinnedAnimation(canvasesAnimation, canvasContainer) // Анимация фиксации секции и исчезновения
  })

  //Устанавливает стартовые стили для секции и её элементов.
  function initializeHeroSection() {
    gsap.set(heroSection, { autoAlpha: 0, scale: 0.75, borderRadius: '40px' })
    gsap.set(elements.title, { autoAlpha: 0, y: -80 })
    gsap.set(elements.description, { autoAlpha: 0, x: -120 })
    gsap.set(elements.photoMetadataItems, { autoAlpha: 0, x: 120 })
  }

  // Анимация появления элементов секции Hero.
  function revealAnimation() {
    const reveal = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top center',
        end: 'bottom'
      },
      defaults: { duration: 1.2, ease: 'power3.inOut' }
    })

    reveal.to(heroSection, { autoAlpha: 1 })
          .to(elements.title, { autoAlpha: 1, y: 0 }, "<0.3")
          .to(elements.description, { autoAlpha: 1, x: 0 }, "<0.1")
          .to(elements.photoMetadataItems, { autoAlpha: 1, x: 0, stagger: 0.1 }, "<0.1")
  }

  // Анимация фиксации секции Hero и последующее "разложение" её на фрагменты.
  function pinnedAnimation(canvasesAnimation, canvasContainer) {
    const pin = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'center center',
        end: () => `+=${heroSection.offsetWidth * 2}`,
        pin: true,
        scrub: true
      }
    })

    // Убираем скейл и скругление у секции
    pin.to(heroSection, { scale: 1, borderRadius: '0px', duration: 1 })

    // Включаем канвасы и скрываем оригинальные элементы
    pin.add(() => {
      gsap.set([elements.title, elements.description, elements.photoMetadataItems, elements.img], { autoAlpha: 0 })
      gsap.set(canvasContainer, { opacity: 1 })
    }, '>')

    // Запускаем анимацию исчезновения канвасов
    pin.add(canvasesAnimation, '<')
  }

  // Анимация рассыпания канвасов.
  function animateCanvases(canvasList) {
    const canvasesTl = gsap.timeline()

    canvasList.forEach(canvas => {
      const randomAngle = (Math.random() - 0.5) * 2 * Math.PI
      const randomRotationAngle = 30 * (Math.random() - 0.5)

      canvasesTl.to(canvas, {
        rotate: randomRotationAngle,
        translateY: 40 * Math.sin(randomAngle),
        translateX: 40 * Math.cos(randomAngle),
        opacity: 0,
        duration: 1
      }, '<')
    })

    return canvasesTl
  }

  // Создаёт контейнер для канвасов и добавляет их в секцию.
  function createCanvasContainer(canvasList) {
    const canvasContainer = document.createElement('div')
    canvasContainer.className = 'canvas-container'
    canvasContainer.style.opacity = '0'
    heroSection.appendChild(canvasContainer)

    canvasList.forEach(canvas => {
      canvasContainer.appendChild(canvas)
    })

    return canvasContainer
  }
}

export default animateHeroSection2;