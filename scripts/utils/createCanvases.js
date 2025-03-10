// Копирует изображение
function createImages(img, imgWrapper, count) {
  for (let i = 0; i < count; i++) {
    const imgClone = img.cloneNode(true)
    imgWrapper.appendChild(imgClone)
  }
}

export default createImages

// Разбивает изображение секции на фрагменты и создаёт из них канвасы.
// function createCanvases(target) {
//   return new Promise((resolve) => {
//     const COUNT = 32 // Количество фрагментов
//     const REPEAT_COUNT = 2 // Количество повторов пикселей

//     html2canvas(target).then((canvas) => {
//       const width = canvas.width
//       const height = canvas.height
//       const ctx = canvas.getContext("2d")
//       const imageData = ctx.getImageData(0, 0, width, height-1)
//       let dataList = []

//       // Создаём пустые фрагменты
//       for (let i = 0; i < COUNT; i++) {
//         dataList.push(ctx.createImageData(width, height))
//       }

//       // Разбиваем изображение на фрагменты случайным образом
//       for (let x = 0; x < width; x++) {
//         for (let y = 0; y < height; y++) {
//           for (let l = 0; l < REPEAT_COUNT; l++) {
//             const index = (x + y * width) * 4
//             const dataIndex = Math.floor((COUNT * (Math.random() + (2 * x) / width)) / 3)
//             for (let p = 0; p < 4; p++) {
//               dataList[dataIndex].data[index + p] = imageData.data[index + p]
//             }
//           }
//         }
//       }

//       // Создаём канвасы из фрагментов
//       const canvasList = dataList.map((data) => {
//         let clonedCanvas = canvas.cloneNode()
//         clonedCanvas.getContext("2d").putImageData(data, 0, 0)
//         clonedCanvas.className = "capture-canvas"
//         return clonedCanvas
//       });

//       resolve(canvasList)
//     })
//   })
// }

// export default createCanvases