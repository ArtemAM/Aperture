// Подключаем ScrollTrigger из GSAP
gsap.registerPlugin(ScrollTrigger);

// Анимирует секцию "Contact" при прокрутке страницы.
function animateContact() {
  
  // Находим секцию "Contact" и её элементы
  const contactSection = document.querySelector('.contact')
  const elements = {
    title: contactSection.querySelector('.contact__title'),
    subtitle: contactSection.querySelector('.contact__subtitle'),
    link: contactSection.querySelector('.contact__link')
  }

  // Устанавливаем начальные стили для плавного появления
  gsap.set(contactSection, { autoAlpha: 0 })
  gsap.set(elements.title, { autoAlpha: 0, y: -80 })
  gsap.set(elements.subtitle, { autoAlpha: 0, x: -120 })
  gsap.set(elements.link, { autoAlpha: 0, x: 120 })

  // Создаём `timeline` для анимации секции "Contact"
  const reveal = gsap.timeline({
    scrollTrigger: {
      trigger: contactSection,
      start: 'top 55%',
      end: 'bottom',
    },
    defaults: { duration: 1.2, ease: 'power3.inOut' }
  })

  // Анимация появления секции "Contact".
  reveal.to(contactSection, { autoAlpha: 1 })
    .to(elements.title, { autoAlpha: 1, y: 0 }, "<0.3")
    .to(elements.subtitle, { autoAlpha: 1, x: 0 }, "<0.1")
    .to(elements.link, { autoAlpha: 1, x: 0 }, "<")
}

export default animateContact