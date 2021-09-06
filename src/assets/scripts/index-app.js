import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

global.ScrollTrigger = ScrollTrigger;

window.initCustomScroll = function(needSmothScroll = true) {
  $(window)
    .on('resize', () => {
      if ($(window).width() > 1025 && needSmothScroll) {
        if (window.locoScroll) return;

        window.locoScroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true,
          smoothMobile: false,
          inertia: 1.1,
        });

        window.locoScroll.on('scroll', e => {
          ScrollTrigger.update(e);
        });

        ScrollTrigger.scrollerProxy(document.querySelector('[data-scroll-container]'), {
          scrollTop(value) {
            return arguments.length
              ? locoScroll.scrollTo(value, 0, 0)
              : locoScroll.scroll.instance.scroll.y;
          }, // we don't have to define a scrollLeft because we're only scrolling vertically.
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
          pinType: document.querySelector('[data-scroll-container]').style.transform
            ? 'transform'
            : 'fixed',
        });

        ScrollTrigger.addEventListener('refresh', () => window.locoScroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

        setTimeout(() => {
          window.locoScroll.update();
        }, 1000);
      }
    })
    .resize();

  if (document.documentElement.clientWidth > 1025 && window.locoScroll) {
    $('.js-btn-top').on('click', () => {
      window.locoScroll.scrollTo(0);
    });
  } else {
    $('.js-btn-top').on('click', () => {
      $('html, body')
        .stop()
        .animate({ scrollTop: 0 }, 1000);
    });
  }

  const $header = $('.header');

  function animateScroll(offset) {
    if (offset > 10) {
      $header.addClass('move');
    } else {
      $header.removeClass('move');
    }
  }

  if (window.locoScroll) {
    window.locoScroll.on('scroll', e => {
      animateScroll(e.scroll.y);
      window.scrollOffset = e.scroll.y;
    });

    return;
  }

  window.addEventListener('scroll', e => {
    animateScroll(window.pageYOffset);
  });
};
