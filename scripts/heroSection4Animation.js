import createImages from "./utils/createCanvases.js"

// Анимирует секцию hero при прокрутке
function animateHeroSection4() {
  const heroSection = document.querySelector(".hero-section-2")

  // Получаем целевые элементы
  const elements = {
    img: heroSection.querySelector(".hero-section__img"),
    imgWrapper: heroSection.querySelector(".hero-section__wrapper-img"),
    title: heroSection.querySelector(".hero-section__title"),
    description: heroSection.querySelector(".hero-section__description"),
    photoMetadata: heroSection.querySelectorAll(".photo-metadata__item"),
  }

  // Создаем изображения-фрагменты внутри imgWrapper
  createImages(elements.img, elements.imgWrapper, 20)
  elements.imgList = gsap.utils.toArray(".hero-section-2 .hero-section__img")

  // Устанавливаем начальные состояния элементов
  gsap.set(heroSection, { autoAlpha: 0, scale: 0.75, borderRadius: "40px" })
  gsap.set(elements.title, { autoAlpha: 0, y: -80 })
  gsap.set(elements.description, { autoAlpha: 0, x: -120 })
  gsap.set(elements.photoMetadata, { autoAlpha: 0, x: 120 })

  // Анимация появления секции
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

  // Анимация при прокрутке с закреплением секции
  const pin = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "center center",
      end: () => `+=${heroSection.offsetWidth * 2}`,
      pin: true,
      scrub: true,
    },
  })

  pin.to(heroSection, { scale: 1, borderRadius: "0px" })
    .add(animateImages(elements.imgList), ">")

  // Анимация разлета изображений
  function animateImages(imageList) {
    const imagesTl = gsap.timeline()

    imageList.forEach((img) => {
      const randomAngle = (Math.random() - 0.5) * 2 * Math.PI
      const randomRotationAngle = 30 * (Math.random() - 0.5)

      imagesTl.to(
        img,
        {
          rotate: randomRotationAngle,
          translateY: 40 * Math.sin(randomAngle),
          translateX: 40 * Math.cos(randomAngle),
          opacity: 0,
          duration: 1,
        },
        "<"
      )
    })

    return imagesTl
  }
}

export default animateHeroSection4
