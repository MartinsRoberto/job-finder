const btnMobile = document.querySelector('.header button')

btnMobile.addEventListener('click', () => {
  document.querySelector('.header .menu').classList.toggle('active')
})