(function() {
  document.addEventListener('DOMContentLoaded', () => {
    let isFirstShowSlide = true;
    let slideChangeTl = gsap.timeline();

    function animateChangeSlide({ slides, activeSlide, activeIndex }) {
      slideChangeTl.kill();
      slideChangeTl = gsap.timeline();
      const containerText = activeSlide.querySelector('.main-slider__content');
      const title = activeSlide.querySelector('.main-slider__title');

      slides.forEach(slide => {
        gsap.set(slide.querySelector('.swiper-slide-img'), {
          clipPath: 'circle(80% at 50% 50%)',
        });

        gsap.to(slide.querySelector('.main-slider__content'), {
          opacity: 0,
        });

        gsap.set(slide.querySelector('.main-slider__title'), {
          opacity: 0,
          x: -40,
        });
      });

      slideChangeTl
        .fromTo(
          activeSlide.querySelector('.swiper-slide-img'),
          {
            yPercent: -60,
          },
          {
            yPercent: 0,
            duration: 0.8,
          },
        )
        .fromTo(
          activeSlide.querySelector('.swiper-slide-img'),
          {
            clipPath: 'circle(30% at 50% 50%)',
          },
          {
            clipPath: 'circle(80% at 50% 50%)',
            duration: 1,
          },
          0.4,
        )
        .to(
          containerText,
          {
            opacity: 1,
            duration: 0.6,
          },
          0.3,
        )
        .to(
          title,
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
          },
          0.6,
        );
    }

    const swiper = new Swiper('.js-main-slider', {
      autoplay: {
        delay: 4000,
        speed: 0,
      },
      loop: true,
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
