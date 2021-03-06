import { openSettings } from './Settings'
import { canvasDrawing } from '../canvas'
import { ButtonIcon, insertButtonText } from '../scripts/icon'
import { saveImage } from '../scripts/saveImage'
import { addShortcut } from '../shortcuts'

// Navbar mobile
const navbarBtn = document.getElementById('navbar-btn')
const navbarMobile = document.getElementById('navbar-mobile')

if (!navbarBtn || !navbarMobile) throw new Error('Navbar element do not exist!')

navbarBtn.onclick = () => {
  navbarMobile.classList.toggle('show')
}

// Save image button
const saveBtnKey = 'ctrl+s'
const saveBtn = document.getElementById('save-btn') as ButtonIcon
export const fileNameInput = document.getElementById(
  'filename-input'
) as HTMLInputElement

function saveBtnHandler(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  saveImage(canvasDrawing.toDataURL(), fileNameInput.value)
}

if (!saveBtn || !fileNameInput) throw new Error('Invalid save elements')

insertButtonText(saveBtn, `Save (${saveBtnKey})`)

saveBtn.addEventListener('click', saveBtnHandler)

addShortcut('saveBtn', saveBtnKey, saveBtnHandler)

// Settings menu button
const newCanvasBtn = document.getElementById('settings-btn') as ButtonIcon

if (!newCanvasBtn) throw new Error('Invalid new canvas nav button')

insertButtonText(newCanvasBtn, 'New canvas')

newCanvasBtn.addEventListener('click', () => openSettings())
