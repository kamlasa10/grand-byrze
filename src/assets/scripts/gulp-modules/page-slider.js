document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = $('.js-page-slider')
  const title = $('.js-calculate-offset')

  const slider = new Swiper('.js-page-slider', {
    speed: 700,
    slidesPerView: 3.3,
    adaptiveHeight: true,
    allowTouchMove: false,
  })

  function stopMoveInCursor(e) {
    e.stopPropagation()
    $('.js-page-slider-container').css({cursor: 'default'})
    $('.js-page-slider-controller').css({opacity: 0})
    document.onmousemove = null
    document.onClick = null
  }

  let prevCoord = document.documentElement.clientWidth / 1.8
  let currentCordX
  let isFirstForGallery = true

  function startMoveInCursor(e) {
    const customCursor = $('.js-page-slider-controller')
    const maxOffsetTop = $('.js-page-slider .swiper-slide img')[0].getBoundingClientRect().height
    let directionName = ''

    $('.js-page-slider-container').css({cursor: 'none'})
    customCursor.css({opacity: 1, display: 'flex'})

    if(e.originalEvent.clientX > prevCoord) {
      directionName = 'right'
      customCursor.removeClass('back')
    } else {
      directionName = 'left'
      customCursor.addClass('back')
    }

    document.onmousemove = function(e) {
      customCursor.css({transform: `translate(${e.clientX - 50}px, ${e.layerY}px)`})

      if(prevCoord < e.clientX) {
        if(isFirstForGallery) {
          customCursor.removeClass('back')
          directionName = 'right'
          isFirstForGallery = false
        }
      } else {
        if(prevCoord > e.clientX) {
          if(!isFirstForGallery) {
            customCursor.addClass('back')
            directionName = 'left'
            isFirstForGallery = true
          }
        }
      }

      currentCordX = e.clientX
    }

    document.onclick = function() {
      if(directionName === 'right') {
        slider.slideNext()
      } else {
        slider.slidePrev()
      }
    }
  }

  $('.js-page-slider').on('mouseenter', startMoveInCursor)
  $('.js-page-slider').on('mouseleave', stopMoveInCursor)

  $(window).on('resize', () => {
    const offsetLeft =  title[0].getBoundingClientRect().left
    sliderContainer.css('padding-left', `${offsetLeft}px`)

    slider.update()
  }).resize()
})
