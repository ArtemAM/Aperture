// Подключаем GSAP для анимации
gsap.registerPlugin()

// Анимация формы подписки
function animateForm() {
  // Получаем элементы формы
  const formElement = document.querySelector('.form');
  const elements = {
    input: formElement.querySelector('.form__input'), // Поле ввода email
    button: formElement.querySelector('.form__button') // Кнопка отправки
  };

  // Отключаем стандартную отправку формы
  formElement.addEventListener('submit', event => event.preventDefault());

  // Добавляем обработчик нажатия на кнопку
  elements.button.addEventListener('click', animateSuccess);

  // Функция анимации успешной отправки
  function animateSuccess() {
    if (!elements.input.checkValidity()) return // Проверяем валидность email

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    tl.to(elements.button, {
      width: `${elements.input.offsetWidth}px`,
      right: 0,
      duration: 0.2
    })
    .to(elements.button, { height: '50px', duration: 0.3 })
    .to(elements.input, { autoAlpha: 0, duration: 0.2 }, '>')
    .set(elements.button, {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
    })
    .to(elements.button, {
      backgroundColor: '#FFF',
      duration: 0.3
    })
    .add(() => {
      gsap.set(elements.button, {
        right: '50%',
        translateX: '50%' 
      })
      elements.button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12L10 17L19 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      elements.button.disabled = true
      elements.button.style.cursor = 'default'
    }, '<')
  }
}

export default animateForm