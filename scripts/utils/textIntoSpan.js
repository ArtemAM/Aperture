/**
 * Разбивает текст внутри элемента на отдельные <span>, оборачивая каждый символ.
 * Это позволяет анимировать буквы по отдельности с помощью CSS или GSAP.
 */
function textIntoSpan(domElement) {
  if (!domElement) return

  // Создаём фрагмент для оптимизированного добавления элементов в DOM
  const fragment = document.createDocumentFragment()
  const text = domElement.textContent.trim()

  // Разбиваем текст на символы и оборачиваем каждый в <span>
  text.split('').forEach((char) => {
    const span = document.createElement('span')
    span.textContent = char 
    fragment.appendChild(span)
  })

  domElement.innerHTML = ''
  domElement.appendChild(fragment)
}

export default textIntoSpan