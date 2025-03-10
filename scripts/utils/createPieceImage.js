function createPieceImage(img, imgWrapper, columns=12) {
  
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  // Получаем фактические размеры изображения в HTML
  const imgWidth = img.clientWidth
  const imgHeight = img.clientHeight

  // Устанавливаем размеры canvas в соответствии с реальным отображением картинки
  canvas.width = imgWidth
  canvas.height = imgHeight

  // Рисуем изображение на canvas с новыми размерами
  ctx.drawImage(img, 0, 0, imgWidth, imgHeight)

  const pieceWidth = img.width / columns

    for (let i = 0; i < columns; i++) {
      // Создаём новый canvas для каждого фрагмента
      const pieceCanvas = document.createElement("canvas")
      pieceCanvas.width = pieceWidth
      pieceCanvas.height = img.height
      const pieceCtx = pieceCanvas.getContext("2d")

      // Вырезаем часть изображения
      pieceCtx.drawImage(
        canvas,
        i * pieceWidth, 0, pieceWidth, img.height, // Координаты вырезки
        0, 0, pieceWidth, img.height // Координаты на новом canvas
      )

      // Создаём <img> и вставляем кусочек
      const imgElement = document.createElement("img")
      imgElement.src = pieceCanvas.toDataURL()
      imgElement.style.width = pieceWidth + "px"
      imgElement.style.height = "auto"
      imgElement.style.display = "block"

      imgWrapper.appendChild(imgElement)
    }
    img.style.filter = 'grayscale(100%)'
}

export default createPieceImage