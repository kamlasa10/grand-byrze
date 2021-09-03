(function() {
  document.addEventListener('DOMContentLoaded', () => {
    let isFirstShowSlide = true;
    let slideChangeTl = gsap.timeline();
    let prevActiveSlide = null

    function animateChangeSlide({ slides, activeSlide, activeIndex }) {
      slideChangeTl.kill();
      slideChangeTl = gsap.timeline();
      const containerText = activeSlide.querySelector('.js-slider-desc');
      const currentTitle = document.querySelector(`[data-slide-title='${activeSlide.dataset.swiperSlideIndex}']`)
      const prevSlideTitle = document.querySelector(`[data-slide-title='${prevActiveSlide.dataset.swiperSlideIndex}']`)
      const sliderTitles = document.querySelectorAll('[data-slide-title]')
      const withTranslateTitle = +prevActiveSlide.dataset.swiperSlideIndex % 2 !== 0 

      sliderTitles.forEach(title => {
        if(title !== prevSlideTitle) {
          gsap.set(title, {opacity: 0, x: 0})
        }

        if(withTranslateTitle && title !== prevSlideTitle) {
          gsap.set(title, {
            opacity:0,
            x: '-30px'
          })
        }
      })

      slides.forEach(slide => {
        gsap.set(slide.querySelector('.swiper-slide-img'), {
          clipPath: 'circle(80% at 50% 50%)',
        });

        gsap.set(slide.querySelector('.js-slider-desc'), {opacity: 0, y: 40})
      });

      slideChangeTl
        .fromTo(
          activeSlide.querySelector('.swiper-slide-img'),
          {
            yPercent: -35,
            scale: 0.5
          },
          {
            yPercent: 0,
            scale: 1,
            duration: 0.7,
          },
        )
        .fromTo(
          activeSlide.querySelector('.swiper-slide-img'),
          {
            clipPath: 'circle(55% at 50% 5%)',
            '-webkit-clip-path': 'circle(55% at 50% 5%)'
          },
          {
            '-webkit-clip-path': 'circle(80% at 50% 70%)',
            clipPath: 'circle(80% at 50% 70%)',
            duration: 0.9,
          },
          0.4,
        )
        .to(prevSlideTitle, {
          opacity: 0,
          x: withTranslateTitle ? '30px' : 0,
          duration: 0.8
        }, 0.2)
        .to(currentTitle, {
          opacity: 1,
          x: 0,
          duration: 0.8
        }, withTranslateTitle ? 0.1 : 0.5)
        .to(containerText, {
          opacity: 1,
          y: 0,
          duration: 0.8
        }, 0)
        // .to(
        //   title,
        //   {
        //     x: 0,
        //     opacity: 1,
        //     duration: 0.8,
        //   },
        //   0.6,
        // );

        prevActiveSlide = activeSlide
    }

    if($(window).width() >= 700) {
      const swiper = new Swiper('.js-main-slider', {
        autoplay: {
          delay: 7000,
          speed: 0,
        },
        effect: 'fade',
        allowTouchMove: false,
        on: {
          slideChange(swiper) {
            const activeSlide = swiper.slides[swiper.activeIndex];
  
            if (isFirstShowSlide) {
              isFirstShowSlide = false;
              return;
            }
  
            animateChangeSlide({ slides: swiper.slides, activeSlide, activeIndex: swiper.activeIndex });
          },
        },
      });
    } else {
      const swiper = new Swiper('.js-main-slider', {
        autoplay: {
          delay: 7000,
          speed: 0,
        },
        allowTouchMove: false,
        speed: 700
      });
    }

    prevActiveSlide = document.querySelector('.js-main-slider .swiper-slide-active')

    class Tabs {
      constructor(content, tabs, activeClass, showedTabInit = 1) {
        this.content = content;
        this.tabs = tabs;
        this.activeClass = activeClass;
        this.showedTabInit = showedTabInit;
        this.init();
      }

      trigger(_fn, idxFirstShowTab = 0) {
        this.tabs.each((_, item) => {
          $(item).on('click', e => {
            e.preventDefault();

            this.tabs.parent().removeClass(this.activeClass);
            $(item)
              .parent()
              .addClass(this.activeClass);
            console.log($(item).data('choise'));
            this.contentShow($(item).data('choise'));
          });
        });
        this.tabs.removeClass(this.activeClass);
        this.tabs
          .eq(idxFirstShowTab)
          .parent()
          .addClass(this.activeClass);
        this.contentShow(this.showedTabInit);
      }

      contentShow(value) {
        this.content.hide();
        this.content.each((_, item) => {
          if ($(item).data('choise-content') == value) {
            $(item).fadeIn(200);
          }
        });

        try {
          window.locoScroll.update();
        } catch (e) {}
      }

      init() {
        this.trigger();
      }
    }
    new Tabs($('.js-building-info-tabs__content'), $('.js-building-info__tab'), 'show');

    $('.js-anchor-link').on('click', e => {
      e.preventDefault()

      if(window.locoScroll) {
        window.locoScroll.scrollTo($('.intro')[0], {
          duration: 800
        })
        return
      }
      const href = $(e.currentTarget).attr('href')

      $('html,body').stop().animate({scrollTop: $(href).offset().top}, 800);
    })

    $('.js-open-video').on('click', e => {
      e.preventDefault()
      const videoSrc = $(e.target).attr('data-video')

      $('.js-video-container').attr('src', videoSrc)
      $('.js-video').addClass('show')
    })

    $('.js-video-close').on('click', e => {
      e.preventDefault()
      $('.js-video').removeClass('show')

      setTimeout(() => {
        $('.js-video-container').attr('src', '')
      }, 300)
    })
  })
})();
