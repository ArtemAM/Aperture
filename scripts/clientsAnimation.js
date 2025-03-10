// Подключаем ScrollTrigger из GSAP
gsap.registerPlugin(ScrollTrigger)

// Анимирует секцию "Clients" при прокрутке страницы
function animateClients() {
  
  // Находим секцию "Clients" и её элементы
  const clientsSection = document.querySelector('.clients');
  const elements = {
    title: clientsSection.querySelector('.clients__title'),
    subtitle: clientsSection.querySelector('.clients__subtitle'),
    clientList: clientsSection.querySelector('.clients__list'),
    clientItems: gsap.utils.toArray('.clients__item')
  };

  // Дублируем логотипы клиентов для создания эффекта бесконечного скролла
  duplicateClientItems(elements.clientList, elements.clientItems)

  // Устанавливаем начальные стили для плавного появления
  gsap.set(elements.title, { autoAlpha: 0, y: -100 })
  gsap.set(elements.subtitle, { autoAlpha: 0, y: -100 })
  gsap.set(elements.clientList, { autoAlpha: 0, x: -200 })

  // Создаём `timeline` для анимации появления секции "Clients".
  const reveal = gsap.timeline({
    scrollTrigger: {
      trigger: clientsSection,
      end: 'bottom',
    },
    defaults: { duration: 1.2, ease: 'power3.inOut' }
  })

  // Анимация появления секции "Clients"
  reveal.to(elements.title, { autoAlpha: 1, y: 0 })
        .to(elements.subtitle, { autoAlpha: 1, y: 0 }, '<0.15')
        .to(elements.clientList, { autoAlpha: 1, x: 0 }, '<0.1')

  // Анимация бесконечного движения логотипов клиентов.
  const infiniteBanner = gsap.to(elements.clientList, {
    xPercent: -50,
    duration: 10,
    repeat: -1,
    ease: 'none',
    yoyo: true
  })

  // Добавляем бесконечную анимацию логотипов после появления секции
  reveal.add(infiniteBanner, '<');

  // Функция дублирует логотипы клиентов, создавая эффект бесконечного скролла
  function duplicateClientItems(clientList, clientItems) {
    clientItems.forEach((item) => clientList.append(item.cloneNode(true)))
  }
}

export default animateClients;
