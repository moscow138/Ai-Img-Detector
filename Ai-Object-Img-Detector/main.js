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
const IMAGE = $('#image-container')
const FILEINPUT = $('#file-upload')

// load status text..
STATUS.textContent = 'Loading model...'
const DETECTOR = await pipeline('object-detection', 'Xenova/detr-resnet-50')
STATUS.textContent = 'Ready'
FILEINPUT.on('change', (event) => {
  console.log('File input change event', event)
})
