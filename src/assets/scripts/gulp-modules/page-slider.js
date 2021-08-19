document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = $('.js-page-slider-container')
  const title = $('.page-slider__title')

  sliderContainer.each(function(_, wrapper) {
    const container = $(wrapper).find('.js-page-slider')[0]

    const slider = new Swiper(container, {
      speed: 700,
      autoHeight: true,
      slidesPerView: 3.3,
      freeMode: true,
      adaptiveHeight: true,
      allowTouchMove: false,
      breakpoints: {
        1025: {
          slidesPerView: 2.8
        },
        1300: {
          slidesPerView: 3.3
        }
      }
    })
  
    function stopMoveInCursor(e) {
      e.stopPropagation()
      $(wrapper).css({cursor: 'default'})
      $(wrapper).find('.js-page-slider-controller').css({opacity: 0})
      document.onmousemove = null
      document.onClick = null
    }
  
    let prevCoord = document.documentElement.clientWidth / 1.8
    let currentCordX
    let isFirstForGallery = true
  
    function startMoveInCursor(e) {
      const customCursor = $(wrapper).find('.js-page-slider-controller')
      console.log(customCursor)
      const maxOffsetTop = $(container).find('.swiper-slide img')[0].getBoundingClientRect().height
      let directionName = ''
  
      customCursor.css({opacity: 1, display: 'flex'})
  
      if(e.originalEvent.clientX > prevCoord) {
        directionName = 'right'
        customCursor.removeClass('back')
      } else {
        directionName = 'left'
        customCursor.addClass('back')
      }
  
      document.onmousemove = function(e) {
        customCursor.css({transform: `translate(${e.clientX - 50}px, ${e.layerY - 25}px)`})
  
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
  
    $(container).on('mouseenter', startMoveInCursor)
    $(container).on('mouseleave', stopMoveInCursor)
  
    $(window).on('resize', () => {
      const offsetLeft =  title[0].getBoundingClientRect().left
      $(container).css('padding-left', `${offsetLeft}px`)
      $(container).css('padding-right', `${offsetLeft}px`)
  
      slider.update()
    }).resize()
  })
})
