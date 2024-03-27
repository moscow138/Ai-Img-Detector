/* eslint-disable no-unused-vars */
import {
  env,
  pipeline
} from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0'

import './style.css'
import './utils/bling'

console.log({ env, pipeline })

env.allowLocalModels = false

// eslint-disable-next-line no-undef
const STATUS = $('#status')
// eslint-disable-next-line no-undef
const IMAGE = $('#image-container')
// eslint-disable-next-line no-undef
const FILEINPUT = $('#file-upload')

// load status text..
STATUS.textContent = 'Loading model...'
const DETECTOR = await pipeline('object-detection', 'Xenova/detr-resnet-50')
STATUS.textContent = 'Ready'
FILEINPUT.on('change', (event) => {
  console.log('File input change event', event)
  // get upload image file details
  const FILE = event.target.files[0]
  // check if image file is uploaded or not
  // eslint-disable-next-line no-useless-return
  if (!FILE) return
  // Reading the content of the image file..
  const READER = new FileReader()
  READER.onload = (readerEvent) => {
    console.log('reader onload event', readerEvent)
    console.log(readerEvent.target.result)
    // get image container on indexHTML.
    // eslint-disable-next-line no-undef
    const IMAGE_EL = mk('img', { src: readerEvent.target.result })
    console.log({ IMAGE_EL })
    IMAGE.innerHTML = ''
    IMAGE.appendChild(IMAGE_EL)
    // Pass image file to detect function below..
    detect(IMAGE_EL)
  }
  READER.readAsDataURL(FILE)
})
async function detect (image) {
  console.log('Detecting...')
  STATUS.textContent = 'Model is Analyzing our Image'
  const OUTPUT = await DETECTOR(image.src, { threshold: 0.5, percentage: true })
  console.log(OUTPUT)
  STATUS.textContent = 'Done'
  OUTPUT.forEach(render)
}
// Rendering Output in Arrays
const render = ({ box, label }) => {
  console.log('Rendering...')
  console.log({ box, label })
  // Draw a rectangle around all the object...
  const { xmin, xmax, ymin, ymax } = box
  console.log({ xmin, xmax, ymin, ymax })
  // re-asign the color function...
  const colorGen = color1()
  // eslint-disable-next-line no-undef
  const rect = mk(
    'div',
    {
      style: `border-color:${colorGen};top: ${ymin * 100}%;left: ${
        xmin * 100
      }%;width: ${(xmax - xmin) * 100}%;height: ${(ymax - ymin) * 100}%`,
      className: 'bounding-box'
    },
    [
    // eslint-disable-next-line no-undef
      mk('span', {
        className: 'bounding-box-lable',
        style: `color: ${colorGen}`
      }, [label])
    ])
  console.log({ rect })
  IMAGE.appendChild(rect)
}
// create a random color function..
const color = (num) => {
  return Math.floor(Math.random() * num)
}
// Generating hsl() code random color..
const color1 = () => `hsl(${color(360)}, 100%, 50%)`
console.log(color1())

const randomColor = () => `rgb(${color(256)}, ${color(256)}, ${color(256)})`
// Generating hex code random color..(shorthand)
const colorHex =
  '#' +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, 0)
console.log(colorHex)

// Generating hex code random color..
const generateRandomColor = () => {
  const maxVal = 0xFFFFFF // 16777215
  let randomNumber = Math.random() * maxVal
  randomNumber = Math.floor(randomNumber)
  randomNumber = randomNumber.toString(16)
  const randColor = randomNumber.padStart(6, 0)
  return `#${randColor.toUpperCase()}`
}
console.log(generateRandomColor())

console.log(randomColor())
