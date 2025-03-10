import createPieceImage from "./utils/createPieceImage.js"

// Анимирует секцию hero при прокрутке
function animateHeroSection1() {
  const heroSection = document.querySelector(".hero-section-1")

  // Получаем целевые элементы для анимации
  const elements = {
    splitImages: heroSection.querySelector(".split-images"),
    img: heroSection.querySelector(".hero-section__img"),
    title: heroSection.querySelector(".hero-section__title"),
    description: heroSection.querySelector(".hero-section__description"),
    photoMetadata: heroSection.querySelectorAll(".photo-metadata__item"),
  }

  // Разбиваем изображение на части
  createPieceImage(elements.img, elements.splitImages, 9)
  const splitImages = gsap.utils.toArray(".split-images img")

  // Начальные состояния элементов
  gsap.set(splitImages, { yPercent: 100 })
  gsap.set(heroSection, { autoAlpha: 0, scale: 0.75, borderRadius: "40px" })
  gsap.set(elements.title, { autoAlpha: 0, y: -80 })
  gsap.set(elements.description, { autoAlpha: 0, x: -120 })
  gsap.set(elements.photoMetadata, { autoAlpha: 0, x: 120 })

  // Анимация появления элементов
  const reveal = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top center",
      end: "bottom",
    },
    defaults: { duration: 1.2, ease: "power3.inOut" },
  })

  reveal
    .to(heroSection, { autoAlpha: 1 })
    .to(elements.title, { autoAlpha: 1, y: 0 }, "<0.3")
    .to(elements.description, { autoAlpha: 1, x: 0 }, "<0.1")
    .to(elements.photoMetadata, { autoAlpha: 1, x: 0, stagger: 0.1 }, "<0.1")

  // Анимация прокрутки с эффектом закрепления
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "center center",
      end: () => `+=${heroSection.offsetWidth * 2}`,
      pin: true,
      scrub: true,
    },
  })

  tl.to(heroSection, { scale: 1, borderRadius: "0px" })
    .to(splitImages, { yPercent: 0, stagger: 0.1 })
}

export default animateHeroSection1