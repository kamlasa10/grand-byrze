document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.js-gallery-slider', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 700,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      formatFractionCurrent(number) {
        const isWithZero = number < 10 ? `0${number}` : `${number}`;
        return isWithZero.slice(-2);
      },
      formatFractionTotal(number) {
        const isWithZero = number < 10 ? `0${number}` : `${number}`;
        return isWithZero.slice(-2);
      },
      renderFraction(currentClass, totalClass) {
        return `<span class="${currentClass}"></span>` + `<span class="${totalClass}"></span>`;
      },
    },
  });

  const slides = $('.js-gallery-slider .swiper-slide');
  const gallery = $('.gallery');

  $(window)
    .on('resize', () => {
      if ($(window).width() <= 1025) {
        const avaliablesHeight =
          document.documentElement.clientHeight -
          $('.page-top').outerHeight() +
          (gallery.width() / 100) * 9;
        slides.height(avaliablesHeight + 'px');
      }
    })
    .resize();
});
