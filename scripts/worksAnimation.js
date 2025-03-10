// Подключаем ScrollTrigger из GSAP
gsap.registerPlugin(ScrollTrigger)

// Анимирует секцию "Works" при прокрутке страницы
function animateWorks() {
  // Получаем элементы секции
  const worksElement = document.querySelector(".works")
  const titleElement = worksElement.querySelector(".works__title")
  const subtitleElement = worksElement.querySelector(".works__subtitle")
  const photoCardElements = worksElement.querySelectorAll(".photo-card")

  // Объект для управления наклоном карточек
  const proxy = { skew: 0 }
  const skewSetter = gsap.quickSetter(photoCardElements, "skewY", "deg") // Оптимизированный setter
  const clamp = gsap.utils.clamp(-20, 20) // Ограничиваем наклон в диапазоне [-20, 20]

  // Создаём `timeline` для анимации секции "Works"
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: worksElement,
      start: "top center",
      end: "bottom",
      onUpdate: skewOnScroll, // Добавляем эффект наклона карточек
    },
    defaults: { duration: 1.2, ease: "power3.inOut" },
  })

  // Оптимизированные 3D-стили для карточек
  tl.set(photoCardElements, {
    transformOrigin: "right center",
    force3D: true,
  })

  tl.fromTo(titleElement, { autoAlpha: 0, y: -50 }, { autoAlpha: 1, y: 0 })
  tl.fromTo(subtitleElement, { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0 }, "<0.2")
  tl.fromTo(photoCardElements, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 }, "<")

  // Добавляет эффект наклона карточкам при прокрутке
  function skewOnScroll(self) {
    const skew = clamp(self.getVelocity() / -300)

    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew
      gsap.to(proxy, {
        skew: 0, // Плавно возвращаем skew к 0
        duration: 0.8,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew), // Устанавливаем новый угол наклона карточек
      })
    }
  }
}

export default animateWorks
