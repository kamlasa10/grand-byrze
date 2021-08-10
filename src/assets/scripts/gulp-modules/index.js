@@include('../libs/libs.js')

let menuTl = gsap.timeline()
const menu = document.querySelector('.js-menu')
const openMenu = document.querySelector('.js-menu-open')
const header = document.querySelector('.header')
const closeMenu = document.querySelector('.js-menu-close')

function animationCloseMenu() {
  menu.classList.remove('show')

  setTimeout(() => {
    header.classList.remove('hide')
  }, 300)
}

function animationShowMenu() {
  menuTl.kill()
  header.classList.add('hide')
  setTimeout(() => {
    menu.classList.add('show')
  }, 200)
}

openMenu.addEventListener('click', (e) => {
  e.preventDefault()
  animationShowMenu()
})

closeMenu.addEventListener('click', e => {
  e.preventDefault()
  animationCloseMenu()
})