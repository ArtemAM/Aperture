// Подключаем GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Анимирует секцию `.hero-section-3` при скролле
function animateHeroSection3() {
  const heroSectionElement = document.querySelector('.hero-section-3')

  // Сохраняем ссылки на внутренние элементы секции
  const elements = {
    title: heroSectionElement.querySelector(".hero-section__title"),
    description: heroSectionElement.querySelector(".hero-section__description"),
    photoMetadata: heroSectionElement.querySelectorAll(".photo-metadata__item"),
    comparisionImageAfter: heroSectionElement.querySelector(".comprasion-image--after"),
    comparisionImageAfterImg: heroSectionElement.querySelector(".comprasion-image--after img")
  }

  // Устанавливаем начальные стили для элементов
  gsap.set(heroSectionElement, { autoAlpha: 0, scale: 0.75, borderRadius: '40px' })
  gsap.set(elements.title, { autoAlpha: 0, y: -80 })
  gsap.set(elements.description, { autoAlpha: 0, x: -120 })
  gsap.set(elements.photoMetadata, { autoAlpha: 0, x: 120 })

  // Анимация появления элементов при прокрутке
  const reveal = gsap.timeline({
    scrollTrigger: {
      trigger: heroSectionElement,
      start: 'top center',
      end: 'bottom',
    },
    defaults: { duration: 1.2, ease: 'power3.inOut' }
  })

  // Добавляем анимации в `timeline`
  reveal.to(heroSectionElement, { autoAlpha: 1 })
        .to(elements.title, { autoAlpha: 1, y: 0 }, "<0.3")
        .to(elements.description, { autoAlpha: 1, x: 0 }, "<0.1")
        .to(elements.photoMetadata, { autoAlpha: 1, x: 0, stagger: 0.1 }, "<0.1")

  // Анимация закрепления секции и трансформаций (`pin` effect)
  const pin = gsap.timeline({
    scrollTrigger: {
      trigger: heroSectionElement,
      start: 'center center',
      end: () => `+=${heroSectionElement.offsetWidth * 1.5}`, 
      pin: true,
      scrub: true,
      anticipatePin: 1,
    },
    defaults: {
      ease: 'none'
    }
  })

  // Эффект масштабирования и убирания скруглённых углов
  pin.to(heroSectionElement, { borderRadius: "0px", scale: 1 })
     .to(elements.comparisionImageAfter, { x: 0 }) 
     .to(elements.comparisionImageAfterImg, { x: 0 }, "<")
}

export default animateHeroSection3