import textIntoSpan from "./utils/textInToSpan.js"
import animateHeader from "./headerAnimation.js"

// Анимирует секцию "Hero", создавая плавные появления и движения элементов
function animateHero() {
  // Находим основные элементы секции "Hero"
  const heroElement = document.querySelector('.hero')
  const overlayElement = heroElement.querySelector('.hero__overlay')
  const subtitleElement = heroElement.querySelector('.hero__subtitle')
  const titleElement = heroElement.querySelector('.hero__title h1')
  const descriptionElement = heroElement.querySelector('.hero__description')
  const photoMetadataElement = heroElement.querySelector('.photo-metadata')
  const photoMetadataItemElements = photoMetadataElement.querySelectorAll('.photo-metadata__item')

  // Разбиваем текст заголовка на <span>, чтобы анимировать каждую букву отдельно
  textIntoSpan(titleElement)
  const titleSpanElements = heroElement.querySelectorAll('.hero__title span')

  // Создаём анимационный timeline с настройками по умолчанию
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

  tl.add(animateHeader)

  // Анимация фонового изображения
  tl.to(heroElement, {
    '--scale': 1.4,
    duration: 20,
    yoyo: true,
    repeat: -1,
    ease: 'none'
  },  '<0.8')

  // Анимация исчезновения затемняющего слоя
  tl.to(overlayElement, {
    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    duration: 1,
    ease: 'expo.in'
  }, '<')

  // Анимация подзаголовка
  tl.fromTo(subtitleElement, {
    autoAlpha: 0,
    y: -50
  }, {
    autoAlpha: 1,
    y: 0,
    duration: 1.2
  }, '<0.5')

  // Анимация описания
  tl.fromTo(descriptionElement, {
    autoAlpha: 0,
    x: -100
  }, {
    autoAlpha: 1,
    x: 0,
    duration: 1.2
  }, '<')

  // Анимация появления букв заголовка
  tl.fromTo(titleSpanElements, {
    y: -100
  }, {
    y: 0,
    stagger: 0.05,
    duration: 0.2
  }, '<0.8')

  // Анимация появления метаданных фотографии
  tl.fromTo(photoMetadataItemElements, {
    scale: 0,
    autoAlpha: 0
  }, {
    scale: 1,
    autoAlpha: 1,
    stagger: 0.2,
    duration: 0.5
  }, '<')

  return tl
}

export default animateHero